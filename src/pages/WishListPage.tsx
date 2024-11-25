import InfiniteScroll from "react-infinite-scroll-component";
import Grid from "@mui/material/Grid2";
import MoviePosterInf from "../components/MoviePosterInf";
import ScrollTop from "../components/ScrollTop";
import { Container, Fab } from "@mui/material";
import { KeyboardArrowUp as KeyboardArrowUpIcon } from "@mui/icons-material";
import useWishlistStore from "../store/useWishlistStore";
import { AnimatePresence } from "motion/react";


// const scrollStyle={
//   marginT
// }
export default function WishListPage() {
  const wishlist = useWishlistStore((state) => state.wishlist);

  return (
    <>
      <Container maxWidth="xl">
        <InfiniteScroll
          dataLength={wishlist.length}
          next={() => {}}
          hasMore={false}
          loader={<div>loading...</div>}
        >
          <Grid container spacing={2} sx={{ py: 2, px: 2 }}>
            <AnimatePresence>
              {wishlist.map((movie ) => (
                <Grid size={{ xs: 4, sm: 3, md: 1.5 }} key={movie.poster_path}>
                  <MoviePosterInf movie={movie} />
                </Grid>
              ))}
            </AnimatePresence>
          </Grid>
        </InfiniteScroll>
      </Container>
      <ScrollTop>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
}
