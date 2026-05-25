"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export default function StudioPage() {
  return (
    <>
      <style>{`
        #header, footer, [data-bigwordmark] { display: none !important; }
        main { padding: 0 !important; }
      `}</style>
      <div style={{ height: "100vh", overflow: "auto" }}>
        <NextStudio config={config} />
      </div>
    </>
  );
}
