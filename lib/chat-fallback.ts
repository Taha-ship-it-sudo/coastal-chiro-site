import {
  CLINIC_ADDRESS,
  CLINIC_HOURS,
  CLINIC_NAME,
  CLINIC_PHONE,
  SERVICES_SUMMARY,
} from "@/lib/clinic-context";

export function fallbackChatReply(userInput: string): string {
  const q = userInput.toLowerCase();

  if (/(book|appointment|schedule|visit)/.test(q)) {
    return `Absolutely — you can [book here](https://www.tebra.com/care/provider/scott-kolofer-dc-1508361098).\n\nIf you prefer, call ${CLINIC_PHONE} and the office can help with scheduling.`;
  }

  if (/(location|address|where|parking)/.test(q)) {
    return `${CLINIC_NAME} is located at ${CLINIC_ADDRESS}.\nParking is available on-site or nearby.`;
  }

  if (/(hour|open|close|weekend|time)/.test(q)) {
    return `Here are the current office hours:\n- ${CLINIC_HOURS.join("\n- ")}\n\nTo schedule, you can [book here](https://www.tebra.com/care/provider/scott-kolofer-dc-1508361098) or call ${CLINIC_PHONE}.`;
  }

  if (/(insurance|cencal|cost|price|pay)/.test(q)) {
    return `For insurance and pricing questions, please call the office directly at ${CLINIC_PHONE} so the team can give accurate details for your situation.`;
  }

  if (/(service|treat|help|pain|neck|back|sciatica|headache)/.test(q)) {
    return `Common services include:\n- ${SERVICES_SUMMARY[0]}\n- ${SERVICES_SUMMARY[1]}\n- ${SERVICES_SUMMARY[2]}\n- ${SERVICES_SUMMARY[3]}\n- ${SERVICES_SUMMARY[4]}\n\nIf you share your main concern, I can suggest which visit type is the best starting point.`;
  }

  if (/(emergency|chest pain|stroke|cant breathe|can't breathe|trouble breathing|severe trauma)/.test(q)) {
    return `If this could be an emergency, call 911 or go to the nearest ER now.\nFor non-emergency care, contact the office at ${CLINIC_PHONE}.`;
  }

  return `I can help with booking, services, location, and hours.\n\n- [Book here](https://www.tebra.com/care/provider/scott-kolofer-dc-1508361098)\n- Call: ${CLINIC_PHONE}`;
}
