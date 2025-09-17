"use client";
import React, { useState } from "react";
import { useDetails } from "../hooks";
import { useDebounce } from "use-debounce";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

const rows = [
  { id: 1, name: "Иван", role: "Admin" },
  { id: 2, name: "Анна", role: "User" },
  { id: 3, name: "Петр", role: "User" },
  { id: 4, name: "Света", role: "Moderator" },
];

export const MainPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");

  const [debounceText] = useDebounce(search, 1000);

  const { detailsData, isLoading } = useDetails(debounceText);

  const filtered = rows.filter((row) => {
    const matchesSearch = row.name.toLowerCase().includes(search.toLowerCase());
    const matchesRole = role ? row.role === role : true;
    return matchesSearch && matchesRole;
  });

  console.log(detailsData);

  return (
    <div>
      <Paper sx={{ p: 2 }}>
        <TextField
          label="Поиск"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Имя</TableCell>
                <TableCell>Роль</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.role}</TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    Нет данных
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};
