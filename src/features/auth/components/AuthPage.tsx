"use client";
import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { authService } from "../services";
import { useRouter } from "next/navigation";

const overlayStyle = {
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

export const AuthPage: React.FC = () => {
  const router = useRouter();

  const handleLoginClick = async () => {
    try {
      const response = await authService.auth();

      router.push("/main");

      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div style={overlayStyle}>
      <Box sx={style}>
        <Typography id="login-modal-title" variant="h6" gutterBottom>
          Авторизация
        </Typography>
        <Button variant="contained" color="primary" onClick={handleLoginClick}>
          Войти
        </Button>
      </Box>
    </div>
  );
};
