import { useState } from "react";

const grenadeData = [
  {
    map: "Standoff",
    from: { x: 105, y: 415 },
    to: { x: 345, y: 165 },
    video: "https://www.tiktok.com/@vki.07/video/7492795739832143159"
  }
];

export default function Home() {
  const [mode, setMode] = useState("throw");
  const [selected, setSelected] = useState(null);

  const handleSelect = (index) => setSelected(index);

  return (
    <div style={{ padding: 20 }}>
      <h1>CODM Grenade Lineups - Standoff</h1>
      <select value={mode} onChange={(e) => setMode(e.target.value)}>
        <option value="throw">顯示投擲點</option>
        <option value="explode">顯示炸點</option>
      </select>

      <div style={{ position: 'relative', width: '100%', maxWidth: 800, height: 500, marginTop: 20 }}>
        <img
          src="/standoff-map.png"
          alt="Standoff Map"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
        {grenadeData.map((g, idx) => (
          <>
            {mode === "throw" && (
              <div
                key={"throw" + idx}
                onClick={() => handleSelect(idx)}
                style={{
                  position: "absolute",
                  width: 10,
                  height: 10,
                  backgroundColor: "yellow",
                  borderRadius: "50%",
                  left: g.from.x,
                  top: g.from.y,
                  cursor: "pointer",
                }}
              />
            )}
            {mode === "explode" && (
              <div
                key={"explode" + idx}
                onClick={() => handleSelect(idx)}
                style={{
                  position: "absolute",
                  width: 10,
                  height: 10,
                  backgroundColor: "red",
                  borderRadius: "50%",
                  left: g.to.x,
                  top: g.to.y,
                  cursor: "pointer",
                }}
              />
            )}
            {selected === idx && (
              <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                <line
                  x1={g.from.x}
                  y1={g.from.y}
                  x2={g.to.x}
                  y2={g.to.y}
                  stroke="deepskyblue"
                  strokeWidth="2"
                />
              </svg>
            )}
          </>
        ))}
      </div>

      {selected !== null && (
        <div style={{ marginTop: 20 }}>
          <p>對應影片：</p>
          <a href={grenadeData[selected].video} target="_blank" rel="noreferrer">
            查看 TikTok 影片
          </a>
        </div>
      )}
    </div>
  );
}
