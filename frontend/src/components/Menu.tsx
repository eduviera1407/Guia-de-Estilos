import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SummarizeIcon from '@mui/icons-material/Summarize';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';  // Icono para el usuario normal
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/authSlice';
import { RootState } from '../store';
import Tooltip from '@mui/material/Tooltip';
import AdbIcon from '@mui/icons-material/Adb';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { positions } from '@mui/system';

const Menu = () => {
  const userData = useSelector((state: RootState) => state.authenticator);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const isLoggedin = userData.isAutenticated;

  useEffect(() => {
    if (!isLoggedin) {

      navigate('/');
    }
  }, [isLoggedin, navigate]);

  const handleGoHome = () => {
    dispatch(authActions.logout());
    navigate('/');
    console.log(userData);
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton edge="start" onClick={toggleDrawer(true)}>
        <Tooltip title="Abrir menu" disableInteractive arrow placement="right" >
          <MenuIcon />
          </Tooltip>
        </IconButton>
        <div style={{ flexGrow: 1, textAlign: 'center' }}>
          <Typography color="white">{userData.userName}</Typography>
        </div>
        <IconButton edge="end">
        {userData.userRol === 'admin' ? (
      <Tooltip title="Administrador" arrow placement="right">
        <AdminPanelSettingsIcon />
      </Tooltip>
    ) : userData.userRol === 'usuario' ? (
      <Tooltip title="Usuario" arrow>
        <AdbIcon />
      </Tooltip>
    ) : userData.userRol === 'invitado' ? (
      <Tooltip title="Invitado" arrow>
        <InsertEmoticonIcon />
      </Tooltip>
    ) : null}
        </IconButton>
      </Toolbar>

      <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          <Link to={'/home'} style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem disablePadding>
            <Tooltip title="Volver a la pagina principal"  arrow  placement="right"> 
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Inicio" />
                
              </ListItemButton>
              </Tooltip>

            </ListItem>
          </Link>

          {/* Renderizar "Informes" solo si el usuario es admin */}
          {userData.userRol === 'admin' && (
            <Link to={'/Reports'} style={{ textDecoration: 'none', color: 'black' }}>
              <ListItem disablePadding>
              <Tooltip title="Ir a la pagina de Informes" arrow placement="right">
                <ListItemButton>
                  <ListItemIcon>
                    <SummarizeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Informes" />
                </ListItemButton>
                </Tooltip>
              </ListItem>
            </Link>
          )}

          <Link to={'/Manual de Usuario.pdf'} target='_blank' style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem disablePadding>

              <Tooltip title="Manual de Ayuda" arrow placement="right"> 
                <ListItemButton>

                  <ListItemIcon>
                    <HelpIcon />
                  </ListItemIcon>
                  <ListItemText primary="Ayuda" />
                </ListItemButton>
              </Tooltip>


            </ListItem>
          </Link>

          <Link to={'/'} style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem disablePadding>
            <Tooltip title="Cerrar Sesión" arrow placement="right">
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Salir" />
                
              </ListItemButton>
              </Tooltip>

            </ListItem>
          </Link>

           {userData.userRol === 'admin' && (
          <Link to={'/gestionusuarios'} style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem disablePadding>
            <Tooltip title="Gestion de usuarios" arrow placement="right">
              <ListItemButton>
                <ListItemIcon>
                <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Gestion de usuarios" />
                
              </ListItemButton>
              </Tooltip>

            </ListItem>
          </Link>
           )}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Menu;