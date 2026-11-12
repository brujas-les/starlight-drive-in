import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import wall from "@/assets/poster-wall/wall-sample.webp.asset.json";
import p1 from "@/assets/poster-wall/poster-01.jpg.asset.json";
import p2 from "@/assets/poster-wall/poster-02.jpg.asset.json";
import p3 from "@/assets/poster-wall/poster-03.jpg.asset.json";
import p4 from "@/assets/poster-wall/poster-04.jpg.asset.json";
import p5 from "@/assets/poster-wall/poster-05.jpg.asset.json";
import p6 from "@/assets/poster-wall/poster-06.jpg.asset.json";
import p7 from "@/assets/poster-wall/poster-07.jpg.asset.json";
import p8 from "@/assets/poster-wall/poster-08.jpg.asset.json";
import p9 from "@/assets/poster-wall/poster-09.jpg.asset.json";
import p10 from "@/assets/poster-wall/poster-10.jpg.asset.json";
import type { ReactNode } from "react";

const posters = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10];

export function PosterWall({ children }: { children: ReactNode }) {
  const [take, setTake] = useState(0);
  return (
    <div className="poster-scene">
      <img className="wall-photo" src={wall.url} alt="A street wall covered in graffiti and pasted posters" fetchPriority="high" />
      <div className="wall-shade" />
      <div key={take} className="poster-layout">
        {posters.map((poster, index) => (
          <div className={`pasted-poster poster-${index + 1}`} key={poster.asset_id}>
            <div className="poster-paper">
              <img src={poster.url} alt={`Boycott poster artwork ${index + 1}`} draggable={false} />
              <span className="paste-pass" aria-hidden="true" />
            </div>
          </div>
        ))}
        <div className="wall-screen">{children}</div>
      </div>
      <Button variant="ghost" size="icon" className="wall-replay" title="Replay poster animation" aria-label="Replay poster animation" onClick={() => setTake(v => v + 1)}>
        <RotateCcw />
      </Button>
    </div>
  );
}