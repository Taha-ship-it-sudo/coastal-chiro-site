export type ServiceDetail = {
  slug: string;
  title: string;
  summary: string;
  helpsWith: string[];
  howItWorks: string;
  sessionFeel: string;
  bestFor: string[];
  typicalPlan: string;
  safety: string;
  pairings: string[];
};

export const APPOINTMENT_URL =
  "https://www.tebra.com/care/provider/scott-kolofer-dc-1508361098";

export const services: ServiceDetail[] = [
  {
    slug: "chiropractic-care",
    title: "Chiropractic Care",
    summary:
      "Targeted spinal and joint adjustments to improve movement, reduce pain, and support nervous system function.",
    helpsWith: [
      "Neck and back pain",
      "Headaches and tension patterns",
      "Sciatica-like symptoms",
      "Joint stiffness and mobility loss",
      "Postural strain from work or sport",
    ],
    howItWorks:
      "Specific, evidence-informed adjustments restore healthier joint mechanics and reduce stress on surrounding tissues and nerves.",
    sessionFeel:
      "Most visits feel relieving and focused. You may notice immediate movement gains; mild post-treatment soreness can happen early on.",
    bestFor: [
      "Active adults and athletes",
      "Desk workers with recurrent stiffness",
      "People with recurring movement restrictions",
    ],
    typicalPlan:
      "Many patients start with 1-2 visits weekly for 2-4 weeks, then taper based on symptom and function changes.",
    safety:
      "Every visit starts with screening. If findings suggest a condition outside chiropractic scope, referral is made.",
    pairings: [
      "Myofascial soft tissue therapy",
      "Corrective postural education",
      "Cold laser or red light support",
    ],
  },
  {
    slug: "corrective-postural-education",
    title: "Corrective Postural Education",
    summary:
      "Progressive rehab-style guidance to improve posture, movement mechanics, and long-term resilience.",
    helpsWith: [
      "Recurrent pain driven by movement habits",
      "Postural fatigue",
      "Core and stability deficits",
      "Inefficient lifting, running, or training patterns",
    ],
    howItWorks:
      "You receive a personalized progression of mobility, control, and strength drills to retrain movement and reduce overload.",
    sessionFeel:
      "Sessions are active and educational. Expect coaching, technique feedback, and practical home programming.",
    bestFor: [
      "Patients who want durable results",
      "Athletes returning to training",
      "People with recurring flare-ups",
    ],
    typicalPlan:
      "Program updates are usually made every 1-2 weeks, with brief daily home work between office visits.",
    safety:
      "Exercises are matched to current capacity and modified around pain tolerance and healing stage.",
    pairings: [
      "Chiropractic adjustments",
      "Shock wave therapy for chronic tendons",
      "Soft tissue treatment",
    ],
  },
  {
    slug: "myofascial-soft-tissue-therapies",
    title: "Myofascial Soft Tissue Therapies",
    summary:
      "Trigger point work, manual myofascial release, and IASTM to reduce tension and improve tissue quality.",
    helpsWith: [
      "Muscle tightness and trigger points",
      "Restricted range of motion",
      "Overuse soreness",
      "Tendon and soft tissue irritation",
    ],
    howItWorks:
      "Hands-on and instrument-assisted methods reduce tissue restriction, improve circulation, and restore glide between layers.",
    sessionFeel:
      "You may feel targeted pressure and release. Most people feel looser afterward, sometimes with brief tenderness.",
    bestFor: [
      "Athletes and active adults",
      "People with chronic tension patterns",
      "Patients needing quicker tissue recovery",
    ],
    typicalPlan:
      "Often used in short blocks over 2-6 visits, then maintained as needed during training cycles.",
    safety:
      "Pressure and intensity are adjusted to your comfort level, tissue irritability, and current recovery capacity.",
    pairings: [
      "Chiropractic care",
      "Corrective exercise",
      "Cold laser or red light",
    ],
  },
  {
    slug: "focused-shock-wave-therapy",
    title: "Focused Shock Wave Therapy",
    summary:
      "Non-invasive treatment to stimulate healing in chronic tendon and soft tissue conditions.",
    helpsWith: [
      "Plantar fasciitis",
      "Achilles and patellar tendon pain",
      "Lateral elbow pain",
      "Persistent soft tissue pain unresponsive to rest",
    ],
    howItWorks:
      "Focused acoustic waves stimulate local tissue repair responses and can improve blood flow and regenerative signaling.",
    sessionFeel:
      "Treatment is brief and intense but tolerable for most people. Sensitivity typically decreases across sessions.",
    bestFor: [
      "Chronic tendon complaints",
      "Athletes with stubborn overuse injuries",
      "Patients wanting non-invasive options",
    ],
    typicalPlan:
      "A common plan is 3-6 sessions, spaced about a week apart, with activity and loading guidance between visits.",
    safety:
      "Not appropriate for every case. Screening reviews tissue stage, health history, and contraindications before treatment.",
    pairings: [
      "Corrective loading program",
      "Manual soft tissue work",
      "Targeted chiropractic care",
    ],
  },
  {
    slug: "cold-laser-red-light-therapy",
    title: "Cold Laser + Red Light Therapy",
    summary:
      "Light-based modalities that support tissue recovery, circulation, and pain modulation.",
    helpsWith: [
      "Mild to moderate inflammation",
      "Joint and soft tissue irritation",
      "Recovery between demanding activity days",
      "Pain-sensitive flare periods",
    ],
    howItWorks:
      "Specific wavelengths support cellular energy pathways and local circulation to assist tissue recovery and symptom relief.",
    sessionFeel:
      "Comfortable and non-invasive. You typically feel little to no discomfort during treatment.",
    bestFor: [
      "Patients who need low-force adjunctive care",
      "Post-treatment recovery support",
      "Acute-on-chronic flare episodes",
    ],
    typicalPlan:
      "Usually layered into a broader plan 1-3 times weekly during active treatment phases.",
    safety:
      "Eye protection and parameter selection are tailored to treatment area and patient profile.",
    pairings: [
      "Chiropractic adjustments",
      "Soft tissue care",
      "Home mobility and loading plan",
    ],
  },
  {
    slug: "performance-recovery-planning",
    title: "Performance + Recovery Planning",
    summary:
      "Personalized treatment plans for active adults and athletes to return to activity safely.",
    helpsWith: [
      "Frequent training-related flare-ups",
      "Stalled return-to-run or return-to-lift progress",
      "Injury recurrence risk",
      "Poor recovery rhythm",
    ],
    howItWorks:
      "Treatment and exercise are coordinated with your training calendar to improve capacity without repeated setbacks.",
    sessionFeel:
      "Expect practical planning, progress checks, and clear decision points for advancing activity safely.",
    bestFor: [
      "Endurance athletes",
      "Strength athletes",
      "Recreationally active adults",
    ],
    typicalPlan:
      "Structured blocks with periodic reassessment, then maintenance visits around high-load seasons or events.",
    safety:
      "Progressions are based on objective response markers, not arbitrary timelines.",
    pairings: [
      "Chiropractic care",
      "Soft tissue therapy",
      "Shock wave for chronic tendon pain",
    ],
  },
];

export const serviceBySlug = Object.fromEntries(
  services.map((service) => [service.slug, service]),
) as Record<string, ServiceDetail>;
