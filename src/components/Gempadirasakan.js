// Showing XML Data.
// Based on this tutorial:
// https://www.pluralsight.com/guides/how-to-display-xml-data-using-reactjs?fbclid=IwAR2ZHWSvbR6O7HsrwEeiQb7QTFyEEocrWfrYnQlsDUhotu91YrQ9a3snW1M
import React from "react";
import axios from "axios";
// Library yang digunakan untuk parsing xml menjadi object
import xml2js from "xml2js";
import "./Gempadirasakan.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

// NOTE : Pada artikel diatas, data dari contoh pertama sepertinya sudah di-parse
// oleh server menjadi object jadi kita tinggal menampilkan datanya saja.
// Data dari contoh kodingan ini hasilnya masih berupa string xml dan harus kita
// ubah terlebih dahulu.

class Gempadirasakan extends React.Component {
  state = {
    datadirasakan: [],
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
        "https://data.bmkg.go.id/gempadirasakan.xml",
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
        Infogempa: { Gempa },
      } = parsedXml;
      // setelah parsing berhasil, hasilnya akan kita simpan di state
      this.setState({ datadirasakan: Gempa });
    } catch (error) {
      console.error("error", error);
    }
  }

  render() {
    const { datadirasakan } = this.state;
    console.log("Gempa Dirasakan", datadirasakan);
    // Tampilkan data...
    return (
      <div className="dirasakan-container">
        {datadirasakan?.map((dirasakan, index) => (
          <Card key={index} className="dirasakan-card">
            <h1>{dirasakan.Dirasakan}</h1>
            <h2>{dirasakan.Kedalaman}</h2>
            <h4>{dirasakan.Tanggal}</h4>
            <h3>{dirasakan.Posisi}</h3>
            <h3>{dirasakan.Keterangan}</h3>
            <h4>{dirasakan.Magnitude} Sr</h4>
          </Card>
        ))}
      </div>
    );
  }
}

export default Gempadirasakan;
