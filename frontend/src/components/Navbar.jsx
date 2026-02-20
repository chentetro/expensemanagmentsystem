import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { CostsContext } from '../contexts/CostsContext.jsx';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';

const Navbar = () => {
    const { isAuthenticated, handleLogout } = React.useContext(CostsContext);
    const location = useLocation();

    const navItems = [
        { label: 'ADD COST', to: '/dashboard' },
        { label: 'REPORT', to: '/report' },
        { label: 'CHARTS', to: '/statistics' },
    ];

    return (
        <Box
            sx={{
                position: 'sticky',
                top: 0,
                zIndex: 1100,
                bgcolor: 'background.paper',
                borderBottom: '1px solid',
                borderColor: 'rgba(0,0,0,0.06)',
            }}
        >
            <Container maxWidth="lg">
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    justifyContent="space-between"
                    alignItems={{ xs: 'stretch', sm: 'center' }}
                    spacing={0}
                    sx={{ minHeight: 72 }}
                >
                    <Typography
                        component={RouterLink}
                        to="/dashboard"
                        variant="h5"
                        sx={{
                            textDecoration: 'none',
                            color: 'primary.main',
                            fontWeight: 700,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 1,
                            py: 1,
                        }}
                    >
                        <FactCheckOutlinedIcon fontSize="small" />
                        Cost Manager
                    </Typography>

                    <Stack direction="row" spacing={{ xs: 1.5, md: 2.5 }} flexWrap="wrap" useFlexGap>
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.to;
                            return (
                                <Box
                                    key={item.to}
                                    component={RouterLink}
                                    to={item.to}
                                    sx={{
                                        textDecoration: 'none',
                                        color: isActive ? 'text.primary' : 'text.secondary',
                                        fontWeight: 500,
                                        fontSize: 22,
                                        lineHeight: 1,
                                        py: 2.8,
                                        borderBottom: '2px solid',
                                        borderColor: isActive ? 'primary.main' : 'transparent',
                                        transition: 'color 0.2s ease, border-color 0.2s ease',
                                        '&:hover': {
                                            color: 'text.primary',
                                        },
                                    }}
                                >
                                    {item.label}
                                </Box>
                            );
                        })}

                        {!isAuthenticated ? (
                            <Box
                                component={RouterLink}
                                to="/login"
                                sx={{
                                    textDecoration: 'none',
                                    color: 'text.secondary',
                                    fontWeight: 500,
                                    fontSize: 22,
                                    lineHeight: 1,
                                    py: 2.8,
                                    px: 0,
                                    borderBottom: '2px solid transparent',
                                    transition: 'color 0.2s ease, border-color 0.2s ease',
                                    '&:hover': {
                                        color: 'text.primary',
                                        borderBottomColor: 'primary.main',
                                    },
                                }}
                            >
                                LOGIN
                            </Box>
                        ) : (
                            <Box
                                component="button"
                                type="button"
                                onClick={handleLogout}
                                sx={{
                                    appearance: 'none',
                                    background: 'none',
                                    border: 0,
                                    textDecoration: 'none',
                                    color: 'text.secondary',
                                    fontWeight: 500,
                                    fontSize: 22,
                                    lineHeight: 1,
                                    fontFamily: 'inherit',
                                    py: 2.8,
                                    px: 0,
                                    borderBottom: '2px solid transparent',
                                    cursor: 'pointer',
                                    transition: 'color 0.2s ease, border-color 0.2s ease',
                                    '&:hover': {
                                        color: 'text.primary',
                                        borderBottomColor: 'primary.main',
                                    },
                                }}
                            >
                                LOGOUT
                            </Box>
                        )}
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
};

export default Navbar;