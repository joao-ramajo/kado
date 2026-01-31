import { AppBar, Toolbar, Box, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";


export function Header() {
    const navigate = useNavigate();

    return (
        <AppBar position="static">
            <Toolbar
                sx={{
                    maxWidth: 1200,
                    width: "100%",
                    margin: "0 auto",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                {/* Logo */}
                <Link to="/">
                    <Typography
                        variant="h6"
                    >
                        Wallet
                    </Typography>
                    </Link>

                {/* Menu */}
                <Box display="flex" alignItems="center" gap={2}>
                    <Button color="inherit">Apoie</Button>
                    <Button color="inherit">Guia</Button>
                    <Button color="inherit">Recursos</Button>
                    <Button variant="contained" onClick={() => navigate("/login")}>Entrar</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
