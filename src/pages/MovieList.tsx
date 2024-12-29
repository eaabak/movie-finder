import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import {
  fetchMovieList,
  setSearch,
  setYear,
  setType,
  setPage,
} from "../redux/slices/movieSlice";
import { Box, CircularProgress, Typography } from "@mui/material";
import Filters from "../components/Filters";
import MovieTable from "../components/MovieTable";
import PaginationComponent from "../components/Pagination";
import { useDebounce } from "../hooks/useDebounce";

const MovieList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, totalResults, loading, search, year, type, page } =
    useSelector((state: RootState) => state.movies);
  const debouncedSearch = useDebounce(search.trim(), 500);

  useEffect(() => {
    if (page !== 1) {
      dispatch(setPage(1));
    }
  }, [search, dispatch]);

  useEffect(() => {
    if (debouncedSearch.trim()) {
      dispatch(fetchMovieList());
    }
  }, [dispatch, debouncedSearch, year, type, page]);

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>
        Movie and Series Finder
      </Typography>
      <Filters
        search={search}
        setSearch={(value) => dispatch(setSearch(value))}
        year={year}
        setYear={(value) => dispatch(setYear(value))}
        type={type}
        setType={(value) => dispatch(setType(value))}
      />
      {loading ? (
        <Box textAlign="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : debouncedSearch.trim() === "" ? (
        <Box textAlign="center" mt={5}>
          <Typography variant="h6" color="textSecondary">
            Please enter a name to search movies or series.
          </Typography>
        </Box>
      ) : movies.length === 0 ? (
        <Box textAlign="center" mt={5}>
          <Typography variant="h6" color="textSecondary">
            No results found. Try a different search term.
          </Typography>
        </Box>
      ) : (
        <>
          <MovieTable movies={movies} />
          <PaginationComponent
            currentPage={page}
            totalResults={totalResults}
            onPageChange={(value) => dispatch(setPage(value))}
          />
        </>
      )}
    </Box>
  );
};

export default MovieList;
