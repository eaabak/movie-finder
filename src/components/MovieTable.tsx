import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
}

interface MovieTableProps {
  movies: Movie[];
}

const MovieTable: React.FC<MovieTableProps> = ({ movies }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Title</TableCell>
          <TableCell>Year</TableCell>
          <TableCell>Type</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {movies.map((movie) => (
          <TableRow
            key={movie.imdbID}
            onClick={() => (window.location.href = `/movie/${movie.imdbID}`)}
            style={{ cursor: "pointer" }}
          >
            <TableCell>{movie.Title}</TableCell>
            <TableCell>{movie.Year}</TableCell>
            <TableCell>{movie.Type}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MovieTable;
