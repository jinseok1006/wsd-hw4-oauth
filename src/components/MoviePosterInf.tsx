import React from "react";
import { Box, Typography, Skeleton, alpha, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { Movie, TMDB_IMAGE } from "../api";
import useWishlistStore from "../store/useWishlistStore";
import { useShallow } from "zustand/react/shallow";
import { fadeInInfiniteScroll } from "../animation/pageTransition";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

const MoviePosterInf = ({
  movie,
  animate,
  width,
  height,
}: {
  movie: Movie;
  animate: boolean;
  width?: number;
  height?: number;
}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [toggleWishlist, includeWishlist] = useWishlistStore(
    useShallow((state) => [
      state.toggleWishlist,
      state.includeWishlist,
      state.wishlist,
    ])
  );

  const isWishlisted = includeWishlist(movie);

  React.useEffect(() => {
    setIsLoading(true);
    const img = new Image();
    img.src = `${TMDB_IMAGE}/w300/${movie.poster_path}`;

    img.onload = () => setIsLoading(false);
  }, [movie.poster_path]);

  return (
    <motion.div
      style={{ height: "100%" }}
      {...(animate ? fadeInInfiniteScroll : {})}
    >
      <Box
        onClick={() => !isLoading && toggleWishlist(movie)}
        sx={{
          height: "100%",
          position: "relative",
          transition: "all 0.3s ease",
          cursor: isLoading ? "default" : "pointer",
          ":hover": {
            transform: isLoading ? "none" : `scale(1.03)`,
          },
        }}
      >
        {/* 포스터 이미지 또는 스켈레톤 */}
        {isLoading ? (
          <Skeleton
            variant="rectangular"
            sx={[
              {
                width: width ?? "100%",
                paddingBottom: width ? undefined : "150%", // 16:9 비율
                height: height ?? 0,
                borderRadius: "0.5rem",
                bgcolor: (theme) => alpha(theme.palette.common.white, 0.05),
              },
              { width, height },
            ]}
          />
        ) : (
          <Box
            sx={[
              {
                width: "100%",
                paddingBottom: width ? undefined : "150%" , // 16:9 비율
                height: 0,
                borderRadius: "0.5rem",
                display: "block",
                boxShadow: (theme) =>
                  `0 0 0 1px ${alpha(theme.palette.common.white, 0.1)}`,
                backgroundImage: `url(${TMDB_IMAGE}/w300/${movie.poster_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                position: "relative", // 자식 요소들을 위한 기준점
              },
              { width, height },
            ]}
          />
        )}

        {isLoading ? (
          <Box
            sx={{
              mt: 1,
              height: "1.25rem", // Typography의 lineHeight와 동일하게 설정
              display: "flex",
              alignItems: "center",
            }}
          >
            <Skeleton
              variant="text"
              width="70%"
              height="1.25rem" // Typography의 fontSize와 동일하게 설정
              sx={{
                mx: "auto",
                bgcolor: (theme) => alpha(theme.palette.common.white, 0.05),
              }}

            />
          </Box>
        ) : (
          <Typography
            variant="subtitle2"
            align="center"
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap"
            sx={{
              mt: 1,
              height: "1.25rem", // 명시적인 높이 지정
              color: (theme) => alpha(theme.palette.common.white, 0.9),
              fontWeight: 400,
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
              letterSpacing: "-0.006em",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            width={width}
          >
            {movie.title}
          </Typography>
        )}
        {/* <Typography
            variant="subtitle2"
            align="center"
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap"
            sx={{
              mt: 1,
              color: (theme) => alpha(theme.palette.common.white, 0.9),
              fontWeight: 400,
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
              letterSpacing: "-0.006em",
            }}
            width={width}
          >
            {movie.title}
          </Typography> */}

        {!isLoading && (
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
                  transition: "all 0.2s ease",
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
        )}
      </Box>
    </motion.div>
  );
};

export default MoviePosterInf;
