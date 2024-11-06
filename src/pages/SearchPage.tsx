import React, { useEffect, useState } from "react";
import {
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
  Container,
  Typography,
  Fab,
  useMediaQuery,
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
import { useTheme } from "@emotion/react";

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

  const [movies, setMovies] = useState<Movie[]>([
    // // 예시 영화 데이터
    // {
    //   id: 1,
    //   title: "Movie A",
    //   rating: 9,
    //   genre: "Action",
    //   language: "English",
    // },
    // {
    //   id: 2,
    //   title: "Movie B",
    //   rating: 8,
    //   genre: "Adventure",
    //   language: "Korean",
    // },
  ]);

  // 필터 변경 시 호출되는 함수
  const handleFilterChange = (e: SelectChangeEvent) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // 필터 초기화 시 호출되는 함수
  const handleResetFilters = () => {
    setFilters(initialFilterState);
  };

  useEffect(() => {
    // 여기서 필터에 따라 영화 목록을 필터링하는 로직 추가
    // const filteredMovies = movies.filter((movie) => {
    //   const matchesRating =
    //     newFilters.rating === "Rating (All)" ||
    //     (newFilters.rating === "9-10" && movie.rating >= 9) ||
    //     (newFilters.rating === "8-9" &&
    //       movie.rating >= 8 &&
    //       movie.rating < 9) ||
    //     // 추가 평점 필터...
    //     (newFilters.rating === "Below 4" && movie.rating < 4);
    //   const matchesGenre =
    //     newFilters.genre === "Genre (All)" || movie.genre === newFilters.genre;
    //   const matchesLanguage =
    //     newFilters.language === "Language (All)" ||
    //     movie.language === newFilters.language;
    //   return matchesRating && matchesGenre && matchesLanguage;
    // });
  }, [filters]);

  useEffect(() => {
    if (movies.length === 0) {
      (async () => {
        const data = await fetchData();
        setMovies([...movies, ...data]);
      })();
    }
  }, [movies]);

  const fetchMoreData = async () => {
    const moreMovies = await fetchData();
    setMovies([...movies, ...moreMovies]);
  };

  return (
    <Container maxWidth={false}>
      <Box display="flex" flexDirection="row-reverse">
        <MovieFilter
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleResetFilters={handleResetFilters}
        />
      </Box>
      <Container maxWidth="lg">
        <MovieInfiniteScroll fetchMoreData={fetchMoreData} movies={movies} />
      </Container>
    </Container>
  );
}

interface Movie {
  title: string;
  src: string;
}
function fetchData() {
  return new Promise((res) => {
    setTimeout(() => {
      res(
        Array.from({ length: 20 }, () => ({ title: "안녕", src: "/inf1.jpg" }))
      );
    }, 1500);
  }) satisfies Promise<Movie[]>;
}

function MovieInfiniteScroll({
  fetchMoreData,
  movies,
}: {
  fetchMoreData: () => void;
  movies: Movie[];
}) {
  return (
    <>
      <InfiniteScroll
        dataLength={movies.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<div>loading...</div>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Grid container spacing={2}>
          {movies.map((movie, index) => (
            <Grid size={{ xs: 4, sm: 3, md: 2 }} key={index}>
              <Box
                component="img"
                src={movie.src}
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
              <Typography variant="subtitle1" align="center" sx={{ mt: 1 }}>
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
        width:{xs:'100%', sm:'inherit'}
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
          {GENRES.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
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
