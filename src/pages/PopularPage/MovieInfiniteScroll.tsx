import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { Box, Typography } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import ScrollTop from "../../components/ScrollTop";
import Fab from "@mui/material/Fab";
import { KeyboardArrowUp as KeyboardArrowUpIcon } from "@mui/icons-material";
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

export default function MovieInfiniteScroll() {
  const [movies, setMovies] = useState<Movie[]>([]);

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
    <>
      <InfiniteScroll
        dataLength={movies.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<div>loading...</div>}
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
