// Showing XML Data.
// Based on this tutorial:
// https://www.pluralsight.com/guides/how-to-display-xml-data-using-reactjs?fbclid=IwAR2ZHWSvbR6O7HsrwEeiQb7QTFyEEocrWfrYnQlsDUhotu91YrQ9a3snW1M
import React from "react";
import axios from "axios";
// Library yang digunakan untuk parsing xml menjadi object
import xml2js from "xml2js";
import "./BMKG.css";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

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
        "https://data.bmkg.go.id/autogempa.xml",
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
    console.log("data", data);
    // Tampilkan data...
    return (
      <div className="containerBMKG">
        <Card className="cardContainer">
          <CardActionArea>
            <img
              className="gambar-gempa"
              src="https://data.bmkg.go.id/eqmap.gif"
              alt="Girl in a jacket"
            />
            <CardContent>
              <Typography
                className="tanggalGempa"
                variant="body2"
                component="p"
              >
                {data.Tanggal}
              </Typography>
              <Typography
                className="titleCard"
                gutterBottom
                variant="h5"
                component="h2"
              >
                {data.Potensi}
              </Typography>

              <Typography variant="body2" color="textSecondary" component="p">
                {data.Jam}
              </Typography>
              <div className="wilayahContainer">
                <p className="wilayah">{data.Wilayah1}</p>
                <p className="wilayah">{data.Wilayah2}</p>
                <p className="wilayah">{data.Wilayah3}</p>
              </div>
            </CardContent>
          </CardActionArea>
          <div class="flex-container">
            <div>{data.Magnitude}</div>
            <div>{data.Kedalaman}</div>
          </div>
        </Card>
      </div>
    );
  }
}

export default BMKG;
