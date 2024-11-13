import useWishlistStore from "../store/useWishlistStore";
import { Movie, TMDB_IMAGE } from "../api";
import { Box, Typography } from "@mui/material";

export default function MoviePosterInf({ movie }: { movie: Movie }) {
  const { toggleWishlist, includeWishlist } = useWishlistStore();

  const isWishlisted = includeWishlist(movie);

  return (
    <Box
      onClick={() => toggleWishlist(movie)}
      sx={{
        height: "100%",
        position: "relative",
        transition: "transform 0.5s ease",
        ":hover": {
          transform: `scale(1.05)`,
        },
      }}
    >
      <Box
        component="img"
        src={`${TMDB_IMAGE}/w300/${movie.poster_path}`}
        alt={movie.title}
        sx={{
          width: "100%",
          height: "auto",
          objectFit: "cover",
          borderRadius: 1,
        }}
      />
      <Typography
        variant="subtitle1"
        align="center"
        textOverflow="ellipsis"
        overflow="hidden"
        whiteSpace="nowrap"
      >
        {movie.title}
      </Typography>
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
            borderRadius: 1,
          }}
        >
          ❤️
        </Box>
      ) : null}
    </Box>
  );
}
