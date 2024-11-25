import Grid from "@mui/material/Grid2";
import InfiniteScroll from "react-infinite-scroll-component";
import ScrollTop from "../../components/ScrollTop";
import Fab from "@mui/material/Fab";
import { KeyboardArrowUp as KeyboardArrowUpIcon } from "@mui/icons-material";
import { Movie } from "../../api";
import MoviePosterInf from "../../components/MoviePosterInf";

import { CircularProgress } from "@mui/material";

export default function MovieInfiniteScroll({
  movies,
  setAdditionalMovies,
}: {
  movies: Movie[];
  setAdditionalMovies: (number: number) => void;
}) {
  return (
    <>
      <InfiniteScroll
        dataLength={movies.length}
        next={() => setAdditionalMovies(1)}
        hasMore={true}
        loader={<CircularProgress />}
      >
        <Grid container spacing={2} mt={1}>
          {movies.map((movie, index) => (
            <Grid size={{ md: 1.5, sm: 2.4, xs: 4 }} key={index}>
              <MoviePosterInf movie={movie} />
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
