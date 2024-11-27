import React from "react";
import {
  Box,
  Chip,
  Typography,
  Paper,
  Slider,
  Popover,
  Button,
  Stack,
  useTheme,
  alpha,
  TextField,
} from "@mui/material";
import {
  Stars as StarsIcon,
  LocalMovies as GenreIcon,
  Language as LanguageIcon,
  Close as CloseIcon,
  Add as AddIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { GENRES, LANGUAGES, RatingRange } from "./filterConstant";
import { FilterState } from "./filterConstant";
import useDialog from "./useDialog";
import KeywordDialog from "./KeywordDialog";
import { useAsyncFn } from "react-use";
import { User, useSessionStore } from "../../store/useSessionStore";
import api, { MovieResponse } from "../../api";

interface MovieFilterProps {
  filters: FilterState;
  handleFilterChange: (
    type: "rating" | "genre" | "language",
    value: any
  ) => void;
  handleResetFilters: () => void;
}

const fetchKeywordMovies = (user: User, keyword: string, page: number = 1) =>
  api
    .get("search/movie", {
      searchParams: {
        api_key: user.apiKey,
        query: keyword,
        page,
      },
    })
    .json<MovieResponse>();

const FilterBadge = ({
  label,
  icon,
  isActive,
  onClick,
  color = "primary",
}: {
  label: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
}) => {
  const theme = useTheme();

  return (
    <Chip
      icon={icon as any}
      label={label}
      onClick={onClick}
      color={isActive ? color : "default"}
      variant={isActive ? "filled" : "outlined"}
      sx={{
        borderRadius: "8px",
        "&:hover": {
          backgroundColor: isActive
            ? theme.palette[color].main
            : alpha(theme.palette[color].main, 0.1),
        },
      }}
    />
  );
};

const MovieFilter = ({
  filters,
  handleFilterChange,
  handleResetFilters,
}: MovieFilterProps) => {
  const theme = useTheme();
  const [ratingAnchorEl, setRatingAnchorEl] =
    React.useState<HTMLElement | null>(null);
  const [tempRating, setTempRating] = React.useState<RatingRange>({
    gte: 0,
    lte: 10,
  });

  // 평점 필터 팝오버 핸들링
  const handleRatingClick = (event: React.MouseEvent<HTMLElement>) => {
    setRatingAnchorEl(event.currentTarget);
    if (filters.rating) {
      setTempRating(filters.rating);
    }
  };

  const handleRatingClose = () => {
    setRatingAnchorEl(null);
  };

  const handleRatingApply = () => {
    handleFilterChange("rating", tempRating);
    handleRatingClose();
  };

  const handleRatingClear = () => {
    handleFilterChange("rating", null);
    handleRatingClose();
  };

  const { isOpen, closeDialog, openDialog } = useDialog();

  // 미리 정의된 평점 범위
  const predefinedRatings = [
    { label: "최고 평점 (8+)", range: { gte: 8, lte: 10 } },
    { label: "좋은 평점 (6+)", range: { gte: 6, lte: 10 } },
    { label: "평균 이상 (5+)", range: { gte: 5, lte: 10 } },
  ];


  return (
    <>
      <Paper
        elevation={0}
        sx={{
          p: 2,
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          borderRadius: 2,
        }}
      >
        <Stack spacing={2}>
          {/* 필터 헤더 */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1" fontWeight="medium">
              필터
            </Typography>
            {Object.values(filters).some((value) => value !== null) && (
              <Button
                size="small"
                startIcon={<CloseIcon />}
                onClick={handleResetFilters}
                sx={{ color: theme.palette.text.secondary }}
              >
                초기화
              </Button>
            )}
          </Box>

          {/* 필터 뱃지 그룹 */}
          <Stack spacing={1.5}>
            {/* 검색어 필터 섹션 */}
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}
              >
                <SearchIcon fontSize="small" />
                검색어
              </Typography>
              {/* 키워드 검색 버튼 */}
              <Box>
                <Button
                  variant="outlined"
                  // startIcon={<SearchIcon />}
                  onClick={openDialog}
                  // fullWidth
                  sx={{
                    borderRadius: 2,
                    justifyContent: "flex-start",
                    textTransform: "none",
                    color: theme.palette.text.secondary,
                  }}
                >
                  키워드 검색
                </Button>
              </Box>
            </Box>
            {/* 평점 필터 섹션 */}
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}
              >
                <StarsIcon fontSize="small" />
                평점
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {predefinedRatings.map((item) => (
                  <FilterBadge
                    key={item.label}
                    label={item.label}
                    isActive={filters.rating?.gte === item.range.gte}
                    onClick={() => handleFilterChange("rating", item.range)}
                    color="warning"
                  />
                ))}
                <Chip
                  icon={<AddIcon />}
                  label="직접 설정"
                  onClick={handleRatingClick}
                  variant={
                    filters.rating &&
                    !predefinedRatings.some(
                      (r) => r.range.gte === filters.rating?.gte
                    )
                      ? "filled"
                      : "outlined"
                  }
                  color="warning"
                  sx={{ borderRadius: "8px" }}
                />
              </Stack>
            </Box>

            {/* 장르 필터 섹션 */}
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}
              >
                <GenreIcon fontSize="small" />
                장르
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {GENRES.map((genre) => (
                  <FilterBadge
                    key={genre}
                    label={genre}
                    isActive={filters.genre === genre}
                    onClick={() =>
                      handleFilterChange(
                        "genre",
                        filters.genre === genre ? GENRES[0] : genre
                      )
                    }
                    color="primary"
                  />
                ))}
              </Stack>
            </Box>

            {/* 언어 필터 섹션 */}
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}
              >
                <LanguageIcon fontSize="small" />
                언어
              </Typography>
              <Stack direction="row" spacing={1}>
                {LANGUAGES.map((language) => (
                  <FilterBadge
                    key={language}
                    label={language}
                    isActive={filters.language === language}
                    onClick={() =>
                      handleFilterChange(
                        "language",
                        filters.language === language ? LANGUAGES[0] : language
                      )
                    }
                    color="info"
                  />
                ))}
              </Stack>
            </Box>
          </Stack>

          {/* 평점 범위 설정 팝오버 */}
          <Popover
            open={Boolean(ratingAnchorEl)}
            anchorEl={ratingAnchorEl}
            onClose={handleRatingClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            slotProps={{
              paper: {
                sx: {
                  width: 300,
                  p: 3,
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                },
              },
            }}
            PaperProps={{}}
          >
            <Stack spacing={2}>
              <Typography variant="subtitle2" fontWeight="medium">
                평점 범위 설정
              </Typography>
              <Box>
                <Slider
                  value={[tempRating.gte, tempRating.lte]}
                  onChange={(_, newValue) => {
                    const [gte, lte] = newValue as number[];
                    setTempRating({ gte, lte });
                  }}
                  min={0}
                  max={10}
                  step={0.5}
                  marks
                  valueLabelDisplay="auto"
                  color="warning"
                />
                <Typography
                  variant="caption"
                  color="text.secondary"
                  align="center"
                >
                  {tempRating.gte}점 ~ {tempRating.lte}점
                </Typography>
              </Box>
              <Stack direction="row" spacing={1}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="small"
                  onClick={handleRatingClear}
                >
                  초기화
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  size="small"
                  onClick={handleRatingApply}
                  color="warning"
                >
                  적용하기
                </Button>
              </Stack>
            </Stack>
          </Popover>
        </Stack>
      </Paper>
      <KeywordDialog isOpen={isOpen} onClose={closeDialog} />
    </>
  );
};

export default MovieFilter;
