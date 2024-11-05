import React, { useState } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Box,
} from "@mui/material";
import {
  FilterList as FilterListIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";

export default function SearchPage() {
  const [filters, setFilters] = useState({
    rating: "Rating (All)",
    genre: "Genre (All)",
    language: "Language (All)",
  });

  const [movies, setMovies] = useState([
    // 예시 영화 데이터
    {
      id: 1,
      title: "Movie A",
      rating: 9,
      genre: "Action",
      language: "English",
    },
    {
      id: 2,
      title: "Movie B",
      rating: 8,
      genre: "Adventure",
      language: "Korean",
    },
    // 추가 영화...
  ]);

   // 필터 변경 시 호출되는 함수
   const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // 여기서 필터에 따라 영화 목록을 필터링하는 로직 추가
    const filteredMovies = movies.filter(movie => {
      const matchesRating = (newFilters.rating === "Rating (All)") || 
                            (newFilters.rating === "9-10" && movie.rating >= 9) ||
                            (newFilters.rating === "8-9" && movie.rating >= 8 && movie.rating < 9) ||
                            // 추가 평점 필터...
                            (newFilters.rating === "Below 4" && movie.rating < 4);
      const matchesGenre = (newFilters.genre === "Genre (All)") || (movie.genre === newFilters.genre);
      const matchesLanguage = (newFilters.language === "Language (All)") || (movie.language === newFilters.language);
      return matchesRating && matchesGenre && matchesLanguage;
    });

    setMovies(filteredMovies);
  };

  // 필터 초기화 시 호출되는 함수
  const handleResetFilters = () => {
    setFilters({
      rating: "Rating (All)",
      genre: "Genre (All)",
      language: "Language (All)"
    });
    // 초기화 시 모든 영화 목록을 다시 설정
    setMovies([
      // 초기 영화 데이터로 리셋
      { id: 1, title: 'Movie A', rating: 9, genre: 'Action', language: 'English' },
      { id: 2, title: 'Movie B', rating: 8, genre: 'Adventure', language: 'Korean' },
      // 추가 영화...
    ]);
  };

  return <MovieFilter onFilterChange={handleFilterChange} onResetFilters={handleResetFilters} />;
}

const MovieFilter = ({ onFilterChange, onResetFilters }) => {
  // 필터의 상태 관리
  const [rating, setRating] = useState("Rating (All)");
  const [genre, setGenre] = useState("Genre (All)");
  const [language, setLanguage] = useState("Language (All)");

  // 필터 변경 시 상태 업데이트 및 콜백 호출
  const handleFilterChange = (filter, value) => {
    switch (filter) {
      case "rating":
        setRating(value);
        break;
      case "genre":
        setGenre(value);
        break;
      case "language":
        setLanguage(value);
        break;
      default:
        break;
    }
    onFilterChange({ rating, genre, language, [filter]: value });
  };

  // 초기화 버튼 클릭 시 모든 필터 초기화
  const resetFilters = () => {
    setRating("Rating (All)");
    setGenre("Genre (All)");
    setLanguage("Language (All)");
    onResetFilters();
  };

  return (
    <Box display="flex" alignItems="center" gap={2} p={2}>
      <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Age</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    // value={age}
    label="Age"
    // onChange={handleChange}
  >
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Select>
</FormControl>
      {/* 평점 필터 */}
      {/* <FormControl> */}
        {/* <InputLabel>Rating</InputLabel> */}
        <Select
          value={rating}
          onChange={(e) => handleFilterChange("rating", e.target.value)}
          startAdornment={<FilterListIcon />}
        >
          {[
            "Rating (All)",
            "9-10",
            "8-9",
            "7-8",
            "6-7",
            "5-6",
            "4-5",
            "Below 4",
          ].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      {/* </FormControl> */}

      {/* 장르 필터 */}
      <FormControl>
        {/* <InputLabel>Genre</InputLabel> */}
        <Select
          value={genre}
          onChange={(e) => handleFilterChange("genre", e.target.value)}
          startAdornment={<FilterListIcon />}
        >
          {[
            "Genre (All)",
            "Action",
            "Adventure",
            "Comedy",
            "Drama",
            "Fantasy",
            "Horror",
            "Romance",
            "Sci-Fi",
            "Thriller",
          ].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* 언어 필터 */}
      <FormControl>
        <InputLabel>Language</InputLabel>
        <Select
          value={language}
          onChange={(e) => handleFilterChange("language", e.target.value)}
          startAdornment={<FilterListIcon />}
        >
          {["Language (All)", "English", "Korean"].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* 초기화 버튼 */}
      <Button
        variant="contained"
        color="secondary"
        onClick={resetFilters}
        startIcon={<RefreshIcon />}
      >
        Reset
      </Button>
    </Box>
  );
};
