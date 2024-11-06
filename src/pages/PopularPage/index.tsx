import React, { useRef, useState } from "react";
import { Box, Container, ButtonGroup, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import MovieInfiniteScroll from "./MovieInfiniteScroll";
import MovieTable from "./MovieTable";

export default function PopularPage() {
  const [viewMode, setViewMode] = useState("pagination"); // 초기 모드를 무한 스크롤로 설정

  const handleViewChange = (mode: string) => {
    setViewMode(mode);
  };
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Container maxWidth="xl" sx={{ height: "90svh" }} ref={containerRef}>
      {/* 버튼 그룹을 오른쪽으로 정렬 */}
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

      {viewMode === "pagination" ? <MovieTable /> : <MovieInfiniteScroll />}
    </Container>
  );
}
