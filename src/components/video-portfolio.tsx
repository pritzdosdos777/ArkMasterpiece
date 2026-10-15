"use client";

import { useState } from "react";
import { Clapperboard } from "lucide-react";
import importedVideos from "@/data/videos.json";

type VideoProject = {
  id: string;
  title: string;
  src: string | null;
  poster: string | null;
  captions: string | null;
  width?: number;
  height?: number;
};

function VideoCard({ video }: { video: VideoProject }) {
  const [failed, setFailed] = useState(false);
  return (
    <article className="video-card">
      {video.src ? (
        <>
          <video
            controls
            width={video.width}
            height={video.height}
            style={{
              aspectRatio: `${video.width || 9} / ${video.height || 16}`,
            }}
            playsInline
            preload="none"
            poster={video.poster || undefined}
            src={video.src}
            aria-label={video.title}
            onError={() => setFailed(true)}
            onPlay={(event) => {
              const current = event.currentTarget;
              document
                .querySelectorAll(".video-portfolio video")
                .forEach((player) => {
                  if (player !== current) (player as HTMLVideoElement).pause();
                });
            }}
          >
            {video.captions && (
              <track
                kind="captions"
                src={video.captions}
                srcLang="en"
                label="English"
                default
              />
            )}
            Your browser does not support video playback.
          </video>
          {failed && (
            <p role="status">
              This video could not load. Try opening the video directly below.
            </p>
          )}
          <h3>{video.title}</h3>
          <a href={video.src} target="_blank" rel="noopener noreferrer">
            Open video in a new tab
          </a>
        </>
      ) : (
        <div className="video-pending">
          <Clapperboard size={23} strokeWidth={1.2} aria-hidden="true" />
          <div>
            <h3>{video.title}</h3>
            <p>Preview pending</p>
          </div>
        </div>
      )}
    </article>
  );
}

export function VideoPortfolio() {
  const videos: VideoProject[] = importedVideos;
  const available = videos.filter((video) => video.src);
  return (
    <section
      className="section video-portfolio"
      id="video-editing"
      aria-labelledby="video-heading"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">MOTION & STORYTELLING</p>
          <h2 id="video-heading">Video Editing</h2>
        </div>
        <p className="narrow">
          {available.length
            ? "Explore video editing samples. Choose a video to watch with sound and fullscreen controls."
            : "Video previews are being prepared for viewing. Check back soon to explore the collection."}
        </p>
      </div>
      <div className="video-grid">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </section>
  );
}
