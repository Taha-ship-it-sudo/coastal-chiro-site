import Image from "next/image";
import { ServicesSection } from "@/components/ServicesSection";

const steps = [
  {
    title: "Consultation",
    body: "We review your goals, symptom history, and activity demands to understand the full picture.",
  },
  {
    title: "Comprehensive exam",
    body: "Movement, orthopedic, and neurological screens help identify primary pain drivers.",
  },
  {
    title: "Diagnosis + plan",
    body: "You receive a clear explanation, timeline expectations, and a personalized care plan.",
  },
  {
    title: "First treatment",
    body: "If appropriate, treatment begins same day with home-care steps to support progress.",
  },
];

const clinicGallery = {
  reception: {
    src: "/images/clinic/reception-desk.png",
    alt: "Light wood reception desk with live-edge counter, computer, and coastal artwork at Coastal Chiropractic SLO",
    caption: "Front desk — check in and get oriented",
  },
  waitingRow: [
    {
      src: "/images/clinic/waiting-area-chairs.png",
      alt: "Waiting area with two leather chairs, side table, lamp, and framed landscape art",
      caption: "Comfortable seating while you wait",
    },
    {
      src: "/images/clinic/waiting-area-rug.png",
      alt: "Waiting area with leather chairs, patterned green rug, side table, and wall art",
      caption: "Warm, relaxed lounge seating",
    },
  ],
  waitingWide: {
    src: "/images/clinic/waiting-room-wide.png",
    alt: "Spacious waiting room with leather chairs, green area rug, plants, and track lighting",
    caption: "Bright, open waiting space",
  },
  waitingLobby: {
    src: "/images/clinic/lobby-natural-light.png",
    alt: "Reception and waiting area with wood reception desk, seating, plants, and natural light",
    caption: "Natural light throughout the lobby",
  },
  treatment: {
    src: "/images/office-treatment-room.png",
    alt: "Treatment room with chiropractic table, desk, anatomy model, and professional equipment",
    caption: "Private treatment room",
  },
  standards: [
    {
      src: "/images/clinic/credentials-shelf.png",
      alt: "Palmer College of Chiropractic diploma display with clinical textbooks and plants",
      caption: "Training & clinical references",
    },
    {
      src: "/images/clinic/office-library-wall.png",
      alt: "Built-in shelving with diplomas, anatomical models, textbooks, plants, and wellness décor",
      caption: "Credentials and patient education resources",
    },
    {
      src: "/images/clinic/shelving-plants-books.png",
      alt: "Wood shelving with anatomy texts, knee model, plants, and clinic supplies",
      caption: "Evidence-informed care",
    },
    {
      src: "/images/clinic/built-ins-books-plants.png",
      alt: "Dark wood built-ins with medical textbooks, anatomical art, and houseplants",
      caption: "Clinical library",
    },
  ],
} as const;

const faqs = [
  {
    q: "Does chiropractic adjustment hurt?",
    a: "Most patients find treatment comfortable and relieving. Mild soreness can happen early on, similar to post-workout soreness.",
  },
  {
    q: "How many sessions will I need?",
    a: "It depends on the condition, chronicity, and goals. Acute issues often need a short initial phase, then taper as function improves.",
  },
  {
    q: "What is the cracking sound?",
    a: "That sound is joint cavitation - gas release in the joint fluid. It is not bones grinding and is generally harmless.",
  },
  {
    q: "Can I combine chiropractic with other care?",
    a: "Yes. Many patients combine chiropractic with strength training, physical therapy, massage, or acupuncture depending on needs.",
  },
  {
    q: "What should I wear to my appointment?",
    a: "Wear comfortable clothing that allows easy movement (athletic wear is ideal). This helps with movement testing and hands-on treatment.",
  },
  {
    q: "Do I need imaging before my first visit?",
    a: "Not always. Many cases can be evaluated clinically first. If imaging is needed based on findings or red flags, guidance will be provided.",
  },
  {
    q: "Can I work out after treatment?",
    a: "Usually yes, but intensity may be adjusted for 24-48 hours depending on treatment and tissue irritability. You’ll get specific guidance each visit.",
  },
];

const testimonials = [
  {
    quote:
      "Scott has been an awesome tool in staying healthy in my career as a professional athlete. He has been not only a chiropractor, but a friend and a sports psychologist. I would highly recommend Dr. Kolofer to anyone who wants to work on bettering themselves.",
    name: "Craig Engels",
  },
  {
    quote:
      "Dr. Kolofer is the only chiropractor I trust. His approach to his patients is thorough, professional and thoughtful as he listens to your needs and always takes the time necessary to do the job right.",
    name: "Wesely St. John",
  },
  {
    quote:
      "Fantastic intuition and chiropractic techniques. I've had many adjustments and many traumatic injuries and Scott has renewed my hope of living my best life.",
    name: "T Randazzo",
  },
] as const;

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50/80 via-white to-slate-50" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-800">
            Coastal Chiropractic SLO
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem]">
            Experience natural healing through specific chiropractic care
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            Personalized, evidence-informed care designed to reduce discomfort, improve movement,
            and help you get back to the life and activities you value.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="https://www.tebra.com/care/provider/scott-kolofer-dc-1508361098"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-teal-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800"
            >
              Make Appointment Online
            </a>
          </div>
        </div>
      </section>

      <section
        id="office"
        className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50/80"
      >
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-800">
              Our office
            </p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Tour the clinic
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              A bright, organized San Luis Obispo space built for comfort and privacy — from the
              moment you check in to your one-on-one visit.
            </p>
          </div>

          <div className="mt-12 space-y-14">
            <div>
              <h3 className="font-display text-lg font-semibold text-slate-900">Reception</h3>
              <div className="mt-4 mx-auto max-w-4xl">
                <figure className="overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-100 shadow-md">
                  <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
                    <Image
                      src={clinicGallery.reception.src}
                      alt={clinicGallery.reception.alt}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 896px"
                      priority
                    />
                  </div>
                  <figcaption className="border-t border-slate-100 bg-white px-4 py-3 text-sm text-slate-600">
                    {clinicGallery.reception.caption}
                  </figcaption>
                </figure>
              </div>
            </div>

            <div>
              <h3 className="font-display text-lg font-semibold text-slate-900">
                Waiting lounge
              </h3>
              <div className="mt-4 grid gap-6 sm:grid-cols-2">
                {clinicGallery.waitingRow.map((photo) => (
                  <figure
                    key={photo.src}
                    className="overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-100 shadow-sm"
                  >
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    </div>
                    <figcaption className="border-t border-slate-100 bg-white px-3 py-2.5 text-xs text-slate-600">
                      {photo.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
              <figure className="mt-6 overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-100 shadow-sm">
                <div className="relative aspect-[16/9] w-full sm:aspect-[2/1]">
                  <Image
                    src={clinicGallery.waitingWide.src}
                    alt={clinicGallery.waitingWide.alt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 1152px"
                  />
                </div>
                <figcaption className="border-t border-slate-100 bg-white px-4 py-3 text-sm text-slate-600">
                  {clinicGallery.waitingWide.caption}
                </figcaption>
              </figure>
              <figure className="mt-6 overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-100 shadow-sm">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={clinicGallery.waitingLobby.src}
                    alt={clinicGallery.waitingLobby.alt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 1152px"
                  />
                </div>
                <figcaption className="border-t border-slate-100 bg-white px-4 py-3 text-sm text-slate-600">
                  {clinicGallery.waitingLobby.caption}
                </figcaption>
              </figure>
            </div>

            <div>
              <h3 className="font-display text-lg font-semibold text-slate-900">
                Treatment suite
              </h3>
              <div className="mt-4 grid gap-8 lg:grid-cols-12 lg:items-center">
                <figure className="overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-100 shadow-md lg:col-span-7">
                  <div className="relative aspect-[4/5] w-full sm:aspect-[3/4]">
                    <Image
                      src={clinicGallery.treatment.src}
                      alt={clinicGallery.treatment.alt}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 58vw"
                    />
                  </div>
                  <figcaption className="border-t border-slate-100 bg-white px-4 py-3 text-sm text-slate-600">
                    {clinicGallery.treatment.caption}
                  </figcaption>
                </figure>
                <div className="lg:col-span-5">
                  <p className="text-sm leading-relaxed text-slate-600">
                    Clean treatment zones with room for hands-on care, movement checks, and recovery
                    planning — so each visit feels focused and unhurried.
                  </p>
                  <p className="mt-4 text-sm text-slate-500">Coastal Chiropractic SLO</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-display text-lg font-semibold text-slate-900">
                Library & credentials
              </h3>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                Education-forward care — from anatomy references to the standards we train under.
              </p>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {clinicGallery.standards.map((photo) => (
                  <figure
                    key={photo.src}
                    className="overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-100 shadow-sm"
                  >
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    </div>
                    <figcaption className="border-t border-slate-100 bg-white px-3 py-2.5 text-xs text-slate-600">
                      {photo.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="why-us" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-semibold text-slate-900 sm:text-4xl">
              Why patients choose this clinic
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              The practice blends precise chiropractic treatment with soft tissue work and recovery
              tools, so your care plan addresses both pain and the underlying movement patterns.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-slate-700">
              <li className="flex gap-2">
                <span className="text-teal-600">✓</span>
                Personalized plans for active adults, athletes, and families
              </li>
              <li className="flex gap-2">
                <span className="text-teal-600">✓</span>
                Multi-modal treatment instead of one-size-fits-all adjustments
              </li>
              <li className="flex gap-2">
                <span className="text-teal-600">✓</span>
                Practical home strategies to improve outcomes between visits
              </li>
              <li className="flex gap-2">
                <span className="text-teal-600">✓</span>
                Convenient San Luis Obispo location with easy parking
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <blockquote className="text-slate-700 leading-relaxed">
              “Your health journey is our priority, and we are committed to guiding and supporting
              you every step of the way.”
            </blockquote>
            <p className="mt-4 text-sm font-medium text-slate-500">— Coastal Chiropractic SLO</p>
            <p className="mt-6 text-sm text-slate-600">
              This redesigned page keeps the message focused and easier to scan, similar to modern
              Central Coast provider sites.
            </p>
          </div>
        </div>
      </section>

      <section id="reviews" className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-semibold text-slate-900 sm:text-4xl">
              Patient reviews
            </h2>
            <p className="mt-3 text-slate-600">
              What patients commonly say about care at Coastal Chiropractic SLO.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((review) => (
              <figure
                key={review.name}
                className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 shadow-sm"
              >
                <blockquote className="text-sm leading-relaxed text-slate-700">
                  “{review.quote}”
                </blockquote>
                <figcaption className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {review.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <ServicesSection />

      <section id="first-visit" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <h2 className="font-display text-3xl font-semibold text-slate-900 sm:text-4xl">
          New patient first visit
        </h2>
        <p className="mt-3 max-w-2xl text-slate-600">
          Here is what to expect from your first appointment.
        </p>
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-700 text-sm font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="faq" className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <h2 className="font-display text-center text-3xl font-semibold text-slate-900 sm:text-4xl">
            Common questions
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-slate-600">
            Or use the chat bubble for after-hours chiropractic FAQs.
          </p>
          <div className="mt-10 space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-slate-200 bg-white px-4 py-3 open:shadow-sm"
              >
                <summary className="cursor-pointer list-none font-medium text-slate-900 marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-2">
                    {f.q}
                    <span className="text-teal-700 transition group-open:rotate-180">▼</span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
