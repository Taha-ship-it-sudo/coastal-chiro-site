import Link from "next/link";
import { notFound } from "next/navigation";
import { APPOINTMENT_URL, serviceBySlug, services } from "@/lib/services";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const service = serviceBySlug[slug];
  if (!service) {
    return { title: "Service not found | Coastal Chiropractic SLO" };
  }
  return {
    title: `${service.title} | Coastal Chiropractic SLO`,
    description: service.summary,
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = serviceBySlug[slug];
  if (!service) notFound();

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:py-14">
        <Link href="/#services" className="text-sm font-medium text-teal-800 hover:underline">
          ← Back to services
        </Link>
        <article className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="font-display text-3xl font-semibold text-slate-900 sm:text-4xl">
            {service.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600">{service.summary}</p>

          <section className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                What it helps with
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {service.helpsWith.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Best for
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {service.bestFor.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                How it works
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{service.howItWorks}</p>
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                What a session feels like
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{service.sessionFeel}</p>
            </div>
          </section>

          <section className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Typical plan
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{service.typicalPlan}</p>
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Safety note
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{service.safety}</p>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Often paired with
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {service.pairings.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={APPOINTMENT_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-800"
            >
              Book Appointment
            </a>
          </div>
        </article>
      </div>
    </main>
  );
}
