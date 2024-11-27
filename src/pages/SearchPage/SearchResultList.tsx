// components/SearchResultList.tsx
import React from 'react';
import { 
  List, 
  ListItem, 
  ListItemText, 
  Typography, 
  Box, 
  Divider,
  alpha 
} from '@mui/material';
import { Movie } from '../../api';

interface SearchResultListProps {
  results: Movie[];
}

const SearchResultList = ({ results }: SearchResultListProps) => (
  <List sx={{ p: 0 }}>
    {results.map((movie, index) => (
      <React.Fragment key={movie.id}>
        <ListItem 
          sx={{ 
            py: 2,
            px: 2,
            '&:hover': {
              bgcolor: alpha('#fff', 0.05),
            },
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          <Box 
            component="img"
            src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
            alt={movie.title}
            sx={{ 
              width: 45,
              height: 68,
              borderRadius: '4px',
              mr: 2 
            }}
          />
          <ListItemText
            primary={
              <Typography sx={{ color: '#fff' }}>
                {movie.title}
              </Typography>
            }
            secondary={
              <Typography variant="body2" sx={{ color: 'grey.500' }}>
                {new Date(movie.release_date).getFullYear()}
              </Typography>
            }
          />
        </ListItem>
        {index < results.length - 1 && (
          <Divider sx={{ borderColor: alpha('#fff', 0.1) }} />
        )}
      </React.Fragment>
    ))}
  </List>
);

export default SearchResultList;