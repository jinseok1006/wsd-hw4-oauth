// components/KeywordDialog.tsx
import React, { useEffect, useState } from "react";
import {
  Dialog,
  Button,
  TextField,
  Box,
  alpha,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import api, { Movie, MovieResponse } from "../../api";
import { useSearchHistory } from "../../hooks/useSearchHistory";
import {  useSessionStore } from "../../store/useSessionStore";
import { useAsyncFn } from "react-use";
import SearchResults from "./SearchResults";

interface KeywordDialogProps {
  isOpen: boolean;
  onClose: () => void;
  // keywordMovies: Movie[];
  // fetchKeywordMovies: (user: User, keyword: string) => void;
}

const fetchKeywordMovies = ( keyword: string, page: number = 1) =>
  api
    .get("search/movie", {
      searchParams: {
        // api_key: user.apiKey,
        query: keyword,
        page,
      },
    })
    .json<MovieResponse>();

const KeywordDialog: React.FC<KeywordDialogProps> = ({ isOpen, onClose }) => {
  const [keyword, setKeyword] = React.useState("");
  const { history, addToHistory, clearHistory } = useSearchHistory();
  const [shouldSearch, setShouldSearch] = useState(false);

  const user = useSessionStore((state) => state.user);

  const [state, doFetch] = useAsyncFn(async () => {
    if (user) {
      return fetchKeywordMovies( keyword);
    }
  }, [user, keyword]);
  const { loading: isLoading, error, value: SearchResponse } = state;

  const [searchResults, setSearchResults] = useState<Movie[]>([]);

  useEffect(() => {
    if (!isLoading && !error && SearchResponse?.results) {
      setSearchResults(SearchResponse.results);
    }
  }, [isLoading, error, SearchResponse]);

  const handleSearch = () => {
    if (!keyword.trim()) return;
    addToHistory(keyword);
    doFetch();
  };

  useEffect(() => {
    if (shouldSearch && keyword.trim()) {
      doFetch();
      setShouldSearch(false);
    }
  }, [keyword, shouldSearch]);

  const handleHistorySelect = (selectedKeyword: string) => {
    setKeyword(selectedKeyword);
    setShouldSearch(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    if (keyword === "") {
      setSearchResults([]);
    }
  }, [keyword]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setKeyword("");
        setSearchResults([]);
      }, 300);
    }
  }, [isOpen]);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: "#09090B",
          borderRadius: "12px",
          border: "1px solid",
          borderColor: alpha("#fff", 0.1),
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        {/* SearchBar */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            fullWidth
            placeholder="검색어를 입력하세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyPress={handleKeyPress}
            autoFocus
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "grey.600" }} />
                </InputAdornment>
              ),
              sx: {
                color: "#fff",
                bgcolor: alpha("#fff", 0.05),
                borderRadius: "6px",
                "& fieldset": {
                  border: `1px solid ${alpha("#fff", 0.1)}`,
                },
                "&:hover fieldset": {
                  borderColor: alpha("#fff", 0.2),
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#2563eb",
                },
              },
            }}
          />
          <Button
            onClick={handleSearch}
            variant="contained"
            disabled={isLoading}
            size="small"
            sx={{
              bgcolor: "#2563eb",
              textTransform: "none",
              "&:hover": { bgcolor: "#1d4ed8" },
              borderRadius: "6px",
            }}
          >
            검색
          </Button>
        </Box>
        <Box
          sx={{
            maxHeight: "400px",
            overflowY: "auto",
            mt: 2,
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              bgcolor: alpha("#fff", 0.05),
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: alpha("#fff", 0.2),
              borderRadius: "4px",
              "&:hover": {
                bgcolor: alpha("#fff", 0.3),
              },
            },
          }}
        >
          <SearchResults
            isLoading={isLoading}
            error={error}
            searchResults={searchResults}
            keyword={keyword}
            history={history}
            handleHistorySelect={handleHistorySelect}
            clearHistory={clearHistory}
          />
        </Box>
      </Box>
    </Dialog>
  );
};

export default KeywordDialog;
