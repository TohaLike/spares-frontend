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

export const MainPage: React.FC = () => {
  const [value, setValue] = useState<string>("");

  const { detailsData, isSearchingDetails, searchDetails } = useDetails();

  const handleSearch = () => {
    searchDetails(value);
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
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button variant="contained" onClick={handleSearch} disabled={value.trim() === ""}>Найти</Button>
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
            <TableBody>
              {isSearchingDetails && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    Загрузка...
                  </TableCell>
                </TableRow>
              )}

              {!isSearchingDetails && detailsData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    Ничего не найдено
                  </TableCell>
                </TableRow>
              )}

              {!isSearchingDetails &&
                detailsData.map(
                  ({
                    id,
                    searchCode,
                    manufacturerDescription,
                    description,
                  }) => (
                    <TableRow key={id}>
                      <TableCell>{id}</TableCell>
                      <TableCell>{searchCode || "..."}</TableCell>
                      <TableCell>{manufacturerDescription}</TableCell>
                      <TableCell>{description || "No description"}</TableCell>
                    </TableRow>
                  )
                )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};
