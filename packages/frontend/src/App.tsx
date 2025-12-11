import React, { useEffect, useState } from "react";
import axios from "axios";

type Video = {
  _id: string;
  title: string;
  description?: string;
  assets?: { poster?: string; hls?: string };
};

export default function App() {
  const [videos, setVideos] = useState<Video[]>([]);
  useEffect(() => {
    axios.get("/api/videos").then((r) => setVideos(r.data.data || []));
  }, []);
  return (
    <div style={{ padding: 24 }}>
      <h1>Netflix Clone — Dev</h1>
      <div>
        {videos.map((v) => (
          <div key={v._id}>
            <h3>{v.title}</h3>
            <p>{v.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
