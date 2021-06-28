import React from 'react';
import axios from 'axios';
import xml2js from 'xml2js';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  withStyles,
} from '@material-ui/core';

const TextTypography = withStyles({
  root: { color: 'teal', fontWeight: 'bold' },
})(Typography);
class BMKG extends React.Component {
  state = {
    data: {},
  };

  async componentDidMount() {
    const xmlParser = new xml2js.Parser({
      explicitArray: false,
    });
    try {
      const response = await axios.get(
        'https://data.bmkg.go.id/DataMKG/TEWS/autogempa.xml',
        {
          'Content-Type': 'application/xml;',
        }
      );
      const parsedXml = await xmlParser.parseStringPromise(response.data);
      const {
        Infogempa: { gempa },
      } = parsedXml;
      this.setState({ data: gempa });
    } catch (error) {
      console.error('error', error);
    }
  }

  render() {
    const { data } = this.state;
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh', paddingBottom: '50px' }}
      >
        <Grid>
          <Card>
            <div>
              <img
                style={{ width: '100%' }}
                src={`https://data.bmkg.go.id/DataMKG/TEWS/${data.Shakemap}`}
                alt="Shakemap"
              />
              <CardContent style={{ textAlign: 'center' }}>
                <TextTypography component="h1" align="center">
                  {data.Wilayah}
                </TextTypography>

                <h1 style={{ textAlign: 'center' }}>{data.Tanggal}</h1>
                <h1 className="magnitude-gempa-dirasakan">{data.Magnitude}</h1>
                <h1 className="kedalaman-gempa">{data.Kedalaman}</h1>
                <p className="waktu-gempa">{data.Jam}</p>
                <p className="potensi-gempa">{data.Potensi}</p>
              </CardContent>
            </div>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default BMKG;
