// Opdracht 1:
// import './App.css';
// import axios from 'axios';
// import worldMap from './assets/world_map.png'
// import {useState} from "react";
// import {decideColor} from "./helpers/decideColor.js";
//
// function App() {
//     const [country, setCountry] = useState([]);
//     const [dataFetched, setDataFetched] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//
//     const handleFetchData = async () => {
//         try {
//             setLoading(true);
//             const response = await axios.get("https://restcountries.com/v3.1/all");
//             setCountry(response.data);
//         } catch (err) {
//             setError(err);
//             console.error(err);
//         } finally {
//             setLoading(false);
//             setDataFetched(true);
//         }
//     }
//
//     return (
//         <>
//             <header>
//                 <img className="header-image" src={worldMap} alt="World Map"/>
//                 <h1>World regions</h1>
//             </header>
//             <main>
//                 <section className="container">
//                     {!dataFetched &&
//                         <button className="data-button" type="button" onClick={handleFetchData}>
//                             Get information
//                         </button>
//                     }
//                     {loading && <span className="loader"/>}
//                     {error && <div className="error-message">Error: {error}</div>}
//                     <ul className="countries-grid">
//                             {
//                                 country
//                                     .sort((a, b) => a.population - b.population)
//                                     .map((country) => (
//                                         <li key={country.cca3} className="country-card">
//                                             <div className="card-title-flag">
//                                                 <img className="country-flag" src={country.flags.png}
//                                                      alt={`Flag of ${country.name.common}`}/>
//                                                 <h4 className={decideColor(country)}>
//                                                     {country.name.common}
//                                                 </h4>
//                                             </div>
//                                             <p>Has a population of {country.population} people</p>
//                                         </li>
//                                     ))
//                             }
//                     </ul>
//                 </section>
//             </main>
//         </>
//     )
// }
//
// export default App
// Opdracht 2
import './App.css'
import axios from 'axios'
import {useState} from "react";
import {generateNumberToMillion} from "./helpers/numberToMillion.js";

function App() {
    const [country, setCountry] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [searchValue, setSearchValue] = useState('')

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get("https://restcountries.com/v3.1/all");
            const filteredCountries = response.data.filter(country =>
                country.name.common.toLowerCase().includes(searchValue.toLowerCase())
            );
            setCountry(filteredCountries);
        } catch (err) {
            setError(err);
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <main>
                <h1>Search country information</h1>
                <form className="search-bar" onSubmit={handleSearch}>
                    <input
                        type="search"
                        name="search"
                        placeholder="Bijvoorbeeld Nederland of Peru"
                        value={searchValue}
                        onChange={handleChange}
                    />
                    <button type="submit">Search</button>
                </form>
                <div className="country-container">
                    {loading && <span className="loader"/>}
                    {error && <div className="error-message">Error: {error}</div>}
                    {
                        country.map(country => (
                            <div key={country.cca3} className="country-card">
                                <div className={"card-title-flag"}>
                                    <img className="country-flag" src={country.flags.png}
                                         alt={`Flag of ${country.name.common}`}/>
                                    <h2>{country.name.common}</h2>
                                </div>
                                <div className="country-description">
                                    <p>{country.name.common} is situated in {country.subregion || country.region} and
                                        the
                                        capital is {country.capital}</p>
                                    <p>It has a population of {generateNumberToMillion(country.population)} million
                                        people
                                        and it borders with {country.borders ? country.borders.length : 0} neighboring
                                        countries</p>
                                    <p>Websites can be found on {country.tld} domain's</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </main>
        </>
    )
}

export default App;