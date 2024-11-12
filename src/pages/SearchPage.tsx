import  { useEffect, useRef, useState } from "react";
import {
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
  Container,
  Typography,
  Fab,
} from "@mui/material";
import {
  FilterList as FilterListIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InfiniteScroll from "react-infinite-scroll-component";
import Grid from "@mui/material/Grid2";
import ScrollTop from "../components/ScrollTop";
import api, { Movie, MovieResponse, TMDB_IMAGE } from "../api";
import { useSessionStore } from "../store/useSessionStore";
import { useShallow } from "zustand/react/shallow";

const LANGUAGES = ["언어 (전체)", "영어", "한국어"] as const;
const RATINGS = [
  "평점 (전체)",
  "9-10",
  "8-9",
  "7-8",
  "6-7",
  "5-6",
  "4-5",
  "4점 이하",
] as const;
const GENRES = [
  "장르 (전체)",
  "액션",
  "모험",
  "코미디",
  "드라마",
  "판타지",
  "호러",
  "로맨스",
  "공상 과학",
  "스릴러",
] as const;

const LanguageCode = {
  "언어 (전체)": "en",
  영어: "en",
  한국어: "ko",
} as const;

const GenreCode = {
  "장르 (전체)": null, // 전체일 경우 null
  액션: 28,
  모험: 12,
  코미디: 35,
  드라마: 18,
  판타지: 14,
  호러: 27,
  로맨스: 10749,
  "공상 과학": 878,
  스릴러: 53,
};

const voteCode = {
  "평점 (전체)": null,
  "9-10": [9, 10],
  "8-9": [8, 9],
  "7-8": [7, 8],
  "6-7": [6, 7],
  "5-6": [5, 6],
  "4-5": [4, 5],
  "4점 이하": [0, 4],
};

interface FilterState {
  rating: (typeof RATINGS)[number];
  genre: (typeof GENRES)[number];
  language: (typeof LANGUAGES)[number];
}

const initialFilterState: FilterState = {
  rating: RATINGS[0],
  genre: GENRES[0],
  language: LANGUAGES[0],
};

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
    if (moreMovies) {
      setMovies([...movies, ...moreMovies.results]);
    }
  };

  const setNewMovies = async () => {
    const newMovies = await fetchMoreMovies();
    if (newMovies) {
      setMovies([...newMovies.results]);
    }
  };

  useEffect(() => {
    page.current = 1;
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

  // useEffect(() => {
  //   initMovies();
  //   setAdditionalMovies();
  // }, [filters.rating, filters.genre, filters.language]);

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
        loader={<div>loading...</div>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Grid container spacing={2} sx={{pt:2, px:2}}>
          {movies.map((movie, index) => (
            <Grid size={{ xs: 4, sm: 3, md: 2 }} key={index}>
              <Box
                component="img"
                src={`${TMDB_IMAGE}/w300/${movie.poster_path}`}
                alt={movie.title}
                sx={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                  borderRadius: 1,
                  transition: "transform 0.5s ease",
                  ":hover": {
                    transform: `scale(1.05)`,
                  },
                }}
              />
              <Typography
                variant="subtitle1"
                align="center"
                textOverflow="ellipsis"
                overflow="hidden"
                whiteSpace="nowrap"
              >
                {movie.title}
              </Typography>
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

interface MovieFilterProps {
  filters: FilterState;
  handleFilterChange: (e: SelectChangeEvent) => void;
  handleResetFilters: () => void;
}

const MovieFilter = ({
  filters,
  handleFilterChange,
  handleResetFilters,
}: MovieFilterProps) => {
  const { rating, genre, language } = filters;
  return (
    <Box
      display="flex"
      gap={2}
      p={2}
      flexWrap="wrap"
      sx={{
        flexDirection: {
          xs: "column",
          sm: "row",
        },
        alignItems: { sm: "center", xs: "stretch" },
        width: { xs: "100%", sm: "inherit" },
      }}
    >
      {/* 평점 필터 */}
      <FormControl>
        <InputLabel>평점</InputLabel>
        <Select
          value={rating}
          label="평점"
          name="rating"
          onChange={handleFilterChange}
          startAdornment={<FilterListIcon />}
          fullWidth={true}
        >
          {RATINGS.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* 장르 필터 */}
      <FormControl>
        <InputLabel>장르</InputLabel>
        <Select
          label="장르"
          value={genre}
          name="genre"
          onChange={handleFilterChange}
          startAdornment={<FilterListIcon />}
        >
          {GENRES.map((genre) => (
            <MenuItem key={genre} value={genre}>
              {genre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* 언어 필터 */}
      <FormControl>
        <InputLabel>언어</InputLabel>
        <Select
          label="언어"
          value={language}
          name="language"
          onChange={handleFilterChange}
          startAdornment={<FilterListIcon />}
        >
          {LANGUAGES.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* 초기화 버튼 */}
      <Button
        variant="contained"
        // color="secondary"
        onClick={handleResetFilters}
        startIcon={<RefreshIcon />}
      >
        초기화
      </Button>
    </Box>
  );
};
