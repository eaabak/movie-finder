import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchMovieDetails } from "../redux/slices/movieSlice";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { movieDetails, loading } = useSelector(
    (state: RootState) => state.movies
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetails(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (!movieDetails) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="h6">Movie not found.</Typography>
      </Box>
    );
  }

  return (
    <Card sx={{ maxWidth: "800px", margin: "0 auto", mt: 4, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {movieDetails.Title}
        </Typography>
        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={3}>
          <Box flex="1" textAlign="center">
            <img
              src={movieDetails.Poster}
              alt={movieDetails.Title}
              style={{ maxWidth: "100%", borderRadius: "8px" }}
            />
          </Box>

          <Box flex="2">
            <Typography variant="body1" gutterBottom>
              <strong>Year:</strong> {movieDetails.Year}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Runtime:</strong> {movieDetails.Runtime}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Genre:</strong> {movieDetails.Genre}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Director:</strong> {movieDetails.Director}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Cast:</strong> {movieDetails.Actors}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>IMDb Rating:</strong> {movieDetails.imdbRating}
            </Typography>
            <Typography variant="body2" mt={2}>
              <strong>Plot:</strong> {movieDetails.Plot}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MovieDetails;
