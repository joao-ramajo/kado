import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
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
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Slide,
	Toolbar,
	Typography,
	useScrollTrigger,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/context/AuthContext";

type ItemMenu = {
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
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const { user, isAuthenticated, logout } = useAuth();

	const userMenuOpen = Boolean(anchorEl);

	const menuItems: ItemMenu[] = [
		{ label: "Home", to: "/inicio", public: true },
		{ label: "Apoie", to: "/apoie", public: true },
		{ label: "Guia de Uso", to: "/guia-de-uso", public: true },
	];

	const visibleMenuItems = menuItems.filter(
		(item) => item.public || isAuthenticated,
	);

	const drawerPrimaryActions = isAuthenticated
		? [
				{
					label: "Ir para a carteira",
					to: "/dashboard",
					description: "Abrir o painel financeiro",
					icon: DashboardIcon,
					emphasis: true,
				},
				{
					label: "Configurar cards",
					to: "/ajustes",
					description: "Escolher os 3 cards do resumo",
					icon: SettingsIcon,
					emphasis: false,
				},
			]
		: [
				{
					label: "Entrar",
					to: "/login",
					description: "Acesse sua conta",
					icon: AccountCircleIcon,
					emphasis: true,
				},
			];

	const handleNavigation = (path: string) => {
		navigate(path);
		setOpen(false);
	};

	const handleLogout = () => {
		logout();
		setOpen(false);
		setAnchorEl(null);
	};

	const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleUserMenuClose = () => {
		setAnchorEl(null);
	};

	// Pega as iniciais do nome para o avatar
	const initials = user?.name
		? user.name
				.split(" ")
				.map((n) => n[0])
				.join("")
				.toUpperCase()
				.slice(0, 2)
		: "";

	return (
		<>
			<HideOnScroll>
				<AppBar
					position="sticky"
					elevation={0}
					sx={{
						backdropFilter: "blur(20px)",
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
							to="/inicio"
							style={{
								textDecoration: "none",
								color: "inherit",
								display: "flex",
								alignItems: "center",
							}}
						>
							<img src="/logo-negativo.svg" alt="Kado" style={{ height: 62 }} />
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
							{visibleMenuItems.map((item) => (
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

									{/* User Menu Button */}
									<IconButton
										onClick={handleUserMenuClick}
										size="small"
										sx={{
											p: 0.5,
											"&:hover": {
												bgcolor: "rgba(255, 255, 255, 0.1)",
											},
										}}
										aria-controls={userMenuOpen ? "user-menu" : undefined}
										aria-haspopup="true"
										aria-expanded={userMenuOpen ? "true" : undefined}
									>
										<Avatar
											sx={{
												width: 36,
												height: 36,
												bgcolor: "rgba(255, 255, 255, 0.2)",
												fontSize: "0.875rem",
												fontWeight: 600,
												border: "2px solid rgba(255, 255, 255, 0.3)",
											}}
										>
											{initials}
										</Avatar>
									</IconButton>
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

			{/* User Dropdown Menu */}
			<Menu
				anchorEl={anchorEl}
				id="user-menu"
				open={userMenuOpen}
				onClose={handleUserMenuClose}
				onClick={handleUserMenuClose}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
				slotProps={{
					paper: {
						elevation: 0,
						sx: {
							minWidth: 240,
							overflow: "visible",
							filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.08))",
							mt: 1.5,
							borderRadius: 2,
							border: 1,
							borderColor: "divider",
						},
					},
				}}
			>
				{/* Header do menu com info do usuário */}
				<Box sx={{ px: 2, py: 1.5, pb: 1 }}>
					<Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
						{user?.name}
					</Typography>
					<Typography variant="caption" sx={{ color: "text.secondary" }}>
						Atalhos da conta
					</Typography>
				</Box>

				<Divider sx={{ my: 1 }} />

				<MenuItem
					onClick={() => navigate("/dashboard")}
					sx={{
						py: 1.25,
						px: 2,
						"&:hover": {
							bgcolor: "action.hover",
						},
					}}
				>
					<ListItemIcon>
						<DashboardIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText>
						<Typography variant="body2" sx={{ fontWeight: 600 }}>
							Abrir carteira
						</Typography>
					</ListItemText>
				</MenuItem>

				<MenuItem
					onClick={() => navigate("/ajustes")}
					sx={{
						py: 1.25,
						px: 2,
						"&:hover": {
							bgcolor: "action.hover",
						},
					}}
				>
					<ListItemIcon>
						<SettingsIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText>
						<Typography variant="body2" sx={{ fontWeight: 600 }}>
							Abrir ajustes
						</Typography>
					</ListItemText>
				</MenuItem>

				<MenuItem
					onClick={handleLogout}
					sx={{
						py: 1.25,
						px: 2,
						"&:hover": {
							bgcolor: "action.hover",
						},
					}}
				>
					<ListItemIcon>
						<LogoutIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText>
						<Typography variant="body2">Sair</Typography>
					</ListItemText>
				</MenuItem>
			</Menu>

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
						<Box>
							<Typography
								variant="h6"
								sx={{ fontWeight: 800, lineHeight: 1.1 }}
							>
								Menu
							</Typography>
							<Typography variant="caption" color="text.secondary">
								Atalhos principais do app
							</Typography>
						</Box>
						<IconButton onClick={() => setOpen(false)} aria-label="fechar menu">
							<CloseIcon />
						</IconButton>
					</Box>

					{/* User info (if authenticated) */}
					{isAuthenticated && (
						<Box
							sx={{
								p: 2.5,
								bgcolor: "#0F172A",
								color: "white",
							}}
						>
							<Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
								<Avatar
									sx={{
										width: 48,
										height: 48,
										bgcolor: "#2563EB",
									}}
								>
									{initials}
								</Avatar>
								<Box>
									<Typography variant="body2" sx={{ opacity: 0.8, mb: 0.5 }}>
										Conta conectada
									</Typography>
									<Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
										{user?.name}
									</Typography>
									<Typography variant="caption" sx={{ opacity: 0.75 }}>
										Você pode abrir a carteira ou ajustar os cards aqui
									</Typography>
								</Box>
							</Box>
						</Box>
					)}

					{/* Menu items */}
					<List sx={{ flex: 1, pt: 1 }}>
						<ListItem sx={{ px: 2.5, pb: 0.5 }}>
							<Typography
								variant="overline"
								sx={{ fontWeight: 800, color: "text.secondary" }}
							>
								Atalhos
							</Typography>
						</ListItem>
						{drawerPrimaryActions.map((item) => {
							const Icon = item.icon;

							return (
								<ListItem key={item.label} disablePadding>
									<ListItemButton
										onClick={() => handleNavigation(item.to)}
										sx={{
											py: 1.5,
											px: 2.5,
											mx: 1.5,
											mb: 0.75,
											borderRadius: 2,
											bgcolor: item.emphasis ? "primary.main" : "action.hover",
											color: item.emphasis
												? "primary.contrastText"
												: "text.primary",
											"&:hover": {
												bgcolor: item.emphasis
													? "primary.dark"
													: "action.selected",
											},
										}}
									>
										<ListItemIcon
											sx={{
												minWidth: 36,
												color: item.emphasis
													? "primary.contrastText"
													: "text.secondary",
											}}
										>
											<Icon />
										</ListItemIcon>
										<ListItemText
											primary={item.label}
											secondary={item.description}
											primaryTypographyProps={{
												fontWeight: 700,
												fontSize: "0.98rem",
											}}
											secondaryTypographyProps={{
												fontSize: "0.78rem",
												sx: {
													color: item.emphasis
														? "rgba(255,255,255,0.75)"
														: "text.secondary",
												},
											}}
										/>
										<ChevronRightIcon
											fontSize="small"
											sx={{
												ml: 1,
												color: item.emphasis
													? "primary.contrastText"
													: "text.secondary",
											}}
										/>
									</ListItemButton>
								</ListItem>
							);
						})}

						<Divider sx={{ my: 1.5, mx: 2 }} />

						<ListItem sx={{ px: 2.5, pb: 0.5 }}>
							<Typography
								variant="overline"
								sx={{ fontWeight: 800, color: "text.secondary" }}
							>
								Navegação
							</Typography>
						</ListItem>
						{visibleMenuItems.map((item) => (
							<ListItem key={item.label} disablePadding>
								<ListItemButton
									onClick={() => handleNavigation(item.to)}
									sx={{
										py: 1.35,
										px: 2.5,
										mx: 1.5,
										mb: 0.5,
										borderRadius: 2,
									}}
								>
									<ListItemText
										primary={item.label}
										primaryTypographyProps={{
											fontWeight: 500,
											fontSize: "0.98rem",
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
