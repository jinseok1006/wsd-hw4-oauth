import ky from "ky";
// import { useSessionStorage } from "react-use";

const TMDB = "https://api.themoviedb.org/3/";
export const TMDB_IMAGE = "https://image.tmdb.org/t/p";
const TMDB_KEY=import.meta.env.VITE_TMDB_KEY;

export default ky.create({
  prefixUrl: TMDB,
  searchParams: {
    language: "ko-KR",
    api_key: TMDB_KEY
  },
});



export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
}
