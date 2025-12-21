import React, { useRef } from "react";

export default function VideoPlayerUseRef() {
  const videoRef = useRef(null);

  const handlePlay = () => {
    videoRef.current?.play();
  };

  const handlePause = () => {
    videoRef.current?.pause();
  };

  const handleForward = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.min(
      videoRef.current.currentTime + 5,
      videoRef.current.duration || Infinity
    );
  };

  const handleRewind = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 5, 0);
  };

  return (
    <div style={{ maxWidth: 720, margin: "24px auto", fontFamily: "serif" }}>
      <h1>Video Player Using <span style={{ background: "#eee", padding: "2px 6px", borderRadius: 6 }}>useRef</span></h1>

      <hr />

      <h2>Objective</h2>
      <p>
        To understand how <b>useRef</b> can control a <b>DOM element</b> directly and how UI behavior can change without changing React state.
      </p>

      <hr />

      <h2>Video</h2>
      <video
        ref={videoRef}
        width="100%"
        controls
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        style={{ borderRadius: 12, background: "#000" }}
      />

      <div style={{ display: "flex", gap: 12, marginTop: 14, flexWrap: "wrap" }}>
        <button onClick={handlePlay}>▶ Play</button>
        <button onClick={handlePause}>⏸ Pause</button>
        <button onClick={handleForward}>⏩ Forward (skip 5s)</button>
        <button onClick={handleRewind}>⏪ Rewind (go back 5s)</button>
      </div>

      <hr style={{ marginTop: 20 }} />

      <h2>Very Important Observation (Must Be Written by Students)</h2>
      <ul>
        <li><b>Clicking Play / Pause / Forward / Rewind:</b>
          <ul>
            <li>Does NOT change React state</li>
            <li>Does NOT change the video source</li>
            <li>Still changes the video behavior</li>
          </ul>
        </li>
        <li><b>This happens because:</b>
          <ul>
            <li>The video is controlled using <b>useRef</b></li>
            <li><b>useRef</b> does not cause re-rendering</li>
          </ul>
        </li>
      </ul>

      <hr />

      <h2>What NOT to Do</h2>
      <ul>
        <li>❌ Do NOT store play/pause status in useState</li>
        <li>❌ Do NOT change the video src in the mandatory part</li>
        <li>❌ Do NOT use document.getElementById</li>
      </ul>

      <style>{`
        button {
          padding: 10px 14px;
          border: 1px solid #ccc;
          border-radius: 10px;
          background: #f7f7f7;
          cursor: pointer;
          font-size: 14px;
        }
        button:hover {
          background: #efefef;
        }
      `}</style>
    </div>
  );
}
