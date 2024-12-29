import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchMovies,
  fetchMovieDetails as fetchDetails,
} from "../../api/movieApi";

interface MovieDetails {
  Title: string;
  Year: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  Poster: string;
  imdbRating: string;
}

interface MovieState {
  movies: [];
  totalResults: number;
  loading: boolean;
  search: string;
  year: string;
  type: string;
  page: number;
  movieDetails: MovieDetails | null;
}

const initialState: MovieState = {
  movies: [],
  totalResults: 0,
  loading: false,
  search: "Pokemon",
  year: "",
  type: "movie",
  page: 1,
  movieDetails: null,
};

export const fetchMovieList = createAsyncThunk(
  "movies/fetchMovieList",
  async (_, { getState }) => {
    const state = getState() as { movies: MovieState };
    const { search, year, type, page } = state.movies;
    const response = await fetchMovies({ s: search, y: year, type, page });
    return response;
  }
);

export const fetchMovieDetails = createAsyncThunk(
  "movies/fetchMovieDetails",
  async (id: string) => {
    const response = await fetchDetails(id);
    return response;
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setYear: (state, action) => {
      state.year = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovieList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMovieList.fulfilled, (state, action) => {
      state.loading = false;
      state.movies = action.payload.Search || [];
      state.totalResults = Number(action.payload.totalResults || 0);
    });
    builder.addCase(fetchMovieList.rejected, (state) => {
      state.loading = false;
      state.movies = [];
      state.totalResults = 0;
    });

    builder.addCase(fetchMovieDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMovieDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.movieDetails = action.payload;
    });
    builder.addCase(fetchMovieDetails.rejected, (state) => {
      state.loading = false;
      state.movieDetails = null;
    });
  },
});

export const { setSearch, setYear, setType, setPage } = movieSlice.actions;
export default movieSlice.reducer;
