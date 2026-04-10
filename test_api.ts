import axios from 'axios';

async function test() {
  try {
    const response = await axios.get('https://api.weather.gov/radar/stations', {
      headers: { 'User-Agent': 'NEXRAD-Radar-Pro/1.0' }
    });
    console.log(JSON.stringify(response.data.features[0], null, 2));
  } catch (err: any) {
    console.error(err.message);
  }
}

test();
