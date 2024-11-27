import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Divider,
  alpha,
  IconButton,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Movie } from "../../api";
import useWishlistStore from "../../store/useWishlistStore";

interface SearchResultListProps {
  results: Movie[];
}

const SearchResultList = ({ results }: SearchResultListProps) => {
  const [toggleWishlist, includeWishlist] = useWishlistStore((state) => [
    state.toggleWishlist,
    state.includeWishlist,
  ]);

  return (
    <List sx={{ p: 0 }}>
      {results.map((movie, index) => {
        const isWishlisted = includeWishlist(movie);

        return (
          <React.Fragment key={movie.id}>
            <ListItem
              sx={{
                py: 2,
                px: 2,
                "&:hover": {
                  bgcolor: alpha("#fff", 0.05),
                },
                borderRadius: "6px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              onClick={() => toggleWishlist(movie)} // 클릭하면 위시리스트 상태 변경
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  component="img"
                  src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                  alt={movie.title}
                  sx={{
                    width: 45,
                    height: 68,
                    borderRadius: "4px",
                    mr: 2,
                  }}
                />
                <ListItemText
                  primary={
                    <Typography sx={{ color: "#fff" }}>
                      {movie.title}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" sx={{ color: "grey.500" }}>
                      {new Date(movie.release_date).getFullYear()}
                    </Typography>
                  }
                />
              </Box>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation(); // 부모의 클릭 이벤트 전파 방지
                  toggleWishlist(movie);
                }}
                sx={{
                  color: isWishlisted
                    ? (theme) => theme.palette.error.main
                    : alpha("#fff", 0.8),
                  "&:hover": {
                    color: isWishlisted
                      ? (theme) => theme.palette.error.dark
                      : alpha("#fff", 1),
                  },
                }}
              >
                {isWishlisted ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            </ListItem>
            {index < results.length - 1 && (
              <Divider sx={{ borderColor: alpha("#fff", 0.1) }} />
            )}
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default SearchResultList;
