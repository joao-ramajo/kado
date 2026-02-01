import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import {
	AppBar,
	Avatar,
	Box,
	Button,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Slide,
	Toolbar,
	Typography,
	useScrollTrigger,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/context/AuthContext";

type MenuItem = {
	label: string;
	to: string;
	public: boolean;
};

interface Props {
	children: React.ReactElement;
}

function HideOnScroll({ children }: Props) {
	const trigger = useScrollTrigger();
	return (
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	);
}

export function Header() {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const { user, isAuthenticated, logout } = useAuth();

	const menuItems: MenuItem[] = [
		{ label: "Apoie", to: "/apoie", public: true },
		{ label: "Guia", to: "/guia", public: true },
		{ label: "Recursos", to: "/recursos", public: true },
		{ label: "Dashboard", to: "/dashboard", public: false },
	];

	const visibleMenuItems = menuItems.filter(
		(item) => item.public || isAuthenticated,
	);

	const handleNavigation = (path: string) => {
		navigate(path);
		setOpen(false);
	};

	const handleLogout = () => {
		logout();
		setOpen(false);
	};

	return (
		<>
			<HideOnScroll>
				<AppBar
					position="sticky"
					elevation={0}
					sx={{
						backdropFilter: "blur(20px)",
						// backgroundColor: "rgba(25, 118, 210, 0.95)",
						borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
					}}
				>
					<Toolbar
						sx={{
							maxWidth: 1200,
							width: "100%",
							margin: "0 auto",
							px: { xs: 2, sm: 3 },
							minHeight: { xs: 56, sm: 64 },
						}}
					>
						{/* Logo */}
						<Link
							to="/"
							style={{
								textDecoration: "none",
								color: "inherit",
								display: "flex",
								alignItems: "center",
							}}
						>
							<img
            src="/logo-negativo.svg"
            alt="Kado"
            style={{ height: 62 }}
          />
						</Link>

						{/* Desktop menu */}
						<Box
							sx={{
								display: { xs: "none", md: "flex" },
								alignItems: "center",
								gap: 1,
								flex: 1,
								justifyContent: "center",
							}}
						>
							{visibleMenuItems.map((item: MenuItem) => (
								<Button
									key={item.label}
									color="inherit"
									onClick={() => navigate(item.to)}
									sx={{
										px: 2,
										py: 1,
										borderRadius: 2,
										textTransform: "none",
										fontSize: "0.95rem",
										fontWeight: 500,
										transition: "all 0.2s",
										"&:hover": {
											backgroundColor: "rgba(255, 255, 255, 0.15)",
											transform: "translateY(-1px)",
										},
									}}
								>
									{item.label}
								</Button>
							))}
						</Box>

						{/* Desktop auth section */}
						<Box
							sx={{
								display: { xs: "none", md: "flex" },
								alignItems: "center",
								gap: 2,
							}}
						>
							{isAuthenticated ? (
								<>
									<Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
										<Avatar
											sx={{
												width: 32,
												height: 32,
												bgcolor: "rgba(255, 255, 255, 0.2)",
												fontSize: "0.9rem",
											}}
										>
											{user?.name?.charAt(0).toUpperCase()}
										</Avatar>
										<Typography
											sx={{
												fontSize: "0.9rem",
												fontWeight: 500,
												maxWidth: 120,
												overflow: "hidden",
												textOverflow: "ellipsis",
												whiteSpace: "nowrap",
											}}
										>
											{user?.name}
										</Typography>
									</Box>
									<Button
										variant="contained"
										onClick={() => navigate("/dashboard")}
										sx={{
											bgcolor: "white",
											color: "primary.main",
											textTransform: "none",
											fontWeight: 600,
											px: 2.5,
											borderRadius: 2,
											boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
											"&:hover": {
												bgcolor: "grey.100",
												transform: "translateY(-2px)",
												boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
											},
											transition: "all 0.2s",
										}}
									>
										Carteira
									</Button>
									<Button
										color="inherit"
										onClick={logout}
										sx={{
											textTransform: "none",
											fontWeight: 500,
											borderRadius: 2,
											px: 2,
											"&:hover": {
												backgroundColor: "rgba(255, 255, 255, 0.1)",
											},
										}}
									>
										Sair
									</Button>
								</>
							) : (
								<Button
									variant="contained"
									onClick={() => navigate("/login")}
									sx={{
										bgcolor: "white",
										color: "primary.main",
										textTransform: "none",
										fontWeight: 600,
										px: 3,
										borderRadius: 2,
										boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
										"&:hover": {
											bgcolor: "grey.100",
											transform: "translateY(-2px)",
											boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
										},
										transition: "all 0.2s",
									}}
								>
									Entrar
								</Button>
							)}
						</Box>

						{/* Mobile menu button */}
						<IconButton
							color="inherit"
							sx={{
								display: { xs: "block", md: "none" },
								ml: "auto",
							}}
							onClick={() => setOpen(true)}
							aria-label="abrir menu"
						>
							<MenuIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
			</HideOnScroll>

			{/* Mobile drawer */}
			<Drawer
				anchor="right"
				open={open}
				onClose={() => setOpen(false)}
				sx={{
					"& .MuiDrawer-paper": {
						width: { xs: "85%", sm: 320 },
						maxWidth: 360,
					},
				}}
			>
				<Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
					{/* Drawer header */}
					<Box
						sx={{
							p: 2,
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							borderBottom: "1px solid",
							borderColor: "divider",
						}}
					>
						<Typography variant="h6" sx={{ fontWeight: 700 }}>
							Kado
						</Typography>
						<IconButton onClick={() => setOpen(false)} aria-label="fechar menu">
							<CloseIcon />
						</IconButton>
					</Box>

					{/* User info (if authenticated) */}
					{isAuthenticated && (
						<Box
							sx={{
								p: 2.5,
								bgcolor: "primary.main",
								color: "white",
							}}
						>
							<Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
								<Avatar
									sx={{
										width: 48,
										height: 48,
										bgcolor: "rgba(255, 255, 255, 0.2)",
									}}
								>
									{user?.name?.charAt(0).toUpperCase()}
								</Avatar>
								<Box>
									<Typography variant="body2" sx={{ opacity: 0.9, mb: 0.5 }}>
										Bem-vindo(a)
									</Typography>
									<Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
										{user?.name}
									</Typography>
								</Box>
							</Box>
						</Box>
					)}

					{/* Menu items */}
					<List sx={{ flex: 1, pt: 1 }}>
						{visibleMenuItems.map((item: MenuItem) => (
							<ListItem key={item.label} disablePadding>
								<ListItemButton
									onClick={() => handleNavigation(item.to)}
									sx={{
										py: 1.5,
										px: 2.5,
										"&:hover": {
											bgcolor: "primary.light",
											color: "primary.contrastText",
										},
									}}
								>
									<ListItemText
										primary={item.label}
										primaryTypographyProps={{
											fontWeight: 500,
											fontSize: "1rem",
										}}
									/>
								</ListItemButton>
							</ListItem>
						))}
					</List>

					<Divider />

					{/* Bottom actions */}
					<Box sx={{ p: 2 }}>
						{isAuthenticated ? (
							<>
								<Button
									fullWidth
									variant="contained"
									onClick={() => handleNavigation("/dashboard")}
									sx={{
										py: 1.5,
										mb: 1.5,
										textTransform: "none",
										fontWeight: 600,
										fontSize: "1rem",
										borderRadius: 2,
									}}
								>
									Acessar Carteira
								</Button>
								<Button
									fullWidth
									variant="outlined"
									onClick={handleLogout}
									sx={{
										py: 1.5,
										textTransform: "none",
										fontWeight: 500,
										fontSize: "1rem",
										borderRadius: 2,
									}}
								>
									Sair
								</Button>
							</>
						) : (
							<Button
								fullWidth
								variant="contained"
								onClick={() => handleNavigation("/login")}
								startIcon={<AccountCircleIcon />}
								sx={{
									py: 1.5,
									textTransform: "none",
									fontWeight: 600,
									fontSize: "1rem",
									borderRadius: 2,
								}}
							>
								Entrar
							</Button>
						)}
					</Box>
				</Box>
			</Drawer>
		</>
	);
}
