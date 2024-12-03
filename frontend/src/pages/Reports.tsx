import '../App.css';
import React from 'react';
import { useState } from 'react';
import Menus from '../components/Menu';
import InformeUser from '../components/InformeUser';
import InformeColeccion from '../components/InformeColeccion';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

function Reports() {
  const [mostrarInforme, setMostrarInforme] = useState(false);
  const [datosColeccion, setDatosColeccion] = useState([]);

  const [mostrarInformeUser, setMostrarInformeUser] = useState(false);
  const [datosUSer, setDatosUser] = useState([]);
  const [position, setPosition] = useState(0);

  const handleGenerarInforme = async () => {
    try {
      const response = await fetch('http://localhost:3030/getItems');
      const data = await response.json();

      setDatosColeccion(data.data);
      setMostrarInforme(true);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
    
  };
  
  const handleGenerarInformegetItemsUser = async () => {
    try {
      const response = await fetch('http://localhost:3030/getItemsUser');
      const data = await response.json();

      setDatosUser(data.data);
      setMostrarInformeUser(true);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
    
  };
  return (
    <>
      <Menus />
      <Box sx={{ padding: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Generación de Informes
        </Typography>
        {!mostrarInforme ? (
          <Tooltip title="Generar informe Coleccion" arrow placement="left">
            <Button
              variant="contained"
              color="primary"
              onClick={handleGenerarInforme}
              size="large"
              style={{ position: "relative", top: "20px", left: "-50px" }} 

            >
              INFORME COLECCION
            </Button>
          </Tooltip>
          
        ) : (
          <InformeColeccion datos={datosColeccion} />
        )}
        {!mostrarInformeUser ? (
          <Tooltip title="Generar informe de los usuarios" arrow placement="right" >
            <Button
              variant="contained"
              color="primary"
              onClick={handleGenerarInformegetItemsUser}
              size="large"
              style={{ position: "relative", top: "20px", right: "-50px" }} 
            >
              INFORME USUARIOS
            </Button>
          </Tooltip>
          
        ) : (
          <InformeUser datos={datosUSer} />
        )}
      </Box>
    </>
  )
}

export default Reports