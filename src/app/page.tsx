import Reveal from "./components/Reveal";
import ContactForm from "./components/ContactForm";
import { services, projects, FIVERR_URL, GITHUB_URL, EMAIL } from "@/lib/data";

const MAILTO =
  `mailto:${EMAIL}?subject=New%20project%20inquiry&body=Hi%20Victor%2C%0A%0AI%27d%20like%20to%20work%20with%20you%20on%3A%0A%0A-%20Project%3A%20%0A-%20Platform%2Fstack%3A%20%0A-%20Where%20it%27s%20stuck%3A%20%0A-%20Timeline%2Fbudget%3A%20%0A%0AThanks%2C%0A`;

export default function Home() {
  return (
    <>
      {/* NAV */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-7">
          <div className="text-lg font-bold tracking-tight">
            victor<span className="text-acid">.</span>
          </div>
          <div className="hidden gap-8 md:flex">
            <a href="#services" className="text-sm text-muted transition-colors hover:text-ink">Services</a>
            <a href="#work" className="text-sm text-muted transition-colors hover:text-ink">Work</a>
            <a href="#contact" className="text-sm text-muted transition-colors hover:text-ink">Contact</a>
          </div>
          <a
            href={FIVERR_URL}
            target="_blank"
            rel="noopener"
            className="rounded-md border border-line px-4 py-2 font-mono text-xs transition-colors hover:border-acid hover:text-acid"
          >
            Hire on Fiverr
          </a>
        </div>
      </nav>

      {/* HERO */}
      <header className="px-7 pb-24 pt-36">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-xs text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-acid shadow-[0_0_10px_#c6ff3a] animate-pulse2" />
            Available for new projects
          </div>
          <h1 className="mb-6 text-[clamp(40px,7vw,82px)] font-bold leading-[1.02] tracking-[-0.035em]">
            I ship <span className="text-acid">web &amp; mobile apps</span>
            <br />
            that actually launch.
          </h1>
          <p className="mb-9 max-w-[620px] text-[clamp(16px,2vw,20px)] text-muted">
            Full-stack and AI app developer. I take projects from{" "}
            <strong className="font-medium text-ink">vibe-coded prototype</strong> to{" "}
            <strong className="font-medium text-ink">production</strong> — App Store submissions,
            EU-compliant migrations, Stripe billing, and multi-agent automation that runs without you.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <a
              href={FIVERR_URL}
              target="_blank"
              rel="noopener"
              className="rounded-lg bg-acid px-6 py-3.5 font-mono text-sm font-bold text-bg transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(198,255,58,0.25)]"
            >
              Hire me on Fiverr →
            </a>
            <a
              href="#work"
              className="rounded-lg border border-line px-6 py-3.5 font-mono text-sm transition-colors hover:border-muted"
            >
              See recent work
            </a>
          </div>
          <div className="mt-16 flex flex-wrap gap-11">
            {[
              ["15+", "stacks shipped"],
              ["App Store", "submission-ready"],
              ["EU/GDPR", "compliant migrations"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="text-3xl font-bold tracking-tight text-acid">{n}</div>
                <div className="mt-0.5 font-mono text-xs text-muted">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* SERVICES */}
      <section id="services" className="border-t border-line px-7 py-22">
        <div className="mx-auto max-w-[1180px]">
          <Reveal><div className="mb-3.5 font-mono text-xs tracking-wide text-acid">// what i do</div></Reveal>
          <Reveal><h2 className="mb-3.5 text-[clamp(28px,4vw,42px)] font-bold tracking-[-0.03em]">Services</h2></Reveal>
          <Reveal><p className="mb-12 max-w-[560px] text-muted">Fixed-scope, paste-ready, delivered fast. Pick the track that matches where your project is stuck.</p></Reveal>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {services.map((s, i) => (
              <Reveal key={s.num} delay={(i % 2) * 0.06}>
                <div className="group h-full rounded-2xl border border-line bg-panel p-8 transition-all hover:-translate-y-1 hover:border-[#33333f]">
                  <div className="font-mono text-xs text-muted">{s.num}</div>
                  <h3 className="my-4 text-xl font-semibold tracking-tight">{s.title}</h3>
                  <p className="mb-5 text-[15px] text-muted">{s.body}</p>
                  <div className="flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <span key={t} className="rounded border border-line bg-[#1c1c24] px-2.5 py-1 font-mono text-[11px]">{t}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="border-t border-line px-7 py-22">
        <div className="mx-auto max-w-[1180px]">
          <Reveal><div className="mb-3.5 font-mono text-xs tracking-wide text-acid">// selected work</div></Reveal>
          <Reveal><h2 className="mb-3.5 text-[clamp(28px,4vw,42px)] font-bold tracking-[-0.03em]">Recent projects</h2></Reveal>
          <Reveal><p className="mb-12 max-w-[560px] text-muted">A sample of live builds and client engagements across health, travel, social, and consulting verticals.</p></Reveal>
          <Reveal>
            <div>
              {projects.map((p) => {
                const inner = (
                  <>
                    <div className="font-mono text-[11px] text-gold">{p.tag}</div>
                    <div>
                      <div className="text-xl font-semibold tracking-tight transition-colors group-hover:text-acid">{p.name}</div>
                      <div className="mt-1 text-sm text-muted">{p.desc}</div>
                      {p.href && (
                        <div className="mt-2 font-mono text-[11px] text-acid opacity-0 transition-opacity group-hover:opacity-100">
                          {p.href.replace(/^https?:\/\//, "").replace(/\/$/, "")} ↗
                        </div>
                      )}
                    </div>
                    <div className="text-right font-mono text-xs text-muted md:text-right">
                      {p.stack.map((line, idx) => (
                        <span key={idx}>{line}{idx < p.stack.length - 1 && <br />}</span>
                      ))}
                    </div>
                  </>
                );
                const cls =
                  "group grid grid-cols-1 items-center gap-2 border-b border-line py-6 transition-all md:grid-cols-[140px_1fr_auto] md:gap-6";
                return p.href ? (
                  <a key={p.name} href={p.href} target="_blank" rel="noopener" className={`${cls} hover:pl-2`}>
                    {inner}
                  </a>
                ) : (
                  <div key={p.name} className={cls}>{inner}</div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t border-line px-7 py-22">
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <div className="grid grid-cols-1 gap-12 rounded-[18px] border border-line bg-panel p-[clamp(34px,5vw,60px)] lg:grid-cols-[1.1fr_1fr] lg:items-start">
              <div>
                <h2 className="mb-3.5 text-[clamp(26px,4vw,38px)] font-bold tracking-[-0.03em]">Have something to ship?</h2>
                <p className="mb-7 text-muted">
                  Tell me where your project is stuck. I reply fast, scope clearly, and deliver
                  paste-ready work — no endless back-and-forth.
                </p>
                <div className="flex flex-col gap-3">
                  <a href={MAILTO} className="flex items-center justify-between rounded-lg border border-line bg-[#16161c] px-5 py-4 font-mono text-sm transition-all hover:translate-x-1 hover:border-acid">
                    Email<span className="text-muted">{EMAIL} →</span>
                  </a>
                  <a href={FIVERR_URL} target="_blank" rel="noopener" className="flex items-center justify-between rounded-lg border border-line bg-[#16161c] px-5 py-4 font-mono text-sm transition-all hover:translate-x-1 hover:border-acid">
                    Fiverr<span className="text-muted">view gigs →</span>
                  </a>
                  <a href={GITHUB_URL} target="_blank" rel="noopener" className="flex items-center justify-between rounded-lg border border-line bg-[#16161c] px-5 py-4 font-mono text-sm transition-all hover:translate-x-1 hover:border-acid">
                    GitHub<span className="text-muted">@Vedrixappsheet →</span>
                  </a>
                </div>
              </div>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-line px-7 py-10 text-center">
        <p className="font-mono text-xs text-muted">© 2026 victor — built from scratch, shipped to production.</p>
      </footer>
    </>
  );
}
