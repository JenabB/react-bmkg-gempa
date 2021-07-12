import React from 'react';
import axios from 'axios';
import xml2js from 'xml2js';
import './Cuaca.css';

import Card from '@material-ui/core/Card';
import cloudy from '../assets/images/001-cloudy day.png';
import sunny from '../assets/images/002-sunny.png';

class Cuaca extends React.Component {
  state = {
    datacuaca: [],
  };

  async componentDidMount() {
    const xmlParser = new xml2js.Parser({
      explicitArray: false,
    });
    try {
      const response = await axios.get(
        'https://data.bmkg.go.id/datamkg/MEWS/DigitalForecast/DigitalForecast-Bengkulu.xml',
        {
          'Content-Type': 'application/xml;',
        }
      );
      const parsedXml = await xmlParser.parseStringPromise(response.data);
      const {
        data: { forecast },
      } = parsedXml;
      this.setState({ datacuaca: forecast });
    } catch (error) {
      console.error('error', error);
    }
  }

  render() {
    const { datacuaca } = this.state;
    return (
      <div className="cuaca-container">
        {datacuaca?.area?.map((dataforecast, index) => (
          <Card key={index} align="center" className="cuaca-container">
            <h1>{dataforecast.name[0]._}</h1>
            {dataforecast.parameter[6].timerange[0].value._ === '1' ? (
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
