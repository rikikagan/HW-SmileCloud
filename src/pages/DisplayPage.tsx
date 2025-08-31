import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Point = { x: number; y: number };

const distance = (p1: Point, p2: Point) =>
  Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);

const computeAngle = (A: Point, B: Point, C: Point) => {
  const a = distance(B, C);
  const b = distance(A, C);
  const c = distance(A, B);
  return Math.acos((b ** 2 + c ** 2 - a ** 2) / (2 * b * c));
};

const DisplayPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const points: Point[] = location.state as Point[];

  if (!points || points.length !== 3) {
    return <div>לא הוזנו נקודות כראוי</div>;
  }

  const [A, B, C] = points;
  const angleA = computeAngle(A, B, C);
  const angleB = computeAngle(B, A, C);
  const angleC = computeAngle(C, A, B);



const drawArc = (vertex: Point, p1: Point, p2: Point) => {
  const angle1 = Math.atan2(p1.y - vertex.y, p1.x - vertex.x);
  const angle2 = Math.atan2(p2.y - vertex.y, p2.x - vertex.x);

  const arcRadius = Math.min(distance(vertex, p1), distance(vertex, p2)) * 0.2;

  const start = {
    x: vertex.x + arcRadius * Math.cos(angle1),
    y: vertex.y + arcRadius * Math.sin(angle1),
  };
  const end = {
    x: vertex.x + arcRadius * Math.cos(angle2),
    y: vertex.y + arcRadius * Math.sin(angle2),
  };

  let sweepFlag = 0;
  let diff = angle2 - angle1;
  if (diff < 0) diff += 2 * Math.PI;
  if (diff > Math.PI) {
    sweepFlag = 0;
  } else {
    sweepFlag = 1;
  }

  return `M ${start.x} ${start.y} A ${arcRadius} ${arcRadius} 0 0 ${sweepFlag} ${end.x} ${end.y}`;
};

  const angleTextNearVertex = (
    vertex: Point,
    p1: Point,
    p2: Point,
    factor = 0.3
  ) => {
    const midX = (p1.x + p2.x) / 2;
    const midY = (p1.y + p2.y) / 2;
    const dirX = vertex.x + (midX - vertex.x) * factor;
    const dirY = vertex.y + (midY - vertex.y) * factor;
    return { x: dirX, y: dirY };
  };

  const posA = angleTextNearVertex(A, B, C);
  const posB = angleTextNearVertex(B, A, C);
  const posC = angleTextNearVertex(C, A, B);

 return (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center", 
      justifyContent: "center", 
      minHeight: "100vh", 
      padding: "20px",
      boxSizing: "border-box",
    }}
  >
    <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
      המשולש שלך עם הזוויות
    </h2>

    <svg width="800" height="800" style={{ border: "1px solid black" }}>
      <polygon
        points={points.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="none"
        stroke="black"
        strokeWidth={2}
      />

      <path d={drawArc(A, B, C)} stroke="blue" fill="none" strokeWidth={2} />
      <path d={drawArc(B, A, C)} stroke="blue" fill="none" strokeWidth={2} />
      <path d={drawArc(C, A, B)} stroke="blue" fill="none" strokeWidth={2} />

      <text x={posA.x} y={posA.y} fontSize={16} fill="red">
        {(angleA * (180 / Math.PI)).toFixed(1)}°
      </text>
      <text x={posB.x} y={posB.y} fontSize={16} fill="red">
        {(angleB * (180 / Math.PI)).toFixed(1)}°
      </text>
      <text x={posC.x} y={posC.y} fontSize={16} fill="red">
        {(angleC * (180 / Math.PI)).toFixed(1)}°
      </text>
    </svg>

    <button
      onClick={() => navigate("/")}
      style={{
        marginTop: "20px",
        padding: "10px 20px",
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        cursor: "pointer",
      }}
    >
      חזרה להזנת נקודות
    </button>
  </div>
);

};

export default DisplayPage;
