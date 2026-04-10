import axios from 'axios';

async function test() {
  try {
    const response = await axios.get('https://www.weather.gov/documentation/services-web-api');
    console.log(response.data);
  } catch (err: any) {
    console.error(err.message);
  }
}

test();
