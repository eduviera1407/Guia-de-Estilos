import '../App.css';
import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from '@mui/material/Tooltip';

interface ItemType {
  id?: number;
  nombre: string;
  marca: string;
  tipo: string;
  precio: number;
}

const itemInitialState: ItemType = {
  nombre: '',
  marca: '',
  tipo: '',
  precio: 0,
};

function Dashboard() {
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
    fetch(`http://localhost:3030/addItem?nombre=${item.nombre}&marca=${item.marca}&tipo=${item.tipo}&precio=${item.precio}`)
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
      const response = await fetch('http://localhost:3030/getItems');
      const data = await response.json();
      setTableData(data.data);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  // Función para eliminar un producto de la base de datos
  async function handleDeleteItem(row: ItemType) {
    if (userData.userRol !== 'admin') {
      alert('No tienes permisos para eliminar datos.');
      return;
    }

    fetch(`http://localhost:3030/deleteItem?id=${row.id}`)
      .then(response => response.json())
      .then(response => {
        console.log('Lo que nos llega de la base de datos: ');
        console.log(response);
        if (response > 0) {
          alert('Datos eliminados con éxito');
          fetchData(); // Refresca los datos después de la eliminación
        } else {
          alert('Hubo un error al intentar eliminar los datos');
        }
      })
      .catch(error => {
        console.error('Error al eliminar el dato:', error);
        alert('Hubo un problema con la solicitud de eliminación.');
      });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    isItemAdded();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Box component="form" sx={{ padding: "50px", margin: "auto", maxWidth: 800, borderRadius: 2, boxShadow: 3, backgroundColor: "#f9f9f9" }} onSubmit={handleSubmit}>
        <Typography variant="h5" sx={{ textAlign: 'center', mb: 3, fontWeight: 'bold' }}>
          Ingresar Producto
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
              label="Marca"
              name="marca"
              value={item.marca}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              sx={{ backgroundColor: "#fff" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Tipo"
              name="tipo"
              value={item.tipo}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              sx={{ backgroundColor: "#fff" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Precio"
              name="precio"
              type="number"
              value={item.precio}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              sx={{ backgroundColor: "#fff" }}
            />
          </Grid>
          <Grid item xs={12}>
            <Tooltip title="Insertar los productos" arrow>
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ padding: '10px', fontSize: '16px' }}>
                Insertar Producto
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Box>

      <TableContainer sx={{ mt: 4, borderRadius: 2, boxShadow: 3 }}>
        <Table aria-label="tabla de productos">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
              <TableCell colSpan={6} sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                Lista de Productos
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell />
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Marca</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Tipo</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Precio</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row: ItemType) => (
              <TableRow key={row.id} sx={{ '&:nth-of-type(even)': { backgroundColor: '#f7f7f7' } }}>
                <TableCell>
                  {userData.userRol === 'admin' && (
                    
                    <Button color='secondary' onClick={() => handleDeleteItem(row)}>
                     <Tooltip title="Eliminar Registro" disableInteractive arrow>
                      <DeleteForeverIcon />
                      </Tooltip>
                    </Button>
                  )}
                </TableCell>

                <TableCell>{row.nombre}</TableCell>
                <TableCell>{row.marca}</TableCell>
                <TableCell>{row.tipo}</TableCell>
                <TableCell>{row.precio}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Dashboard;
