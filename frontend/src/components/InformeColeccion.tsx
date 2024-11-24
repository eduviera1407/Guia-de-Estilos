import React, { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";

interface Item {
  nombre: string;
  marca: string;
  tipo: string;
  precio: number;
}

function InformeColeccion() {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const col = [
    { title: "Nombre", field: "nombre" },
    { title: "Marca", field: "marca", filtering: true },
    { title: "Tipo", field: "tipo", filtering: true },
    { title: "Precio", field: "precio", type: "numeric" },
  ];

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3030/coleccion");
      const result = await response.json();
      console.log(result.data);
      setData(result.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalPrecio = data.reduce((sum, row) => sum + row.precio, 0);

  const dataConTotal = [
    ...data,
    {
      nombre: "TOTAL",
      marca: "",
      tipo: "",
      precio: totalPrecio,
    },
  ];

  return (
    <MaterialTable
      columns={col}
      data={dataConTotal}
      title="Informe de Productos"
      isLoading={loading}
      options={{
        exportMenu: [
          {
            label: "Exportar a PDF",
            exportFunc: (cols, datas) =>
              ExportPdf(cols, datas, "InformeProductos.pdf"),
          },
          {
            label: "Exportar a CSV",
            exportFunc: (cols, datas) =>
              ExportCsv(cols, datas, "InformeProductos.csv"),
          },
        ],
        filtering: true,
        columnsButton: true,
        draggable: true,
        headerStyle: {
          backgroundColor: " #ff0000 ",
          color: "white",
        },
        rowStyle: (rowData) =>
          rowData.nombre === "TOTAL"
            ? { backgroundColor: "#e0e0e0", fontWeight: "bold" }
            : {},
      }}
    />
  );
}

export default InformeColeccion;
