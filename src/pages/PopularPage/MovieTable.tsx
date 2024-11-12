import React, { useEffect, useMemo, useRef, useState } from "react";
import Grid from "@mui/material/Grid2";
import { Box, Button, Pagination, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Movie, TMDB_IMAGE } from "../../api";

export default function MovieTable({ movies }: { movies: Movie[] }) {
  const tableViewRef = useRef<HTMLDivElement>(null);
  const [tableViewSize, setTableViewSize] = useState({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    const updateSize = () => {
      if (tableViewRef.current) {
        const width = tableViewRef.current.clientWidth;
        const height = window.innerHeight - 64 - 68 - 96;
        console.log(document.body.clientHeight);
        setTableViewSize({
          width,
          height,
        });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  // const [itemsPerPage, setItemsPerPage] = useState(12);
  const [page, setPage] = useState(1);
  const onPageChange = (e: React.ChangeEvent<unknown>, newPage: number) =>
    setPage(newPage);

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up("sm")); // tablet

  // mobile img 103.66 x 152.42
  // tablet img 161.9 x 238.07
  // pc img 172 x 252.94

  const getImgSize = () => {
    if (isSm) {
      // 태블릿 화면
      return { width: 161.9, height: 238.07 };
    } else {
      // 모바일 화면
      return { width: 103.66, height: 152.42 };
    }
  };
  const imgSize = getImgSize(); // { width: 103.66, height: 152.42 } 등의 값을 반환

  const GAP = 2;

  const getNumImg = () => {
    // 화면 크기별 이미지 크기 설정

    // 한 행(row)에 배치될 이미지 수와 열(column)에 배치될 이미지 수 계산
    const gapSize = GAP * 2;
    const titleHeight = 28;
    const columns = Math.floor(
      tableViewSize.width / (imgSize.width + gapSize + 10)
    );
    console.log(
      "columns",
      columns,
      "tableViewSize.width",
      tableViewSize.width,
      "imgSize.width+gapsize",
      imgSize.width + gapSize
    );
    const rows = Math.floor(
      tableViewSize.height / (imgSize.height + titleHeight + gapSize)
    );

    return { columns, rows };
  };
  //188.42
  // 컴포넌트가 마운트될 때 스크롤 금지
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  const numImg = getNumImg();
  // console.log(numImg);
  const itemsPerPage = numImg.columns * numImg.rows;

  const currentIdx = (page - 1) * itemsPerPage;

  return (
    <>
      <Box
        display="flex"
        flexWrap="wrap"
        gap={GAP}
        justifyContent="center"
        alignContent="center"
        ref={tableViewRef}
        sx={{ height: tableViewSize.height }}
      >
        {movies.slice(currentIdx, currentIdx+itemsPerPage).map((movie, index) => (
          <Box key={index}>
            <Box
              component="img"
              src={`${TMDB_IMAGE}/w300/${movie.poster_path}`}
              sx={{
                width: imgSize.width, // 가로폭을 100%로 설정
                height: imgSize.height, // 비율에 맞춰 높이 자동 조절
                objectFit: "cover",
                borderRadius: 2,
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
              width={imgSize.width}
            >
              {movie.title}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box
        pt={5}
        pb={3}
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        <Pagination
          count={Math.ceil(movies.length / itemsPerPage)}
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
