import useWishlistStore from "../store/useWishlistStore";
import { Movie, TMDB_IMAGE } from "../api";
import { alpha, Box, IconButton, Typography } from "@mui/material";
import { motion } from "motion/react";
import { fadeInCommonOptions } from "../animation/pageTransition";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

const motionDivStyle = { height: "100%" };
export default function MoviePoster({
  movie,
  width,
  height,
}: {
  movie: Movie;
  width?: number;
  height?: number;
}) {
  const { toggleWishlist, includeWishlist } = useWishlistStore();

  const isWishlisted = includeWishlist(movie);

  return (
    <motion.div style={motionDivStyle} {...fadeInCommonOptions}>
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
          sx={[
            {
              width: "100%",
              height: "auto",
              objectFit: "cover",
              borderRadius: 1,
            },
            { width, height },
          ]}
        />

        <Typography
          variant="subtitle1"
          align="center"
          textOverflow="ellipsis"
          overflow="hidden"
          whiteSpace="nowrap"
          width={width}
        >
          {movie.title}
        </Typography>

        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation(); // 부모의 onClick 이벤트 전파 방지
            toggleWishlist(movie);
          }}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "white",
            bgcolor: (theme) => alpha(theme.palette.common.black, 0.6),
            backdropFilter: "blur(4px)",
            border: (theme) =>
              `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
            p: 0.75,
            "&:hover": {
              bgcolor: (theme) => alpha(theme.palette.common.black, 0.8),
            },
            "& .MuiSvgIcon-root": {
              fontSize: "1.25rem",
              transition: "all 0.2s ease",
            },
            transition: "all 0.15s ease",
          }}
        >
          {isWishlisted ? (
            <Favorite
              sx={{
                color: (theme) => theme.palette.error.main,
                filter: "drop-shadow(0 0 2px rgba(0, 0, 0, 0.5))",
              }}
            />
          ) : (
            <FavoriteBorder
              sx={{
                color: (theme) => alpha(theme.palette.common.white, 0.9),
              }}
            />
          )}
        </IconButton>
      </Box>
    </motion.div>
  );
}
