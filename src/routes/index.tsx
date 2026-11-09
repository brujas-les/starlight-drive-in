import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

// Set this to your film's video URL (mp4) to play it on the big screen.
const FILM_SRC = "";
const FILM_TITLE = "Your Film";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${FILM_TITLE} — Now Showing at the Drive-In` },
      { name: "description", content: "Pull in, dim your headlights, and watch the film on a blueprint sketched drive-in under the neon lights." },
      { property: "og:title", content: `${FILM_TITLE} — Now Showing` },
      { property: "og:description", content: "A neon-lit drive-in premiere, drawn like an architect's blueprint." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Countdown() {
  const [n, setN] = useState(8);
  useEffect(() => {
    const t = setInterval(() => setN((v) => (v <= 1 ? 8 : v - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-screen-glow text-night">
      <div className="absolute inset-[10%] rounded-full border-4 border-night/70" />
      <div className="absolute inset-[18%] rounded-full border-2 border-night/50" />
      <div className="absolute left-1/2 top-0 h-full w-px bg-night/50" />
      <div className="absolute top-1/2 left-0 h-px w-full bg-night/50" />
      <div className="absolute left-1/2 top-1/2 h-[60%] w-[2px] origin-top -translate-x-1/2 bg-night/60" style={{ animation: "sweep 1s linear infinite" }} />
      <span key={n} className="relative font-body text-[clamp(4rem,14vw,12rem)] font-medium leading-none">{n}</span>
      <div className="pointer-events-none absolute inset-0 film-grain" />
    </div>
  );
}

/* Architectural line-art of the drive-in lot: restaurant with arches,
   speaker posts, parked cars, dimension lines. Pure blueprint ink. */
function BlueprintSketch() {
  const line = "var(--blueprint-line)";
  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
      aria-hidden="true"
    >
      <g fill="none" stroke={line} strokeWidth="1.5">
        {/* Ground line */}
        <line x1="0" y1="720" x2="1600" y2="720" strokeWidth="2" />
        <line x1="0" y1="726" x2="1600" y2="726" strokeDasharray="8 6" opacity="0.5" />

        {/* Restaurant building, left */}
        <rect x="90" y="520" width="300" height="200" />
        <rect x="110" y="560" width="80" height="60" />
        <rect x="210" y="560" width="80" height="60" />
        <line x1="90" y1="540" x2="390" y2="540" strokeDasharray="4 4" />
        {/* Golden arches */}
        <path d="M 150 520 C 150 420, 230 420, 230 520" strokeWidth="3" />
        <path d="M 230 520 C 230 420, 310 420, 310 520" strokeWidth="3" />
        {/* Roof sign */}
        <rect x="330" y="440" width="14" height="80" />
        <circle cx="337" cy="428" r="16" />

        {/* Speaker posts in rows */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={`sp1-${i}`}>
            <line x1={520 + i * 110} y1="640" x2={520 + i * 110} y2="600" />
            <circle cx={520 + i * 110} cy="594" r="7" />
          </g>
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={`sp2-${i}`}>
            <line x1={575 + i * 110} y1="700" x2={575 + i * 110} y2="664" />
            <circle cx={575 + i * 110} cy="658" r="7" />
          </g>
        ))}

        {/* Parked cars, simple side profiles */}
        {[0, 1, 2].map((i) => (
          <g key={`car-${i}`} transform={`translate(${1180 + i * 140}, 676)`}>
            <path d="M 0 44 L 8 24 L 34 18 L 46 4 L 92 4 L 106 18 L 124 22 L 130 44 Z" />
            <circle cx="32" cy="44" r="10" />
            <circle cx="98" cy="44" r="10" />
            <line x1="46" y1="18" x2="46" y2="4" opacity="0.6" />
            <line x1="92" y1="4" x2="92" y2="18" opacity="0.6" />
          </g>
        ))}

        {/* Projection booth + beam */}
        <rect x="760" y="700" width="80" height="20" />
        <line x1="800" y1="700" x2="560" y2="180" strokeDasharray="10 8" opacity="0.6" />
        <line x1="800" y1="700" x2="1040" y2="180" strokeDasharray="10 8" opacity="0.6" />

        {/* Dimension lines */}
        <g strokeDasharray="2 4" opacity="0.8">
          <line x1="560" y1="140" x2="1040" y2="140" />
          <line x1="560" y1="132" x2="560" y2="148" />
          <line x1="1040" y1="132" x2="1040" y2="148" />
          <line x1="90" y1="780" x2="390" y2="780" />
          <line x1="90" y1="772" x2="90" y2="788" />
          <line x1="390" y1="772" x2="390" y2="788" />
        </g>

        {/* Compass rose, bottom right */}
        <circle cx="1500" cy="820" r="34" />
        <line x1="1500" y1="792" x2="1500" y2="848" />
        <line x1="1472" y1="820" x2="1528" y2="820" />
      </g>
      <g fill={line} fontFamily="Oswald, sans-serif" letterSpacing="3">
        <text x="800" y="128" textAnchor="middle" fontSize="18">SCREEN — 40 FT</text>
        <text x="240" y="806" textAnchor="middle" fontSize="16">RESTAURANT</text>
        <text x="240" y="500" textAnchor="middle" fontSize="14" opacity="0.8">ARCHES — ELEV. A</text>
        <text x="800" y="632" textAnchor="middle" fontSize="14" opacity="0.7">SPEAKER ROWS</text>
        <text x="800" y="746" textAnchor="middle" fontSize="14" opacity="0.7">PROJECTION BOOTH</text>
        <text x="1500" y="782" textAnchor="middle" fontSize="16">N</text>
        <text x="1350" y="660" textAnchor="middle" fontSize="14" opacity="0.7">PARKING — ROW C</text>
      </g>
    </svg>
  );
}

function Index() {
  const video = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  return (
    <main className="sky font-body text-screen-glow select-none">
      {/* ---------- The drive-in ---------- */}
      <section className="relative flex h-screen w-full flex-col items-center overflow-hidden">
        <div className="absolute inset-0 blueprint-grid" />
        <div className="absolute inset-0 stars" />
        <BlueprintSketch />

        {/* Title block, like a blueprint's title stamp */}
        <div className="relative z-10 mt-[4vh] text-center">
          <p className="font-script text-2xl text-marquee/90 md:text-3xl">tonight only</p>
          <h1 className="font-neon text-4xl tracking-wider neon-pink md:text-6xl">{FILM_TITLE}</h1>
          <p className="mt-2 text-xs uppercase tracking-[0.5em] neon-teal">Now Showing</p>
        </div>

        {/* The big screen */}
        <div className="relative z-10 mt-[3vh] w-[min(80vw,120vh)]">
          <div className="relative aspect-video screen-frame bg-night-deep">
            {FILM_SRC ? (
              <video ref={video} src={FILM_SRC} autoPlay loop muted={muted} playsInline className="h-full w-full object-cover" />
            ) : (
              <Countdown />
            )}
            {/* Blueprint corner marks */}
            <span className="absolute -left-3 -top-3 h-5 w-5 border-l-2 border-t-2 border-blueprint-line" />
            <span className="absolute -right-3 -top-3 h-5 w-5 border-r-2 border-t-2 border-blueprint-line" />
            <span className="absolute -bottom-3 -left-3 h-5 w-5 border-b-2 border-l-2 border-blueprint-line" />
            <span className="absolute -bottom-3 -right-3 h-5 w-5 border-b-2 border-r-2 border-blueprint-line" />
          </div>
          {/* Screen legs */}
          <div className="mx-auto flex w-[70%] justify-between">
            <div className="h-[14vh] w-2.5 bg-night-deep" />
            <div className="h-[14vh] w-2.5 bg-night-deep" />
          </div>
        </div>

        {/* Dashboard controls */}
        <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-5 text-xs uppercase tracking-[0.3em]">
          {FILM_SRC && (
            <button
              onClick={() => { setMuted((m) => !m); video.current?.play(); }}
              className="rounded-full border border-neon-pink/70 px-5 py-2 text-neon-pink transition hover:bg-neon-pink hover:text-night"
            >
              {muted ? "Tune in sound" : "Mute"}
            </button>
          )}
          <span className="hidden text-screen-glow/60 md:inline">tune your radio to 88.5 fm</span>
          <a href="#about" className="rounded-full border border-neon-teal/70 px-5 py-2 neon-teal transition hover:bg-neon-teal hover:text-night">
            About the film
          </a>
        </div>
      </section>

      {/* ---------- About the film ---------- */}
      <section id="about" className="relative border-t-2 border-dashed border-blueprint-line/40 px-6 py-24">
        <div className="absolute inset-0 blueprint-grid opacity-60" />
        <div className="relative mx-auto max-w-3xl">
          <p className="text-xs uppercase tracking-[0.5em] neon-teal">Sheet 02 — Notes</p>
          <h2 className="mt-3 font-neon text-3xl tracking-wider neon-pink md:text-5xl">About the Film</h2>
          <div className="mt-8 border border-blueprint-line/50 bg-blueprint-deep/60 p-8 backdrop-blur-sm">
            <p className="text-lg font-light leading-relaxed text-screen-glow/90">
              Your story goes here — a few lines about what the film is about, who made it,
              and why you made it. Send me your synopsis and I'll set it in type.
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-dashed border-blueprint-line/40 pt-8 text-sm md:grid-cols-4">
              {[
                ["Director", "Your name"],
                ["Year", "2026"],
                ["Runtime", "— min"],
                ["Genre", "—"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs uppercase tracking-[0.3em] text-neon-teal/80">{k}</dt>
                  <dd className="mt-1 text-screen-glow/90">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="mt-10 text-center text-xs uppercase tracking-[0.4em] text-screen-glow/40">
            Starlite Drive-In — Est. 1955
          </p>
        </div>
      </section>
    </main>
  );
}
