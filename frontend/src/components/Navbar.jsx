/**
 * Component: navigation bar with links to dashboard, report, and charts.
 */

import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { CostsContext } from '../contexts/CostsContext.jsx';
import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from '@mui/material';

const NAV_ITEMS = [
    { label: 'ADD COST', to: '/dashboard' },
    { label: 'REPORT', to: '/report' },
    { label: 'CHARTS', to: '/statistics' },
];

const Navbar = () => {
    const { isAuthenticated, handleLogout } = React.useContext(CostsContext);
    const location = useLocation();

    return (
        <AppBar
            position="sticky"
            color="inherit"
            elevation={0}
            sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ minHeight: 72 }}>
                    <Typography
                        component={RouterLink}
                        to={isAuthenticated ? '/dashboard' : '/login'}
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
                        <Box
                            component="img"
                            src="/favicon.png"
                            alt="Cost Manager logo"
                            sx={{ width: 22, height: 22 }}
                        />
                        Cost Manager
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={{ xs: 1.5, md: 2.5 }}
                        flexWrap="wrap"
                        useFlexGap
                        sx={{ ml: 'auto' }}
                    >
                        {isAuthenticated && NAV_ITEMS.map((item) => {
                            const isActive = location.pathname === item.to;

                            return (
                                <Button
                                    key={item.to}
                                    component={RouterLink}
                                    to={item.to}
                                    color="inherit"
                                    sx={{
                                        textDecoration: 'none',
                                        color: isActive ? 'text.primary' : 'text.secondary',
                                        fontWeight: 500,
                                        fontSize: 14,
                                        lineHeight: 1,
                                        minWidth: 0,
                                        borderRadius: 0,
                                        borderBottom: '2px solid',
                                        borderColor: isActive ? 'primary.main' : 'transparent',
                                        transition: 'color 0.2s ease, border-color 0.2s ease',
                                        '&:hover': {
                                            color: 'text.primary',
                                            backgroundColor: 'transparent',
                                        },
                                    }}
                                >
                                    {item.label}
                                </Button>
                            );
                        })}

                        {!isAuthenticated ? (
                            <Button
                                variant="outlined"
                                component={RouterLink}
                                to="/login"
                                color="inherit"
                                sx={{
                                    fontWeight: 700,
                                    fontSize: 14,
                                    lineHeight: 1,
                                    alignSelf: 'center',
                                }}
                            >
                                LOGIN
                            </Button>
                        ) : (
                            <Button
                                type="button"
                                onClick={handleLogout}
                                variant="contained"
                                sx={{
                                    fontWeight: 700,
                                    fontSize: 14,
                                    lineHeight: 1,
                                    alignSelf: 'center',
                                }}
                            >
                                LOGOUT
                            </Button>
                        )}
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;