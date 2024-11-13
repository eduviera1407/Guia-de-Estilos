
import { useSelector } from 'react-redux'
import { RootState} from '../store/index'
import { authActions } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import Menu from '../components/Menu';
import Dashboard from '../components/Dashboard';

    
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
           
             <Menu />
             <Dashboard></Dashboard>
            
         
        </div>
        
    );
};

export default Home;
