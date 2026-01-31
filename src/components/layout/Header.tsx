import MenuIcon from "@mui/icons-material/Menu";
import {
	AppBar,
	Box,
	Button,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Toolbar,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/context/AuthContext";

export function Header() {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const { user, isAuthenticated, logout } = useAuth();

	const menuItems = [
		{ label: "Apoie", to: "/apoie" },
		{ label: "Guia", to: "/guia" },
		{ label: "Recursos", to: "/recursos" },
	];

	return (
		<>
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
					<Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
						<Typography variant="h6">Wallet</Typography>
					</Link>

					{/* Desktop menu */}
					<Box
						sx={{
							display: { xs: "none", md: "flex" },
							alignItems: "center",
							gap: 2,
						}}
					>
						{menuItems.map((item) => (
							<Button
								key={item.label}
								color="inherit"
								onClick={() => navigate(item.to)}
							>
								{item.label}
							</Button>
						))}

						{isAuthenticated ? (
							<>
								<Typography>{user?.name}</Typography>
								<Button
									variant="contained"
									onClick={() => navigate("/dashboard")}
								>
									Carteira
								</Button>
								<Button color="inherit" onClick={logout}>
									Sair
								</Button>
							</>
						) : (
							<Button variant="contained" onClick={() => navigate("/login")}>
								Entrar
							</Button>
						)}
					</Box>

					{/* Mobile menu button */}
					<IconButton
						color="inherit"
						sx={{ display: { xs: "block", md: "none" } }}
						onClick={() => setOpen(true)}
					>
						<MenuIcon />
					</IconButton>
				</Toolbar>
			</AppBar>

			{/* Mobile drawer */}
			<Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
				<Box sx={{ width: 250 }} role="presentation">
					<List>
						{menuItems.map((item) => (
							<ListItem
								key={item.label}
								onClick={() => {
									navigate(item.to);
									setOpen(false);
								}}
							>
								<ListItemText primary={item.label} />
							</ListItem>
						))}

						{isAuthenticated ? (
							<>
								<ListItem
									onClick={() => {
										navigate("/dashboard");
										setOpen(false);
									}}
								>
									<ListItemText primary="Carteira" />
								</ListItem>

								<ListItem
									onClick={() => {
										logout();
										setOpen(false);
									}}
								>
									<ListItemText primary="Sair" />
								</ListItem>
							</>
						) : (
							<ListItem
								onClick={() => {
									navigate("/login");
									setOpen(false);
								}}
							>
								<ListItemText primary="Entrar" />
							</ListItem>
						)}
					</List>
				</Box>
			</Drawer>
		</>
	);
}
