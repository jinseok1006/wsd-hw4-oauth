import Grid from "@mui/material/Grid2";
import { Box, Typography } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import ScrollTop from "../../components/ScrollTop";
import Fab from "@mui/material/Fab";
import { KeyboardArrowUp as KeyboardArrowUpIcon } from "@mui/icons-material";
import { Movie, TMDB_IMAGE } from "../../api";

export default function MovieInfiniteScroll({
  movies,
  setAdditionalMovies,
}: {
  movies: Movie[];
  setAdditionalMovies: () => void;
}) {
  return (
    <>
      <InfiniteScroll
        dataLength={movies.length}
        next={setAdditionalMovies}
        hasMore={true}
        loader={<div>loading...</div>}
      >
        <Grid container spacing={2}>
          {movies.map((movie, index) => (
            <Grid size={{ md: 1.5, sm: 2.4, xs: 4 }} key={index}>
              <Box
                component="img"
                src={`${TMDB_IMAGE}/w300/${movie.poster_path}`}
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
