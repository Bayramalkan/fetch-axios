import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import "./App.css"
//fetch ile

// export default function App() {

//   const [countries, setCountries] = useState([])

//   useEffect(()=>{
//     fetch("https://restcountries.com/v3.1/all")
//     .then(response => response.json())
//     .then(response=> setCountries(response))
//
//   },[])

//   return (
//     <div>
//       {countries.map(country => {
//         return<div key={country.name.common}>
//           <h2>{country.name.common}</h2>
//           <h4>{country.capital}</h4>
//           <p><img src={country.flags.png} alt={country.name.common} /></p>
//         </div>})}

//     </div>
//   )
// }

// axios ile

export default function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data))
      .catch((error) => console.log({ error }));
  }, []);

  return (
    <Router>
      <div className="App">
        <Route
          path="/"
          exact
          render={() =>
            countries.map((country) => {
              return (
                <div key={country.name.common} className="country">
                  <Link to={`/country/${country.cca3}`}><h3>{country.name.common}</h3></Link>
                  {/* <h4>{country.capital}</h4>
                  <p>
                    <img src={country.flags.png} alt={country.name.common} />
                  </p> */}
                </div>
              );
            })
          }
        />
        <Route 
        path="/country/:code"
        render={renderProps=>{
          const country = countries.find(
            country => country.cca3
            === renderProps.match.params.code)
          return <Country {...renderProps} country={country}/>
        }}/>
      </div>
    </Router>
  );
}

const Country = props =>{
  const {country} = props;
  return (
  <div>
    <h1>{country.name.common} </h1>
    <p>Capital: {country.capital || "başkent yok"}</p>
    <img src={country.flags.png} alt={country.name.common} />
    </div>
)}
