import React, { useState } from 'react';
import { Container, Typography, Button, Box, Grid, Paper, TextField, Alert } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useNavigate } from 'react-router-dom'; 
import { useDispatch} from 'react-redux'
import { authActions } from '../store/authSlice';
import Menu from '../components/Menu'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate(); 
    const [data, setData] = useState({
        user: '',
        password: '',
    });
    const [alert, setAlert] = useState({ message: '', severity: '' });
    const [loggedIn, setLoggedIn] = useState(false); 
   const isVerifiedUser = async () => {
        try {
            const response = await fetch(`http://localhost:3030/login?user=${data.user}&password=${data.password}`);
            const result = await response.json();
            if (result.data.length !== 0) {
             
                setAlert({ message: 'Has iniciado sesión.', severity: 'success' });
                setLoggedIn(true);
                dispatch(authActions.login({
                    name: data.user,
                    rol: 'administrador', 
                }));
                navigate('/home');
            } else {
          
                setAlert({ message: 'Credenciales erróneas.', severity: 'error' });
                setLoggedIn(false);
            }
        } catch (error) {
            setAlert({ message: 'Hubo un error con la conexión.', severity: 'error' });
            console.error("Error:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        isVerifiedUser(); 
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
        <Container maxWidth="sm" sx={{ mt: 4, m: 4  ,margin:'auto' ,padding:'100px'}}>
            <Menu/>
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