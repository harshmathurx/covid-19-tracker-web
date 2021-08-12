import './App.css';
import { FormControl, MenuItem, Select } from '@material-ui/core';
import { useState } from 'react';
import { useEffect } from 'react';
function App() {

  const [countries,setCountries] = useState(['USA','UK','INDIA','BELGIUM','ANOTHER COUNTRY STFU']);

  useEffect(() => {
    //async => send a req to a server and do something with that info

    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2
        }
        ));
        setCountries(countries);
      })
    }
    getCountriesData();
  },[countries]);


  return (
    <div className="App">
      <div className="app__header">
      <h1>Covid 19 tracker</h1>
        <FormControl className='app__dropdown'>
          <Select variant='outlined' value='abc'>
            {countries.map(country => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* Header */}
      {/* Title + Select image dropdown */}

      {/* Infobox */}
      {/* Infobox */}
      {/* Infobox */}

      {/* Table */}


      {/* Map */}
    </div>
  );
}

export default App;
