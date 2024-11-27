import { useEffect, useRef, useState } from "react";
import { CircularProgress, Container, Fab } from "@mui/material";
import { KeyboardArrowUp as KeyboardArrowUpIcon } from "@mui/icons-material";
import InfiniteScroll from "react-infinite-scroll-component";
import Grid from "@mui/material/Grid2";
import ScrollTop from "../../components/ScrollTop";
import api, { Movie, MovieResponse } from "../../api";
import { useSessionStore } from "../../store/useSessionStore";
import MovieFilter from "./MovieFitler";
import {
  FilterState,
  GenreCode,
  GENRES,
  LanguageCode,
  LANGUAGES,
} from "./filterConstant";
import removeRedundantMovies from "../../utils/removeRedundantMovies";
import MoviePosterInf from "../../components/MoviePosterInf";

const initialFilterState = {
  rating: { gte: 8, lte: 10 },
  genre: GENRES[0],
  language: LANGUAGES[0],
  searchTerm: '',
};

export default function SearchPage() {
  const [filters, setFilters] = useState<FilterState>(initialFilterState);

  const [movies, setMovies] = useState<Movie[]>([]);
  const user = useSessionStore((state) => state.user);
  const page = useRef(1);
  // const [page, setPage] = useState(1);

  // 필터 변경 시 호출되는 함수
  const handleFilterChange = (type: keyof FilterState, value: any) => {
    console.log(type, value);
    setFilters({ ...filters, [type]: value });
  };

  // 필터 초기화 시 호출되는 함수
  const handleResetFilters = () => {
    setFilters(initialFilterState);
  };

  const setAdditionalMovies = async () => {
    const moreMovies = await fetchMoreMovies();
    if (!moreMovies) return;

    const uniqueMoives = removeRedundantMovies(movies, moreMovies.results);
    setMovies([...movies, ...uniqueMoives]);
  };

  const setNewMovies = async () => {
    page.current = 1;
    const newMovies = await fetchMoreMovies();
    if (newMovies) {
      setMovies([...newMovies.results]);
    }
  };

  useEffect(() => {
    setNewMovies();
  }, [filters.rating, filters.genre, filters.language]);

  const fetchMoreMovies = async () => {
    if (user) {
      return api
        .get("discover/movie", {
          searchParams: {
            api_key: user.apiKey,
            page: page.current++,
            with_genres: GenreCode[filters.genre] ?? "",
            with_original_language: LanguageCode[filters.language],
            include_adult: false,
            "vote_average.gte": filters.rating.gte,
            "vote_average.lte": filters.rating.lte,
          },
        })
        .json<MovieResponse>();
    }
  };

  return (
    <Container maxWidth={false} disableGutters>
      <Container maxWidth="lg" sx={{ my: 3 }}>
        <MovieFilter
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleResetFilters={handleResetFilters}
        />
      </Container>
      <Container maxWidth="lg" disableGutters>
        <MovieInfiniteScroll next={setAdditionalMovies} movies={movies} />
      </Container>
    </Container>
  );
}

function MovieInfiniteScroll({
  movies,
  next,
}: {
  movies: Movie[];
  next: () => void;
}) {
  return (
    <>
      <InfiniteScroll
        dataLength={movies.length}
        next={next}
        hasMore={true}
        loader={<CircularProgress />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Grid container spacing={2} sx={{ pt: 2, px: 2 }}>
          {movies.map((movie, index) => (
            <Grid size={{ xs: 4, sm: 3, md: 2 }} key={index}>
              <MoviePosterInf movie={movie} animate={true} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
      <ScrollTop>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
}
