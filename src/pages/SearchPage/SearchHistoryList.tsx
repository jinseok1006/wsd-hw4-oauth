// components/SearchHistoryList.tsx
import React from 'react';
import { 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  IconButton, 
  Typography,
  Box,
  alpha 
} from '@mui/material';
import { History as HistoryIcon, Clear as ClearIcon } from '@mui/icons-material';

interface SearchHistoryListProps {
  history: string[];
  onSelectHistory: (keyword: string) => void;
  onClearHistory: () => void;
}

const SearchHistoryList = ({ 
  history, 
  onSelectHistory, 
  onClearHistory 
}: SearchHistoryListProps) => (
  <Box>
    <Box 
      display="flex" 
      justifyContent="space-between" 
      alignItems="center" 
      px={2} 
      mb={1}
    >
      <Typography variant="subtitle2" sx={{ color: 'grey.500' }}>
        최근 검색어
      </Typography>
      {history.length > 0 && (
        <IconButton 
          onClick={onClearHistory}
          size="small"
          sx={{ color: 'grey.500' }}
        >
          <ClearIcon fontSize="small" />
        </IconButton>
      )}
    </Box>
    <List sx={{ p: 0 }}>
      {history.map((item, index) => (
        <ListItem
          key={index}
          onClick={() => onSelectHistory(item)}
          sx={{ 
            py: 1.5,
            px: 2,
            '&:hover': {
              bgcolor: alpha('#fff', 0.05),
            },
            cursor: 'pointer'
          }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>
            <HistoryIcon sx={{ color: 'grey.500' }} fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography sx={{ color: '#fff' }}>
                {item}
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  </Box>
);

export default SearchHistoryList;