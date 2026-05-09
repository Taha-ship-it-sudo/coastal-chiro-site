import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-lg font-semibold text-slate-900">Coastal Chiropractic SLO</p>
            <p className="mt-2 text-sm text-slate-600">
              1025 Pacific Street
              <br />
              San Luis Obispo, CA 93401
            </p>
            <p className="mt-2">
              <a href="tel:8054392513" className="text-sm font-medium text-teal-800 hover:underline">
                (805) 439-2513
              </a>
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Quick links</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <Link href="#office" className="hover:text-teal-800">Our office</Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-teal-800">Services</Link>
              </li>
              <li>
                <Link href="#first-visit" className="hover:text-teal-800">New Patients</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Support</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <a
                  href="https://www.tebra.com/care/provider/scott-kolofer-dc-1508361098"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-teal-800"
                >
                  Book appointment
                </a>
              </li>
              <li>
                <span className="text-slate-500">24/7 AI FAQ chat (bottom right)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
