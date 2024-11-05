import React, { useEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid2";
import { Box, Container, ButtonGroup, Button, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import BackupTableIcon from "@mui/icons-material/BackupTable";

const images = [
  "image1.jpg",
  "image2.jpg",
  "image3.jpg",
  "image4.jpg",
  "image5.jpg",
  "image6.jpg",
  "image7.jpg",
  "image8.jpg",
  "image9.jpg",
  "image10.jpg",
  "image11.jpg",
  "image12.jpg",
  "image13.jpg",
  "image14.jpg",
  "image15.jpg",
  "image16.jpg",
];


export default function PopularPage() {
  const [viewMode, setViewMode] = useState("infinite"); // 초기 모드를 무한 스크롤로 설정

  const handleViewChange = (mode: string) => {
    setViewMode(mode);
  };
  const containerRef=useRef<HTMLDivElement>(null);
  useEffect(()=> {
    
  }, []);


  return (
    <Container maxWidth="xl" sx={{ height: "90svh" }} ref={containerRef}>
      {/* 버튼 그룹을 오른쪽으로 정렬 */}
      <Box display="flex" justifyContent="flex-end" sx={{ my: 2 }}>
        <ButtonGroup variant="contained" aria-label="view mode buttons">
          <Button
            onClick={() => handleViewChange("infinite")}
            sx={{ color: `${viewMode === "infinite" ? "primary" : "default"}` }}
          >
            <MenuIcon />
          </Button>
          <Button
            onClick={() => handleViewChange("pagination")}
            sx={{
              color: `${viewMode === "pagination" ? "primary" : "default"}`,
            }}
          >
            <BackupTableIcon />
          </Button>
        </ButtonGroup>
      </Box>

      <GridMovies />
    </Container>
  );
}

function InfiniteScroll() {
  return <div></div>;
}

function GridMovies({}, ) {
  useEffect(() => {
    // 컴포넌트가 마운트될 때 스크롤 금지
    document.body.style.overflow = "hidden";

    


    // 컴포넌트가 언마운트될 때 원래 상태로 복구
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트/언마운트 될 때만 실행

  return (
    <Grid container spacing={2}>
      {images.map((src, index) => (
        <Grid size={{ md: 3, sm: 4, xs: 6 }} key={index}>
          <Box
            component="img"
            src="/popular.svg"
            alt={`Image ${index + 1}`}
            sx={{
              width: "100%", // 가로폭을 100%로 설정
              height: "auto", // 비율에 맞춰 높이 자동 조절
              objectFit: "cover",
              borderRadius: 1,
              transition: "transform 0.5s ease",
              ":hover": {
                transform: `scale(1.05)`,
              },
            }}
          />
          <Typography variant="subtitle1" align="center">
            제목제목
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
}
