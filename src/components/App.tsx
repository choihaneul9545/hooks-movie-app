import React, { useEffect, useState } from "react";
import Header from "./Header";
import Movie from "./Movie";
import spinner from "../assets/ajax-loader.gif";
import Search from "./Search";
import axios from "axios";

interface MovieData {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";

const App = () => {
  const [movieData, setMovieData] = useState<MovieData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    axios.get(MOVIE_API_URL).then((jsonResponse) => {
      setMovieData(jsonResponse.data.Search);
      // setLoading(false);
    });
  }, []);

  const refreshPage = () => {
    window.location.reload();
  };

  const search = (searchValue: string) => {
    axios(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`).then(
      (jsonResponse) => {
        if (jsonResponse.data.Response === "True") {
          setMovieData(jsonResponse.data.Search);
          // setLoading(false);
        } else {
          setLoading(false);
          setErrorMessage(jsonResponse.data.Error);
        }
      }
    );
  };

  const retrievedMovies =
    loading && !errorMessage ? (
      <img className="spinner" src={spinner} alt="Loading spinner" />
    ) : errorMessage ? (
      <div className="errorMessage">{errorMessage}</div>
    ) : (
      movieData.map((movie: any, index: number) => (
        <Movie key={`${index}-${movie.Title}`} movie={movie} />
      ))
    );

  return (
    <div className="App">
      <div className="m-container">
        <Header text="HOOKED" refreshPage={refreshPage} />

        <Search search={search} />

        <p className="App-intro">Sharing a few of our favourite movies</p>

        <div className="movies">{retrievedMovies}</div>
      </div>
    </div>
  );
};

export default App;
