import React from "react";
import "./About.css";

const Abouts = () => {
  return (
    <div className="about-container">
      <h1 className="contributor-title">Tentang</h1>
      <div className="contributor-content">
        <p style={{ textAlign: "justify" }}>
          Sebuah Web App yang menampilkan data gempa terbaru, prakiraan cuaca,
          dan gempa yang dirasakan dalam 20 data menggunakan API dari data
          terbuka BMKG. Jika ingin mengembangkan Web App ini silahkan klik{" "}
          <a href="https://github.com/JenabB/react-bmkg-gempa">
            <b style={{ fontSize: "18px", color: "teal" }}>Ini</b>
          </a>
        </p>
      </div>
    </div>
  );
};

export default Abouts;
