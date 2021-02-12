import React from "react";
import { Card } from "@material-ui/core";
import "./Cuaca.css";

const About = () => {
  const credits = [
    {
      nama: "kotakode.com",
      sebagai: "Penyedia forum dan bantuan",
    },
    {
      nama: "BMKG",
      sebagai: "Open API",
    },
    {
      nama: "fjstudio",
      sebagai: "Weather Icons from flaticon.com",
    },
  ];

  return (
    <div className="about-container">
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

export default About;
