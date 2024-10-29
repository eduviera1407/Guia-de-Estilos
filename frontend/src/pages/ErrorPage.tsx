
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/'); // Redirige a la página de inicio
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="h4" color="error">
                ¡Error!
            </Typography>
        
            <Button variant="contained" color="primary" onClick={handleGoHome} sx={{ mt: 3 }}>
                Volver a la Página de Inicio
            </Button>
        </Container>
    );
};

export default ErrorPage;
