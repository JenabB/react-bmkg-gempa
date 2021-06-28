import React from 'react';
import axios from 'axios';
import xml2js from 'xml2js';
import './Gempadirasakan.css';
import Card from '@material-ui/core/Card';

class Gempadirasakan extends React.Component {
  state = {
    datadirasakan: [],
  };

  async componentDidMount() {
    const xmlParser = new xml2js.Parser({
      explicitArray: false,
    });
    try {
      const response = await axios.get(
        'https://data.bmkg.go.id/gempadirasakan.xml',
        {
          'Content-Type': 'application/xml;',
        }
      );
      const parsedXml = await xmlParser.parseStringPromise(response.data);
      const {
        Infogempa: { Gempa },
      } = parsedXml;
      this.setState({ datadirasakan: Gempa });
    } catch (error) {
      console.error('error', error);
    }
  }

  render() {
    const { datadirasakan } = this.state;
    return (
      <div className="">
        {datadirasakan?.map((dirasakan, index) => (
          <Card key={index} align="center" className="dirasakan-card">
            <h4 className="tanggal-gempa-dirasakan">{dirasakan.Tanggal}</h4>
            <h1>{dirasakan.Dirasakan}</h1>
            <h3>{dirasakan.Keterangan}</h3>
            <h4 className="magnitude-gempa-dirasakan">{dirasakan.Magnitude}</h4>
            <h2>{dirasakan.Kedalaman}</h2>
            <h3>{dirasakan.Posisi}</h3>
          </Card>
        ))}
      </div>
    );
  }
}

export default Gempadirasakan;
