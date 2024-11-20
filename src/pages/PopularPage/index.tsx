import { useRef, useState } from "react";
import { Box, Container, ButtonGroup, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import MovieInfiniteScroll from "./MovieInfiniteScroll";
import MovieTable from "./MovieTable";
import useMovie from "../../hooks/useMovie";

export default function PopularPage() {
  const [viewMode, setViewMode] = useState("pagination"); // 초기 모드를 무한 스크롤로 설정

  const handleViewChange = (mode: string) => {
    setViewMode(mode);
  };
  const containerRef = useRef<HTMLDivElement>(null);

  const [movies, setAdditionalMovies] = useMovie();

  return (
    <Container maxWidth="xl" ref={containerRef}>
      {/* view mode 버튼그룹 */}
      <Box display="flex" justifyContent="flex-end" sx={{ my: 2 }}>
        <ButtonGroup variant="contained" aria-label="view mode buttons">
          <Button
            onClick={() => handleViewChange("pagination")}
            color={viewMode === "pagination" ? "secondary" : "inherit"}
          >
            <BackupTableIcon />
          </Button>
          <Button
            onClick={() => handleViewChange("infinite")}
            color={viewMode === "infinite" ? "secondary" : "inherit"}
          >
            <MenuIcon />
          </Button>
        </ButtonGroup>
      </Box>
      {/* 테이블뷰 or 무한스크롤뷰 */}
      {viewMode === "pagination" ? (
        <MovieTable movies={movies} />
      ) : (
        <MovieInfiniteScroll
          movies={movies}
          setAdditionalMovies={setAdditionalMovies}
        />
      )}
    </Container>
  );
}
