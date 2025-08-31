import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type Point = { x: number; y: number };

const InputPage: React.FC = () => {
  const navigate = useNavigate();

  const [points, setPoints] = useState<Point[]>([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);

  const handleChange = (index: number, axis: "x" | "y", value: number) => {
    const newPoints = [...points];
    newPoints[index][axis] = value;
    setPoints(newPoints);
  };

  const handleSubmit = () => {
    const valid = points.every(p => p.x >= 0 && p.x <= 800 && p.y >= 0 && p.y <= 800);
    if (!valid) {
      alert("הערכים חייבים להיות בין 0 ל-800");
      return;
    }
    navigate("/display", { state: points });
  };

  return (
    <div style={{
      padding: "30px",
      maxWidth: "450px",
      margin: "40px auto",
      borderRadius: "12px",
      backgroundColor: "#f9f9f9",
      boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
      fontFamily: "Arial, sans-serif"
    }}>
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>
        הזן שלוש נקודות
      </h2>
      {points.map((point, index) => (
        <div key={index} style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
          padding: "8px 12px",
          borderRadius: "8px",
          backgroundColor: "#fff",
          boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)"
        }}>
          <label style={{ flex: 1, marginRight: "10px" }}>
            נקודה {index + 1} - X:
            <input
              type="number"
              value={point.x}
              min={0} max={800}
              onChange={(e) => handleChange(index, "x", Number(e.target.value))}
              style={{
                marginLeft: "5px",
                width: "90px",
                padding: "5px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                outline: "none",
                transition: "0.2s"
              }}
            />
          </label>
          <label style={{ flex: 1 }}>
            Y:
            <input
              type="number"
              value={point.y}
              min={0} max={800}
              onChange={(e) => handleChange(index, "y", Number(e.target.value))}
              style={{
                marginLeft: "5px",
                width: "90px",
                padding: "5px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                outline: "none",
                transition: "0.2s"
              }}
            />
          </label>
        </div>
      ))}
      <button
        onClick={handleSubmit}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          transition: "0.3s"
        }}
        onMouseOver={e => (e.currentTarget.style.backgroundColor = "#0056b3")}
        onMouseOut={e => (e.currentTarget.style.backgroundColor = "#007bff")}
      >
        הצג משולש
      </button>
    </div>
  );
};

export default InputPage;
