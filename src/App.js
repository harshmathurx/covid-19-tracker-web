import './App.css';
import { Card, CardContent, FormControl, MenuItem, Select, Table } from '@material-ui/core';
import { useState } from 'react';
import { useEffect } from 'react';
import InfoBox from './InfoBox';
import Map from "./Map.jsx";
function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo,setCountryInfo] = useState({});
  const [tableData,setTableData] = useState([]);

  useEffect( () => {
    fetch("https://disease.sh/v3/covid-19/all").then(response => response.json()).then(data => {
      setCountryInfo(data);
    })
  },[])


  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode)

    const url = countryCode==='worldwide'?"https://disease.sh/v3/covid-19/all":"https://disease.sh/v3/covid-19/countries/"+countryCode;

    await fetch(url).then(response => response.json()).then(data => {
      setCountry(countryCode);

      setCountryInfo(data);
    });
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid 19 tracker</h1>
          <FormControl className='app__dropdown'>
            <Select variant='outlined' value={country} onChange={onCountryChange}>
              <MenuItem value="worldwide">Worldwide</MenuItem>

              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))};

            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" total={countryInfo.cases} cases={countryInfo.todayCases} />

          <InfoBox title="Recovered" total={countryInfo.recovered} cases={countryInfo.todayRecovered} />

          <InfoBox title="Deaths" total={countryInfo.deaths} cases={countryInfo.todayDeaths} />
        </div>

        <Map />
      </div>

      <Card className="app__right">
        <CardContent >
          <h3>Worldwide Cases by country</h3>
          <Table countries={tableData} />

          <h3>Worldwide new cases</h3>
          {/* Graph */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
