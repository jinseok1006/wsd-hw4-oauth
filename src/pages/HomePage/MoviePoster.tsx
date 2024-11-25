import useWishlistStore from "../../store/useWishlistStore";
import { Movie, TMDB_IMAGE } from "../../api";
import { Box } from "@mui/material";

export default function MoviePoster({ movie }: { movie: Movie }) {
  const { toggleWishlist, includeWishlist } = useWishlistStore();

  const isWishlisted = includeWishlist(movie);

  if(!movie.poster_path) {
    return null;
  }

  return (
    <Box
      onClick={() => toggleWishlist(movie)}
      sx={{
        height: { md: "250px", xs: "150px", sm: "200px" },
        position: "relative",
      }}
    >
      <Box
        component="img"
        src={`${TMDB_IMAGE}/w300/${movie.poster_path}`}
        alt={movie.title}
        sx={{
          height: "100%",
        }}
      />
      {isWishlisted ? (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            color: "white",
            background: "black",
            padding: 1,
            opacity: 0.7,
          }}
        >
          ❤️
        </Box>
      ) : null}
    </Box>
  );
}
