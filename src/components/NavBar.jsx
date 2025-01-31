import { useContext } from "react";
import { Typography, Stack, IconButton, useMediaQuery } from "@mui/material";
import { ThemeContext } from "../theme/ThemeContext";
import { Link, useOutletContext } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function Navbar() {
  const { handleMobileMenu } = useOutletContext(); 
  const isMobile = useMediaQuery("(max-width:800px)"); 
  const { setMode, mode } = useContext(ThemeContext); // To toggle dark/light theme

  return (
    <Stack
      component={"header"}
      p={{ xs: 2, md: 3 }}
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        {isMobile && (
          <MenuIcon
            onClick={() => handleMobileMenu((prev) => !prev)}
          />
        )}

        <Link to={"/"} style={{ textDecoration: "none" }}>
          <Typography variant="h1" component={"h1"}>
            My ChatBot
          </Typography>
        </Link>
      </Stack>

      <Stack direction={"row"} spacing={0.2} alignItems={"center"}>
        <Typography textTransform={"capitalize"} fontSize={10}>
          {mode}
        </Typography>
        <IconButton
          onClick={
            () => setMode((prev) => (prev === "light" ? "dark" : "light")) 
          }
        >
          {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
      </Stack>
    </Stack>
  );
}
