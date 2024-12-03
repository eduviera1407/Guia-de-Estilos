import '../App.css';
import React from 'react';
import MaterialTable from '@material-table/core';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import Box from '@mui/material/Box';

function InformeColeccion({ datos }: { datos: any[] }) {

    return (
        <>
            <Box sx={{ padding: 4 }}>
                <MaterialTable
                    title="Informe de Colección"
                    columns={[
                        {
                            title: 'Nombre', field: 'nombre', filtering: false,
                            cellStyle: {
                                backgroundColor: '#FFFFFF', color: '#000000',
                            },
                            headerStyle: {
                                backgroundColor: '#ff0000',
                            },
                        },
                        {
                            title: 'Marca', field: 'marca', filtering: true
                        },
                        {
                            title: 'Tipo', field: 'tipo', filtering: true
                        },
                        {
                            title: 'Precio', field: 'precio', type: 'numeric', filtering: false
                        },
                    ]}
                    data={datos}
                    options={{
                        columnsButton: true, filtering: true, draggable: true,
                        headerStyle: {
                            backgroundColor: '#ff0000', color: '#FFFFFF',
                        },
                        exportMenu: [
                            {
                                label: 'Exportar a CSV',
                                exportFunc: (cols, data) => ExportCsv(cols, data, 'Informe_Coleccion'),
                            },
                            {
                                label: 'Exportar a PDF',
                                exportFunc: (cols, data) => ExportPdf(cols, data, 'Informe_Coleccion'),
                            },
                        ],
                    }}
                    renderSummaryRow={({ column, data }) =>
                        column.field === "precio"
                            ? {
                                value: data.reduce((total, row) => total + (row.precio || 0), 0),
                                style: { background: "#FFFFFF" },
                            }
                            : undefined
                    }
                />
            </Box>
        </>
    )
}

export default InformeColeccion