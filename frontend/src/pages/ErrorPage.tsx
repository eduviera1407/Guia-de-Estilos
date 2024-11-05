
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
                ¡Error 404!
            </Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
                La página que buscas no existe.
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
                Puede que la URL esté mal escrita o la página haya sido eliminada.
            </Typography>
            <Button variant="contained" color="primary" onClick={handleGoHome} sx={{ mt: 3 }}>
                Volver a la Página de Inicio
            </Button>
        </Container>
    );
};

export default ErrorPage;
