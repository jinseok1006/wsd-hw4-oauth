import { Movie } from "../api";

export default function removeRedundantMovies(movies: Movie[], cache: Movie[]) {
  const movieIds = new Set<number>();
  if (movies.length > 0) {
    movies.slice(-20).forEach((movie) => {
      movieIds.add(movie.id);
    });
  }

  return cache.filter((movie) => {
    if (movieIds.has(movie.id)) {
      console.log("중복!");
      return false;
    }
    movieIds.add(movie.id);
    return true;
  });
}
