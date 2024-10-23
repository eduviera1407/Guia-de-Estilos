import { Container, Typography, Button, Box } from '@mui/material';

const Login = () => {
    return (
        
        <Container maxWidth="sm" sx={{ mt: 4, m: 4 }}>
            <header>
            <Typography variant="h1" color="primary" align="center" gutterBottom>
                Página de Login
            </Typography>
            </header>
            <main>
            <Typography variant="h2" color="secondary" align="center" gutterBottom>
                Bienvenido
            </Typography>
            <Typography variant="h3" align="center" gutterBottom>
                Accede a tu cuenta
            </Typography>
            <Typography variant="subtitle1" color="text.primary" align="center" gutterBottom>
                Por favor, introduce tus credenciales
            </Typography>
            <Box sx={{ my: 2 }}>
                <Typography variant="body1" align="center">
                    Esto es un texto de ejemplo para el cuerpo de la página.
                </Typography>
               
            </Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
                <Button variant="contained" color="primary" fullWidth sx={{ mb: 1 }}>
                    Iniciar Sesión
                </Button>
                <Button variant="outlined" color="secondary" fullWidth sx={{ mb: 1 }}>
                    Registrarse
                </Button>
                <Button variant="text" color="error" fullWidth sx={{ mb: 1 }}>
                    Olvidé mi contraseña
                </Button>
                <Button variant="contained" color="success" fullWidth sx={{ mb: 1 }}>
                    Ayuda
                </Button>
                <Button variant="outlined" color="warning" fullWidth>
                    Contactar Soporte
                </Button>
            </Box>
            </main>
            <footer>
            <Typography variant="caption" color="text.secondary" align="center">
                    Recuerda que tu información es segura.
                </Typography>
             </footer>
        </Container>
        
    );
};

export default Login;
