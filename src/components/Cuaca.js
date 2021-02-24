// Showing XML Data.
// Based on this tutorial:
// https://www.pluralsight.com/guides/how-to-display-xml-data-using-reactjs?fbclid=IwAR2ZHWSvbR6O7HsrwEeiQb7QTFyEEocrWfrYnQlsDUhotu91YrQ9a3snW1M
import React from "react";
import axios from "axios";
// Library yang digunakan untuk parsing xml menjadi object
import xml2js from "xml2js";
import "./Cuaca.css";
import Card from "@material-ui/core/Card";

import cloudy from "../assets/images/001-cloudy day.png";
import rain from "../assets/images/009-rainy.png";
import sunny from "../assets/images/002-sunny.png";

import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

// NOTE : Pada artikel diatas, data dari contoh pertama sepertinya sudah di-parse
// oleh server menjadi object jadi kita tinggal menampilkan datanya saja.
// Data dari contoh kodingan ini hasilnya masih berupa string xml dan harus kita
// ubah terlebih dahulu.

class Cuaca extends React.Component {
  state = {
    datacuaca: [],
  };

  async componentDidMount() {
    const xmlParser = new xml2js.Parser({
      // Konfigurasi ini digunakan untuk mencegah hasil parsing
      // diubah menjadi array
      // Untuk info lebih lanjut, silahkan pelajari dokumentasi:
      // https://github.com/Leonidas-from-XIV/node-xml2js#options
      explicitArray: false,
    });
    try {
      const response = await axios.get(
        "https://data.bmkg.go.id/datamkg/MEWS/DigitalForecast/DigitalForecast-Bengkulu.xml",
        {
          "Content-Type": "application/xml;",
        }
      );
      // karena hasil xml belum di-parsing oleh server kita harus
      // melakukan parsing-nya di client-side.
      // Untuk mencegah terjadinya race condition kita bisa mengggunakan
      // fitur parseStringPromise();
      // https://github.com/Leonidas-from-XIV/node-xml2js#promise-usage
      const parsedXml = await xmlParser.parseStringPromise(response.data);
      // destructuring: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
      const {
        data: { forecast },
      } = parsedXml;
      // setelah parsing berhasil, hasilnya akan kita simpan di state
      this.setState({ datacuaca: forecast });
    } catch (error) {
      console.error("error", error);
    }
  }

  render() {
    const { datacuaca } = this.state;
    console.log("cuaca", datacuaca);
    // Tampilkan data...
    return (
      <div className="forecast-container">
        {datacuaca?.area?.map((dataforecast, index) => (
          <Card key={index} className="cuaca-container">
            <h1>{dataforecast.name[0]._}</h1>
            {dataforecast.parameter[6].timerange[0].value._ == "1" ? (
              <img src={sunny} alt="weather" width="80px" />
            ) : (
              <img src={cloudy} alt="weather" width="80px" />
            )}
            <table className="table-condition">
              <tr>
                <td>{dataforecast.parameter[0].$.description}</td>
                <td>{dataforecast.parameter[0].timerange[0].value._} %</td>
              </tr>
              <tr>
                <td>{dataforecast.parameter[5].$.description}</td>
                <td>
                  {dataforecast.parameter[5].timerange[0].value[0]._} &deg;C
                </td>
              </tr>
            </table>
          </Card>
        ))}
      </div>
    );
  }
}

export default Cuaca;
