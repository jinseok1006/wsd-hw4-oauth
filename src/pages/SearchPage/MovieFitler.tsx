import {
    Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import {
  FilterList as FilterListIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";

interface MovieFilterProps {
  filters: FilterState;
  handleFilterChange: (e: SelectChangeEvent) => void;
  handleResetFilters: () => void;
}

interface FilterState {
  rating: (typeof RATINGS)[number];
  genre: (typeof GENRES)[number];
  language: (typeof LANGUAGES)[number];
}

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

export const LanguageCode = {
  "언어 (전체)": "en",
  영어: "en",
  한국어: "ko",
} as const;

export const GenreCode = {
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

export const voteCode = {
  "평점 (전체)": null,
  "9-10": [9, 10],
  "8-9": [8, 9],
  "7-8": [7, 8],
  "6-7": [6, 7],
  "5-6": [5, 6],
  "4-5": [4, 5],
  "4점 이하": [0, 4],
};

export const initialFilterState: FilterState = {
  rating: RATINGS[0],
  genre: GENRES[0],
  language: LANGUAGES[0],
};

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

export default MovieFilter;