import { useEffect, useState } from 'react'


function App() {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");

  const getCountries = async () => {
    try {
      const data = await fetch("https://restcountries.com/v3.1/all");
      const dataJson = await data.json();
      setCountries(dataJson);
    } catch (err) {
      console.error("Failed to fetch Countries: ", err);
    }
  }

  useEffect(() => {
    getCountries();
  }, [searchCountry])

  const filterCountry = countries.filter((country) => country.name.common.toLowerCase().includes(searchCountry.toLowerCase()));

  return (
    <>
     <div className='app'>
        <input
            className='search' 
            type="text" 
            value={searchCountry}
            onChange={(e) => setSearchCountry(e.target.value)}
        />
        <div className='countries'>
            {filterCountry && filterCountry.map((country) => (
              <div key={country.cca3} className='countryCard'>
                <img className='flag' src={country.flags.png} alt="flags" />
                <h2>{country.name.common}</h2>
              </div>
            ))}
        </div>
     </div>
    </>
  )
}

export default App
