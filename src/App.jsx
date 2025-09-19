import { useEffect, useState } from "react";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./appwrite";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json", //what kind of Data should we Accept
    Authorization: `Bearer ${API_KEY}`, //Authentication
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); //to display errors in the browser
  const [movieList, setMovieList] = useState([]); //to display MovieList
  const [isLoading, setIsLoading] = useState(false); // create loading state - when you are trying to fetch Data
  const [debounceSearchTerm, setDebounceSearchTerm] = useState("");
  const [trendingMovies, setTrendingMovies] = useState([]);

  useDebounce(() => setDebounceSearchTerm(searchTerm), 750, [searchTerm]); //Delayed my .75 secs so less API calls

  const fetchMovies = async (query = "") => {
    //whenever openinga async function - opening with a try/catch block is a good practice
    setIsLoading(true); //always do these steps before fetching
    setErrorMessage("");

    try {
      const endpoint = query //Use Debouncing for Searching - so that wee can reduce API calls
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`; //main url to call API

      const response = await fetch(endpoint, API_OPTIONS); //fetch is used to get daa from APIs

      if (!response.ok) {
        //if error is pesent after fertching movies from API - this block is thrown
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json(); // is response.ok - then we are getting Data from the API to Display

      if (data.response === "False") {
        // this Error block is for movies that can cause error after fetching
        setErrorMessage(data.Error || "Failed to fetch Movies");
        setMovieList([]); //if fails or Error occurs - set to empty List
        return; // Exit the Function
      }

      setMovieList(data.results || []);

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error(`Error fetching movies : ${error}`);
      setErrorMessage("Error fetching movies. please try again later");
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();

      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
    }
  }

  useEffect(() => {
    fetchMovies(debounceSearchTerm); //this allows to fetch Data from APIs
  }, [debounceSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <main>
      <div className="pattern"/>

      <div className="wrapper">
        <header>
         {/* <img src="/Movieflex.png" alt="MovieFlex Logo" className="w-70 h-35 ml-0"/>          */}
         <p className="font-bold text-4xl text-red-600 mr-0">MovieFlex</p>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <img src="./hero.png" alt="Hero Banner" />

          <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>

        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>

            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                  
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-movies">
          <h2>All Movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App;
