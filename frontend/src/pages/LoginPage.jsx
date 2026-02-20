import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material';

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <Container maxWidth="sm" sx={{ py: 5 }}>
            <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 } }}>
                <Stack spacing={2} alignItems="center">
                    {isLogin ? <LoginForm /> : <RegisterForm setIsLogin={setIsLogin} />}

                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            {isLogin ? "Don't have an account?" : 'Already have an account?'}
                        </Typography>
                        <Button
                            variant="text"
                            onClick={() => setIsLogin((prev) => !prev)}
                        >
                            {isLogin ? 'Go to Register' : 'Back to Login'}
                        </Button>
                    </Box>
                </Stack>
            </Paper>
        </Container>
    );
};

export default LoginPage;