import React, { useEffect, useMemo, useState } from "react";
import Grid from "@mui/material/Grid2";
import { Box, Button, Pagination, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

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

export default function MovieTable({
  containerHeight,
}: {
  containerHeight: number;
}) {
  // const [itemsPerPage, setItemsPerPage] = useState(12);
  const [page, setPage] = useState(1);
  const onPageChange = (e: React.ChangeEvent<unknown>, newPage: number) =>
    setPage(newPage);

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.up("xs"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));

  // 화면 높이를 기준으로 영화 개수 동적 설정
  const calculateItemsPerPage = () => {
    if (containerHeight > 600) {
      return isMd ? 15 : isSm ? 12 : isXs ? 8 : 4;
    } else {
      return isMd ? 12 : isSm ? 9 : isXs ? 6 : 4;
    }
  };

  const calculateItemsPerPage2 = () => {
    if (containerHeight > 600) {
      
    } else {
      
    }
  };

  const itemsPerPage = calculateItemsPerPage();

  // 컴포넌트가 마운트될 때 스크롤 금지
  // useEffect(() => {
  //   document.body.style.overflow = "hidden";
  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, []);

  const [movies, setMovies] = useState(
    Array.from({ length: 250 }, () => ({
      title: "제목",
      src: "/inf1.jpg",
    }))
  );

  return (
    <>
      <Grid container spacing={2}>
        {movies.slice(0,itemsPerPage).map((src, index) => (
          <Grid size={{ md: 1.5, sm: 2.4, xs: 4 }} key={index}>
            <Box
              component="img"
              src="/inf1.jpg"
              sx={{
                width: "100%", // 가로폭을 100%로 설정
                height: "auto", // 비율에 맞춰 높이 자동 조절
                objectFit: "cover",
                borderRadius: 2,
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
      <Box pt={5} pb={3} display="flex" justifyContent="center" alignItems='center' gap={2}>
        <Pagination
          count={10}
          page={page}
          onChange={onPageChange}
          siblingCount={1}
          boundaryCount={0}
          variant="outlined"
          shape="rounded"

        />
        {/* <Button variant="outlined">
          이전
        </Button>
        <Typography>
          {page} / {10}
        </Typography>
        <Button variant="outlined">
          다음
        </Button> */}
      </Box>
    </>
  );
}
