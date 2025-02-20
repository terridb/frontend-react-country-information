import './App.css';
import axios from 'axios';
import worldMap from './assets/world_map.png'
import {useState} from "react";

function App() {
    const [country, setCountry] = useState([]);
    const [dataFetched, setDataFetched] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get("https://restcountries.com/v3.1/all");
            setCountry(response.data);
        } catch (err) {
            setError(err);
            console.error(err);
        } finally {
            setLoading(false);
            setDataFetched(true);
        }
    }

    return (
        <>
            <header>
                <img src={worldMap} alt="World Map"/>
                <h1>World regions</h1>
            </header>
            <main>
                <section className="container">
                    {!dataFetched &&
                        <button className="data-button" type="button" onClick={handleFetchData}>
                            Get information
                        </button>
                    }
                    {loading && <span className="loader"></span>}
                    {error && <div className="error-message">Error: {error}</div>}
                    <div className="countries-grid">
                        {
                            country
                                .sort((a, b) => a.population - b.population)
                                .map((country) => (
                                    <div key={country.cca3} className="country-card">
                                        <div className="card-title-flag">
                                            <img className="country-flag" src={country.flags.png}
                                                 alt={`Flag of ${country.name.common}`}/>
                                            <h4>{country.name.common}</h4>
                                        </div>
                                        <p>Has a population of {country.population} people</p>
                                    </div>
                                ))
                        }
                    </div>
                </section>
            </main>
        </>
    )
}

export default App
