import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PosterWall } from "@/components/poster-wall";

const FILM_SRC = "";
const FILM_TITLE = "Your Film";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: `${FILM_TITLE} — The Poster Wall` },
    { name: "description", content: "Watch the film on a street-wall screen surrounded by original wheat-paste poster artwork." },
    { property: "og:title", content: `${FILM_TITLE} — The Poster Wall` },
    { property: "og:description", content: "A film screening surrounded by animated wheat-paste posters." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

function Countdown() {
  const [n, setN] = useState(8);
  useEffect(() => {
    const timer = setInterval(() => setN(v => v <= 1 ? 8 : v - 1), 1000);
    return () => clearInterval(timer);
  }, []);
  return <div className="wall-countdown" aria-label="Film countdown placeholder">
    <div className="countdown-ring outer" /><div className="countdown-ring inner" />
    <div className="countdown-cross horizontal" /><div className="countdown-cross vertical" />
    <div className="countdown-sweep" />
    <span>{n}</span><div className="film-grain absolute inset-0 pointer-events-none" />
  </div>;
}

function Index() {
  const video = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  return <main className="poster-page font-body">
    <section className="wall-section">
      <PosterWall>
        <div className="screen-caption"><h1>{FILM_TITLE}</h1><span>Now showing</span></div>
        <div className="wall-film-frame">
          {FILM_SRC ? <video ref={video} src={FILM_SRC} autoPlay loop muted={muted} playsInline controls className="h-full w-full object-contain" /> : <Countdown />}
        </div>
        {FILM_SRC && <Button variant="ghost" size="icon" className="film-sound" title={muted ? "Turn sound on" : "Mute"} aria-label={muted ? "Turn sound on" : "Mute"} onClick={() => { setMuted(v => !v); video.current?.play(); }}>{muted ? <VolumeX /> : <Volume2 />}</Button>}
      </PosterWall>
    </section>
    <section id="about" className="wall-about">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-baseline justify-between gap-4 border-b border-wall-ink/25 pb-5"><h2 className="text-3xl md:text-4xl">About the film</h2><span className="text-xs uppercase">01 / Film notes</span></div>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <p className="text-lg font-light leading-relaxed">Synopsis coming soon.</p>
          <dl className="grid grid-cols-2 gap-6 text-sm">{[["Director", "—"], ["Year", "—"], ["Runtime", "—"], ["Genre", "—"]].map(([label, value]) => <div key={label}><dt className="text-xs uppercase opacity-60">{label}</dt><dd className="mt-1">{value}</dd></div>)}</dl>
        </div>
      </div>
    </section>
  </main>;
}
