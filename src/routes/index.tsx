import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import cars from "@/assets/cars.png";

// Set this to your film's video URL (mp4) to play it on the big screen.
const FILM_SRC = "";
const FILM_TITLE = "Your Film";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${FILM_TITLE} — Now Showing at the Drive-In` },
      { name: "description", content: "Pull in, dim your headlights, and watch the film under the stars." },
      { property: "og:title", content: `${FILM_TITLE} — Now Showing` },
      { property: "og:description", content: "A 1950s drive-in premiere under the stars." },
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

function Index() {
  const video = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  return (
    <main className="relative h-screen w-full overflow-hidden sky font-body text-screen-glow select-none">
      <div className="absolute inset-0 stars" />
      <div className="absolute top-[8%] h-6 w-6 rounded-full bg-screen-glow/80 blur-[1px] shadow-[0_0_40px_10px] shadow-screen-glow/30 right-[10%]" />

      {/* Screen */}
      <div className="absolute left-1/2 top-[9%] w-[min(78vw,130vh)] -translate-x-1/2">
        <p className="mb-2 text-center font-script text-2xl text-marquee/80 md:text-3xl">tonight only</p>
        <div className="relative aspect-video screen-frame bg-night-deep">
          {FILM_SRC ? (
            <video ref={video} src={FILM_SRC} autoPlay loop muted={muted} playsInline className="h-full w-full object-cover" />
          ) : (
            <Countdown />
          )}
        </div>
        {/* Screen legs */}
        <div className="mx-auto flex w-[70%] justify-between">
          <div className="h-[18vh] w-3 bg-night-deep" />
          <div className="h-[18vh] w-3 bg-night-deep" />
        </div>
      </div>

      {/* Projector beam from behind cars */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[90vh] w-[120vw] -translate-x-1/2 projector-beam" />

      {/* Marquee sign */}
      <div className="absolute bottom-[30%] left-[3%] hidden rotate-[-4deg] md:block">
        <div className="rounded-lg border-4 border-neon-pink/70 bg-night-deep/80 px-6 py-4 text-center shadow-[0_0_30px] shadow-neon-pink/40">
          <div className="h-3 w-full marquee-bulbs" />
          <p className="font-script text-xl neon-teal">Starlite Drive-In</p>
          <h1 className="font-neon text-3xl tracking-wider neon-pink lg:text-5xl">{FILM_TITLE}</h1>
          <p className="mt-1 text-xs uppercase tracking-[0.4em] text-marquee">Now Showing</p>
          <div className="h-3 w-full marquee-bulbs" />
        </div>
      </div>

      {/* Ground */}
      <div className="absolute bottom-0 h-[28%] w-full bg-gradient-to-b from-night to-night-deep" />

      {/* Cars */}
      <img src={cars} alt="Row of 1950s cars facing the screen" width={1920} height={230} className="absolute bottom-[6%] left-1/2 w-[110vw] max-w-none -translate-x-1/2 drop-shadow-[0_10px_20px_var(--night-deep)]" />

      {/* Dashboard controls */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-4 text-xs uppercase tracking-[0.3em]">
        <h1 className="font-neon text-xl neon-pink md:hidden">{FILM_TITLE}</h1>
        {FILM_SRC && (
          <button
            onClick={() => { setMuted((m) => !m); video.current?.play(); }}
            className="rounded-full border border-marquee/60 px-5 py-2 text-marquee transition hover:bg-marquee hover:text-night"
          >
            {muted ? "Tune in sound" : "Mute"}
          </button>
        )}
        <span className="hidden text-screen-glow/50 md:inline">tune your radio to 88.5 fm</span>
      </div>
    </main>
  );
}
