import React, { useState } from 'react';
import { Container, Typography, Button, Box, Grid, Paper, TextField, Alert } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const Login = () => {
    const navigate = useNavigate(); // Inicializa useNavigate
    const bduser = 'eduardo';
    const bdpasswd = '1234';
    const [data, setData] = useState({
        user: '',
        password: '',
    });
    const [alert, setAlert] = useState({ message: '', severity: '' });
    const [loggedIn, setLoggedIn] = useState(false); 

    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.user === bduser && data.password === bdpasswd) {
            setAlert({ message: 'Has iniciado sesión.', severity: 'success' });
            setLoggedIn(true); 
            navigate('/home'); // Redirige a Home
        } else {
            setAlert({ message: 'Credenciales erróneas.', severity: 'error' });
            setLoggedIn(false);
            navigate('/Reports'); // Redirige a Home
      
        }
    };

    const handleChangeuser = (e) => {
        setData({
            ...data,
            user: e.target.value,
        });
    };

    const handleChangepassword = (e) => {
        setData({
            ...data,
            password: e.target.value,
        });
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4, m: 4 }}>
            <Paper elevation={3} sx={{ textAlign: 'center', p: 3 }}>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{ mb: 2 }}>
                    {loggedIn ? <LockOpenIcon /> : <LockIcon />} 
                    <Typography variant="h6" color="text" sx={{ ml: 1 }}>
                        Sistema de acceso
                    </Typography>
                </Box>

                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                label="Usuario"
                                variant="outlined"
                                fullWidth
                                value={data.user}
                                onChange={handleChangeuser}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                type="password"
                                required
                                label="Contraseña"
                                variant="outlined"
                                fullWidth
                                value={data.password}
                                onChange={handleChangepassword}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Acceder
                                <LoginIcon sx={{ ml: 1 }} />  
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            {alert.message && (
                                <Alert severity={alert.severity}>
                                    {alert.message}
                                </Alert>
                            )}
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;
