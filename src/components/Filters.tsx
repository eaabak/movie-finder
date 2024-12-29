import React from "react";
import {
  TextField,
  Select,
  MenuItem,
  Box,
  InputLabel,
  FormControl,
} from "@mui/material";

interface FiltersProps {
  search: string;
  setSearch: (value: string) => void;
  year: string;
  setYear: (value: string) => void;
  type: string;
  setType: (value: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  search,
  setSearch,
  year,
  setYear,
  type,
  setType,
}) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: 100 },
    (_, index) => `${currentYear - index}`
  );

  return (
    <Box display="flex" gap={3} mb={3} flexWrap="wrap">
      <TextField
        label="Search Movies"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        variant="outlined"
        fullWidth
      />
      <FormControl fullWidth>
        <InputLabel id="year-select-label" className="form-input__label">
          Year
        </InputLabel>
        <Select
          labelId="year-select-label"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <MenuItem value="">All Years</MenuItem>
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth variant="outlined">
        <InputLabel id="type-select-label">Type</InputLabel>
        <Select
          labelId="type-select-label"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <MenuItem value="movie">Movies</MenuItem>
          <MenuItem value="series">TV Series</MenuItem>
          <MenuItem value="episode">Episodes</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default Filters;
