// Showing XML Data.
// Based on this tutorial:
// https://www.pluralsight.com/guides/how-to-display-xml-data-using-reactjs?fbclid=IwAR2ZHWSvbR6O7HsrwEeiQb7QTFyEEocrWfrYnQlsDUhotu91YrQ9a3snW1M
import React from "react";
import axios from "axios";
// Library yang digunakan untuk parsing xml menjadi object
import xml2js from "xml2js";
import "./BMKG.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

// NOTE : Pada artikel diatas, data dari contoh pertama sepertinya sudah di-parse
// oleh server menjadi object jadi kita tinggal menampilkan datanya saja.
// Data dari contoh kodingan ini hasilnya masih berupa string xml dan harus kita
// ubah terlebih dahulu.

class BMKG extends React.Component {
  state = {
    data: {},
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
        "https://data.bmkg.go.id/DataMKG/TEWS/autogempa.xml",
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
        Infogempa: { gempa },
      } = parsedXml;
      // setelah parsing berhasil, hasilnya akan kita simpan di state
      this.setState({ data: gempa });
    } catch (error) {
      console.error("error", error);
    }
  }

  render() {
    const { data } = this.state;
    console.log("data gempa", data);
    // Tampilkan data...
    return (
      <div className="bmkg-container">
        <Card>
          <div>
            <img
              className="shakemap"
              src={`https://data.bmkg.go.id/DataMKG/TEWS/${data.Shakemap}`}
              alt="Shakemap"
            />
            <CardContent>
              <h1 className="tanggal-gempa">{data.Tanggal}</h1>
              <h2 className="wilayah-gempa">{data.Wilayah}</h2>
              <h1 className="magnitude-gempa">{data.Magnitude}</h1>
              <h1 className="kedalaman-gempa">{data.Kedalaman}</h1>
              <p className="waktu-gempa">{data.Jam}</p>
              <p className="potensi-gempa">{data.Potensi}</p>
            </CardContent>
          </div>
        </Card>
      </div>
    );
  }
}

export default BMKG;
