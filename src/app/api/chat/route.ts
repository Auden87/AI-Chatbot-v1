import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

interface ServiceCategory {
  name: string;
  description: string;
  offerings: string[];
  pricing?: { line_items?: Record<string, string>; pricing_model?: string; pricing_disclaimer?: string };
  typical_timeline?: string;
}

interface ProcessStep { step: number; name: string; description: string; }
interface FaqItem { question: string; answer: string; }
interface Testimonial { name: string; project_or_service: string; quote: string; }
interface QualifyingType { name: string; questions: string[]; }
interface OutOfScopeItem { service: string; response: string; }
interface LeadField { field: string; priority: string; when_to_ask: string; }

function buildSystemPrompt(): string {
  const knowledgeFile = process.env.KNOWLEDGE_FILE ?? "summit-builders-knowledge.json";
  const knowledge = JSON.parse(
    readFileSync(join(process.cwd(), knowledgeFile), "utf-8")
  );

  const { company, hours, service_area, services, process: buildProcess, differentiators, payment_and_financing, faq, testimonials, chatbot_behavior } = knowledge;
  const { persona, conversation_goals, eligibility_check, qualifying_questions, response_rules, lead_collection, out_of_scope_services, fallback_message, closing_ctas } = chatbot_behavior;

  const serviceLines = (Object.values(services) as ServiceCategory[])
    .filter((s) => s.name)
    .map((s) => {
      const offeringList = s.offerings.join(", ");
      const prices = s.pricing?.line_items
        ? Object.values(s.pricing.line_items).join("; ")
        : "";
      const disclaimer = s.pricing?.pricing_disclaimer ?? "";
      return `${s.name}: ${s.description} Offerings: ${offeringList}.${prices ? ` Pricing (${s.pricing?.pricing_model}): ${prices}.` : ""} ${disclaimer ? `Note: ${disclaimer}` : ""}${s.typical_timeline ? ` Typical timeline: ${s.typical_timeline}.` : ""}`;
    });

  const processLines = (buildProcess.steps as ProcessStep[]).map((s) => `${s.step}. ${s.name}: ${s.description}`);

  const faqLines = (faq.items as FaqItem[]).map((f) => `Q: ${f.question}\nA: ${f.answer}`);

  const qualifyingLines = (Object.values(qualifying_questions) as QualifyingType[])
    .filter((qt) => qt.name)
    .map((qt) => `${qt.name}: ${qt.questions.join(" → ")}`);

  const outOfScopeLines = (out_of_scope_services.items as OutOfScopeItem[]).map((i) => `- "${i.service}": ${i.response}`);

  const leadFields = (lead_collection.fields_to_collect as LeadField[]).map((f) => `- ${f.field} (priority: ${f.priority}) — ask ${f.when_to_ask}`);

  return `You are ${persona.assistant_name}, the ${persona.role}.
Tone: ${persona.tone}

GOAL: ${conversation_goals.primary}. ${conversation_goals.secondary}. Desired conversion action: ${conversation_goals.conversion_action}.

COMPANY INFORMATION:
- Name: ${company.name}${company.tagline ? ` — "${company.tagline}"` : ""}
- Industry: ${company.industry} | Founded: ${company.founded}${company.owner_or_contact ? ` | Owner: ${company.owner_or_contact}` : ""}
- Address: ${company.address}
- Phone: ${company.phone} | Email: ${company.email} | Website: ${company.website}
- Hours: Mon–Fri ${hours.regular.monday_friday}, Sat ${hours.regular.saturday}, Sun ${hours.regular.sunday}${hours.after_hours_or_emergency ? `\n- Emergency: ${hours.after_hours_or_emergency}` : ""}${hours.response_time_promise ? `\n- Response time: ${hours.response_time_promise}` : ""}
- Credentials: ${[company.license_number ? `License ${company.license_number}` : null, company.insurance_summary, company.certifications].filter(Boolean).join(", ")}
- Stats: ${Object.entries(company.key_stats).filter(([k]) => !k.startsWith("_")).map(([k, v]) => `${k.replace(/_/g, " ")}: ${v}`).join(", ")}

SERVICE AREA (${service_area.type}):
Primary: ${service_area.primary_cities_or_zones.join(", ")}
${service_area.extended_cities_or_zones?.length ? `Extended: ${service_area.extended_cities_or_zones.join(", ")}${service_area.extended_area_note ? ` (${service_area.extended_area_note})` : ""}` : ""}
${service_area.max_radius ? `Max radius: ${service_area.max_radius}` : ""}

SERVICES:
${serviceLines.join("\n\n")}

OUR PROCESS:
${processLines.join("\n")}

WHAT MAKES US DIFFERENT:
${differentiators.points.map((d: string) => `- ${d}`).join("\n")}

PAYMENT & FINANCING:
${[
  payment_and_financing.accepted_payment_methods ? `Accepted payments: ${payment_and_financing.accepted_payment_methods}` : null,
  payment_and_financing.financing_available ? `Financing available: ${payment_and_financing.financing_details}` : "No financing offered.",
  payment_and_financing.deposit_policy ? `Deposit: ${payment_and_financing.deposit_policy}` : null
].filter(Boolean).join("\n")}

COMMON QUESTIONS:
${faqLines.join("\n\n")}

TESTIMONIALS (reference naturally when relevant):
${(testimonials.items as Testimonial[]).map((t) => `- ${t.name} (${t.project_or_service}): "${t.quote}"`).join("\n")}

ELIGIBILITY — VERIFY THIS BEFORE DISCUSSING ANYTHING ELSE:
${eligibility_check.enabled ? `
Check type: ${eligibility_check.check_type}
Goal: ${eligibility_check.check_description}
Opening question: "${eligibility_check.qualifying_question}"
Eligible values: ${eligibility_check.eligible_values.join(", ")}
If eligible: "${eligibility_check.eligible_response}"
If ineligible: "${eligibility_check.ineligible_response}"
If ambiguous: "${eligibility_check.ambiguous_response}"
`.trim() : "No eligibility check required — serve all visitors."}

QUALIFYING QUESTIONS BY PROJECT TYPE (ask one at a time in order until you can give a confident estimate):
${qualifyingLines.join("\n")}

OUT OF SCOPE SERVICES:
${outOfScopeLines.join("\n")}

LEAD COLLECTION (weave in naturally, never all at once):
${leadFields.join("\n")}
Rules: ${lead_collection.collection_rules.join(" | ")}

RESPONSE RULES:
${response_rules.map((r: string) => `- ${r}`).join("\n")}

CLOSING CALL-TO-ACTIONS (use naturally when the moment is right):
${closing_ctas.map((c: string) => `- ${c}`).join("\n")}

FALLBACK: ${fallback_message}`;
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages are required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Anthropic API key is not configured" },
        { status: 500 }
      );
    }

    const client = new Anthropic({ apiKey });

    // Anthropic requires messages to start with a user turn — skip any leading assistant messages (e.g. the greeting)
    const firstUserIndex = messages.findIndex((m: { role: string }) => m.role === "user");
    const history = firstUserIndex >= 0 ? messages.slice(firstUserIndex) : messages;

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 512,
      system: buildSystemPrompt(),
      messages: history,
    });

    const textBlock = response.content.find((block) => block.type === "text");
    const reply = textBlock ? textBlock.text : "Sorry, I couldn't generate a response.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process your message. Please try again." },
      { status: 500 }
    );
  }
}
