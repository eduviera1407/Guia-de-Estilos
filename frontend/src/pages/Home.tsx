import Typography from '@mui/material/Typography'; 

import Button from '@mui/material/Button';
import { useSelector } from 'react-redux'
// Importamos lo que necesitamos para el tipo del selector()
import { RootState} from '../store/index'
//Importamos las acciones que están en el fichero authSlice.ts
import { authActions } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';


    
const Home = () => {
    const userData = useSelector((state: RootState) => state.authenticator)
    console.log(userData)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const handleGoHome = () => {
        dispatch(authActions.logout())
        navigate('/'); // Redirige a la página de inicio
        console.log(userData)
    };
    return (
        <div>
            <Typography variant="h6" color='text.primary'>
                Pagina Home de Eduardo Viera: Soy el Usuario{userData.userName} y con el rol {userData.userRol}
            </Typography>
            <Button variant="contained" color="primary" onClick={handleGoHome} sx={{ mt: 3 }}>
              Salir
            </Button>
         
        </div>
        
    );
};

export default Home;
