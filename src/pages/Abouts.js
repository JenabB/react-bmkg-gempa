import React from 'react';
import './About.css';

const Abouts = () => {
  const credits = [
    {
      nama: 'Yogi Surya Pranata',
      sebagai: 'Developer & Idea',
    },
    {
      nama: 'kotakode.com',
      sebagai: 'Penyedia forum dan bantuan',
    },
    {
      nama: 'BMKG',
      sebagai: 'penyedia Open API',
    },

    {
      nama: 'fjstudio',
      sebagai: 'Weather Icons from flaticon.com',
    },
    { nama: 'Hendra Agil', sebagai: 'problem solver dari kotakode.com' },
  ];

  return (
    <div>
      <div className="about-container">
        <h1 className="contributor-title">Tentang</h1>
        <div className="contributor-content">
          <p style={{ textAlign: 'justify' }}>
            Sebuah Web App yang menampilkan data gempa terbaru, prakiraan cuaca,
            dan gempa yang dirasakan dalam 20 data menggunakan API dari data
            terbuka BMKG. Jika ingin mengembangkan Web App ini silahkan klik{' '}
            <a href="https://github.com/JenabB/react-bmkg-gempa">
              <b style={{ fontSize: '18px', color: 'teal' }}>Ini</b>
            </a>
          </p>
        </div>
      </div>
      <div className="contributor-container">
        <h1 className="contributor-title">Kontributor</h1>
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
    </div>
  );
};

export default Abouts;
