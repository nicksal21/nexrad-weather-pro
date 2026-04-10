import axios from 'axios';

async function test() {
  try {
    const response = await axios.get('https://api.weather.gov/openapi.json');
    console.log(Object.keys(response.data.paths).filter(p => p.includes('radar')));
  } catch (err: any) {
    console.error(err.message);
  }
}

test();
