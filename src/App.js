import './App.css';
import { Card, CardContent, FormControl, MenuItem, Select, Table } from '@material-ui/core';
import { useState } from 'react';
import { useEffect } from 'react';
import InfoBox from './InfoBox';
import Map from "./Map.jsx";
import Tables from './Tables';
import {sortData, prettyPrintStat} from "./util";
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";
function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo,setCountryInfo] = useState({});
  const [tableData,setTableData] = useState([]);
  const [mapCenter,setMapCenter] = useState([34.80746, -40.4796]);
  const [mapZoom,setMapZoom] = useState(2);
  const [mapCountries,setMapCountries] = useState([]);

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
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
          setMapCountries(data);
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

      if(countryCode==='worldwide'){
        setMapCenter([34.80746, -40.4796]);
        setMapZoom(3);
      }
      else{
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      }
        
    });
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
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
          <InfoBox title="Coronavirus Cases" total={prettyPrintStat(countryInfo.cases)} cases={prettyPrintStat(countryInfo.todayCases)} />

          <InfoBox title="Recovered" total={prettyPrintStat(countryInfo.recovered)} cases={prettyPrintStat(countryInfo.todayRecovered)} />

          <InfoBox title="Deaths" total={prettyPrintStat(countryInfo.deaths)} cases={prettyPrintStat(countryInfo.todayDeaths)} />
        </div>

        <Map center={mapCenter} zoom={mapZoom} countries={mapCountries}/>
      </div>

      <Card className="app__right">
        <CardContent >
          <h3>Live cases by country</h3>
          <Tables countries={tableData} />

          <h3>Worldwide new cases</h3>
          <LineGraph casesType="cases" />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
