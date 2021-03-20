import React from "react";
import "./Contributor.css";

const Contributor = () => {
  const credits = [
    {
      nama: "Yogi Surya Pranata",
      sebagai: "Developer & Idea",
    },
    {
      nama: "kotakode.com",
      sebagai: "Penyedia forum dan bantuan",
    },
    {
      nama: "BMKG",
      sebagai: "penyedia Open API",
    },

    {
      nama: "fjstudio",
      sebagai: "Weather Icons from flaticon.com",
    },
    { nama: "Hendra Agil", sebagai: "problem solver dari kotakode.com" },
  ];

  return (
    <div className="contributor-container">
      <h1>Kontributor</h1>
      {credits.map((credit, index) => (
        <div key={index}>
          <table>
            <tr>
              <td>{credit.nama}</td>
              <td>{credit.sebagai}</td>
            </tr>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Contributor;
