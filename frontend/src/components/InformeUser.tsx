import '../App.css';
import React from 'react';
import MaterialTable from '@material-table/core';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import Box from '@mui/material/Box';

function InformeUser({ datos }: { datos: any[] }) {

  const summaryRow = {
    nombre: '',
    login: '',
    password: '',

  };

  return (
    <>
      <Box sx={{ padding: 4 }}>
        <MaterialTable
          title="Informe de Usuario"
          columns={[
            {
              title: 'Nombre',
              field: 'nombre',
              filtering: true,
              cellStyle: {
                backgroundColor: '#FFFFFF',
                color: '#000000',
              },
              headerStyle: {
                backgroundColor: '#ff0000',
              },
            },
            {
              title: 'Login',
              field: 'login',
              filtering: false,
            },
            {
              title: 'Password',
              field: 'password',
              type: 'numeric',
              filtering: false,
            },
            {
              title: 'Rol',
              field: 'rol',
              filtering: false,
            },
          ]}
          data={[...datos, summaryRow]}
          options={{
            columnsButton: true,
            filtering: true,
            draggable: true,
            headerStyle: {
              backgroundColor: '#ff0000', 

              color: '#FFFFFF',
            },
            exportMenu: [
              {
                label: 'Exportar a CSV',
                exportFunc: (cols, data) => ExportCsv(cols, data, 'Informe_User'),
              },
              {
                label: 'Exportar a PDF',
                exportFunc: (cols, data) => ExportPdf(cols, data, 'Informe_User'),
              },
            ],
          }}
        />
      </Box>
    </>
  );
}

export default InformeUser;
