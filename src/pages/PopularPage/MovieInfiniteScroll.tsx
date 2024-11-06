import React, { useEffect ,useState } from "react";
import Grid from "@mui/material/Grid2";
import { Box,  Typography } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";


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

  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      setMovies([
        ...movies,
        ...Array.from({ length: 20 }, () => ({
          title: "안녕",
          src: "/inf1.jpg",
        })),
      ]);
    }, 1500);
  };

  return (
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
  );
}
