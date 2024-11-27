import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import SearchResultList from "./SearchResultList";
import SearchHistoryList from "./SearchHistoryList";
import { Movie } from "../../api";

interface SearchResultsProps {
  isLoading: boolean;
  error: any;
  searchResults?: Movie[];
  keyword: string;
  history: string[];
  handleHistorySelect: (selectedKeyword: string) => void;
  clearHistory: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  isLoading,
  error,
  searchResults,
  keyword,
  history,
  handleHistorySelect,
  clearHistory,
}) => {
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" py={4}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box py={4} textAlign="center">
        <Typography color="error">검색 중 오류가 발생했습니다.</Typography>
      </Box>
    );
  }

  if (searchResults && searchResults.length > 0) {
    return <SearchResultList results={searchResults} />;
  }

  if (searchResults && searchResults.length === 0 && keyword.trim() !== "") {
    return (
      <Box py={4} textAlign="center">
        <Typography color="grey.500">검색 결과가 없습니다.</Typography>
      </Box>
    );
  }

  return (
    <SearchHistoryList
      history={history}
      onSelectHistory={handleHistorySelect}
      onClearHistory={clearHistory}
    />
  );
};

export default SearchResults;
