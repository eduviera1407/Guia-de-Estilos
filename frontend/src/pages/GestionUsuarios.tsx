import '../App.css';
import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from '@mui/material/Tooltip';
import Menu from '../components/Menu';
interface ItemType {
    id?: number;
    nombre: string;
    login: string;
    password: Number;
    rol: string;
  }
  
  const itemInitialState: ItemType = {
    nombre: '',
    login: '',
    password: 0,
    rol: ''
  };
const GestionUsuarios = () => {

    const userData = useSelector((state: RootState) => state.authenticator);

    const [item, setItem] = useState(itemInitialState);
    const [tableData, setTableData] = useState<ItemType[]>([]);
  
    const handleChange = (e: any) => {
      const { name, value, type } = e.target;
      setItem((prevItem) => ({
        ...prevItem,
        [name]: type === 'number' ? parseFloat(value) || 0 : value
      }));
    };

    async function isItemAdded() {
        fetch(`http://localhost:3030/addItemUser?nombre=${item.nombre}&login=${item.login}&password=${item.password}&rol=${item.rol}`)
          .then(response => response.json())
          .then(response => {
            console.log('Lo que nos llega de la base de datos: ')
            console.log(response)
    
            if (response > 0) {
              alert('Datos guardados con éxito');
              setItem(itemInitialState);
              fetchData();
            }
          })
      }
      

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3030/getItemsUser');
      const data = await response.json();
      setTableData(data.data);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    isItemAdded();
  };

  useEffect(() => {
    fetchData();
  }, []);
    
    return (
        <div>
             <Menu />
             <Box component="form" sx={{ padding: "50px", margin: "auto", maxWidth: 800, borderRadius: 2, boxShadow: 3, backgroundColor: "#f9f9f9" }} onSubmit={handleSubmit}>
        <Typography variant="h5" sx={{ textAlign: 'center', mb: 3, fontWeight: 'bold' }}>
          Ingresar Usuario
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre"
              name="nombre"
              value={item.nombre}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              sx={{ backgroundColor: "#fff" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Login"
              name="login"
              value={item.login}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              sx={{ backgroundColor: "#fff" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
              label="Password"
              name="password"
              value={item.password}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              sx={{ backgroundColor: "#fff" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Rol"
              name="rol"
              value={item.rol}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              sx={{ backgroundColor: "#fff" }}
            />
          </Grid>
          <Grid item xs={12}>
            <Tooltip title="Insertar el usuario" arrow>
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ padding: '10px', fontSize: '16px' }}>
                Insertar Usuario
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Box>

      <TableContainer sx={{ mt: 4, borderRadius: 2, boxShadow: 3 }}>
        <Table aria-label="tabla de usuarios">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
              <TableCell colSpan={6} sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                Lista de Usuarios
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell />
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Login</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Password</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Rol</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row: ItemType) => (
              <TableRow key={row.id} sx={{ '&:nth-of-type(even)': { backgroundColor: '#f7f7f7' } }}>
                <TableCell>

                </TableCell>

                <TableCell>{row.nombre}</TableCell>
                <TableCell>{row.login}</TableCell>
                <TableCell>{row.password}</TableCell>
                <TableCell>{row.rol}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        </div>
        
    );
};

export default GestionUsuarios;
