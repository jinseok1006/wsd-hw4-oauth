import { useEffect, useRef, useState } from "react";
import { Box, CircularProgress, Container, Fab } from "@mui/material";
import { KeyboardArrowUp as KeyboardArrowUpIcon } from "@mui/icons-material";
import { SelectChangeEvent } from "@mui/material/Select";
import InfiniteScroll from "react-infinite-scroll-component";
import Grid from "@mui/material/Grid2";
import ScrollTop from "../../components/ScrollTop";
import api, { Movie, MovieResponse } from "../../api";
import { useSessionStore } from "../../store/useSessionStore";
import { useShallow } from "zustand/react/shallow";
import MovieFilter, {
  GenreCode,
  initialFilterState,
  LanguageCode,
  voteCode,
} from "./MovieFitler";
import MoviePosterInf from "../../components/MoviePosterInf";
import removeRedundantMovies from "../../utils/removeRedundantMovies";

export default function SearchPage() {
  const [filters, setFilters] = useState(initialFilterState);

  const [movies, setMovies] = useState<Movie[]>([]);
  const user = useSessionStore(useShallow((state) => state.user));
  const page = useRef(1);
  // const [page, setPage] = useState(1);

  // 필터 변경 시 호출되는 함수
  const handleFilterChange = (e: SelectChangeEvent) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // 필터 초기화 시 호출되는 함수
  const handleResetFilters = () => {
    setFilters(initialFilterState);
  };

  const setAdditionalMovies = async () => {
    const moreMovies = await fetchMoreMovies();
    // if (moreMovies) {
    //   setMovies([...movies, ...moreMovies.results]);
    // }
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
            "vote_average.gte": voteCode[filters.rating]?.[0] ?? "",
            "vote_average.lte": voteCode[filters.rating]?.[1] ?? "",
          },
        })
        .json<MovieResponse>();
    }
  };

  return (
    <Container maxWidth={false} disableGutters>
      <Box display="flex" flexDirection="row-reverse">
        <MovieFilter
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleResetFilters={handleResetFilters}
        />
      </Box>
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
              <MoviePosterInf movie={movie} />
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
