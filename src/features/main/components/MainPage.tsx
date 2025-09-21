"use client";
import React, { useState } from "react";
import { useDetails } from "../hooks";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

interface Detail {
  id: number;
  searchCode?: string;
  manufacturerDescription: string;
  description?: string;
}

export const MainPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const { detailsData, isSearchingDetails, searchDetails, error } =
    useDetails();

  const handleSearch = () => {
    if (searchValue.trim()) searchDetails(searchValue.trim());
  };

  const renderTableContent = () => {
    if (error) {
      return (
        <TableRow>
          <TableCell colSpan={4} align="center">
            {error}
          </TableCell>
        </TableRow>
      );
    }

    if (isSearchingDetails) {
      return (
        <TableRow>
          <TableCell colSpan={4} align="center">
            Загрузка...
          </TableCell>
        </TableRow>
      );
    }

    if (!detailsData.length) {
      return (
        <TableRow>
          <TableCell colSpan={4} align="center">
            Ничего не найдено
          </TableCell>
        </TableRow>
      );
    }

    return detailsData.map((detail: Detail) => (
      <TableRow key={detail.id}>
        <TableCell>{detail.id}</TableCell>
        <TableCell>{detail.searchCode || "..."}</TableCell>
        <TableCell>{detail.manufacturerDescription}</TableCell>
        <TableCell>{detail.description || "No description"}</TableCell>
      </TableRow>
    ));
  };

  return (
    <div>
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Поиск по артикулу"
            variant="outlined"
            size="small"
            fullWidth
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            disabled={!searchValue.trim() || isSearchingDetails}
          >
            Найти
          </Button>
        </Box>

        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "10%" }}>ID</TableCell>
                <TableCell sx={{ width: "20%" }}>Артикул</TableCell>
                <TableCell sx={{ width: "25%" }}>Производитель</TableCell>
                <TableCell sx={{ width: "45%" }}>Наименование</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderTableContent()}</TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};
