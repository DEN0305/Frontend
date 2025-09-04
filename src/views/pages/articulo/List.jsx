import React, { useContext, useEffect, useState } from "react";
import ArticuloContext from "../../../context/ArticuloContext";
import CategoriaContext from "../../../context/CategoriaContext";
import Header from "components/Headers/Header.js";
import { Card, CardHeader, CardBody, Container, Row, Badge } from "reactstrap";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { FormGroup, Label, Input, Button } from "reactstrap";
import ReactBSAlert from "react-bootstrap-sweetalert";

function List({ tab }) {

  const { 
    db:data, setDetail,  setToDetail, setToUpdate, setViewModal, setModule, deleteData
  } = useContext(ArticuloContext);

  const { db: categorias } = useContext(CategoriaContext);

  const [filter, setFilter] = useState("");

  const[state, setState] = useState({});
  const[idDelete, setIdDelete] = useState();

  // Función para obtener el nombre de la categoría
  const getCategoriaName = (categoria) => {
    // Manejar tanto objeto {id: valor} como número directo
    const categoriaId = typeof categoria === 'object' ? categoria?.id : categoria;
    const categoriaEncontrada = categorias.find(cat => cat.id === categoriaId);
    return categoriaEncontrada ? categoriaEncontrada.descripcion : 'Sin categoría';
  };

  // Función para obtener el estado como texto
  const getEstadoText = (estado) => {
    return estado === 1 ? 'Activo' : estado === 2 ? 'Inactivo' : 'Desconocido';
  };

  // Función para obtener el color del badge del estado
  const getEstadoColor = (estado) => {
    return estado === 1 ? 'success' : estado === 2 ? 'danger' : 'secondary';
  };

  const filteredData = data.filter(item =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(filter.toLowerCase())
  );

  const columns = [
    { 
      name: "ID", 
      selector: row => row.id, 
      sortable: true,
      width: "80px"
    },
    { 
      name: "Nombre", 
      selector: row => row.nombre, 
      sortable: true,
      width: "200px"
    },
    { 
      name: "Descripción", 
      selector: row => row.descripcion, 
      sortable: true,
      width: "250px",
      cell: row => (
        <div style={{ 
          maxWidth: '200px', 
          overflow: 'hidden', 
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {row.descripcion}
        </div>
      )
    },
    { 
      name: "Cantidad", 
      selector: row => row.cantidad, 
      sortable: true,
      width: "100px",
      center: "true"
    },
    { 
      name: "Estado", 
      selector: row => row.estado, 
      sortable: true,
      width: "100px",
      center: "true",
      cell: row => (
        <Badge color={getEstadoColor(row.estado)}>
          {getEstadoText(row.estado)}
        </Badge>
      )
    },
    { 
      name: "Categoría", 
      selector: row => getCategoriaName(row.categoria), 
      sortable: true,
      width: "150px"
    },
    { 
      name: "Acciones", 
      cell: row => (
        <> 
        <Link className='btn btn-sm'
              color="primary"
              to={"/admin/articulo/detail/"+row.id}
              style={{
                backgroundColor: '#6A6AFB',
                borderColor: '#6A6AFB',
                color: 'white',
                fontWeight: 'bold',
                textDecoration: 'none',
                marginRight: '5px'
              }}
          >
          Detallar
          </Link>
        <Button
              className='btn btn-sm'
              onClick={e => handleDelete(e, row.id)}
              style={{
                backgroundColor: '#F83F61',
                borderColor: '#F83F61',
                color: 'white',
                fontWeight: 'bold'
              }}
          >
              Eliminar
        </Button>
        </>
      )
    }
  ];

  const confirmAlert = (id) => {
    setState({
      alert: (
        <ReactBSAlert
          warning
          style={{ display: "block" }}
          title="¿Estás seguro?"
          onCancel={() => hideAlert()}
          onConfirm={() => {setIdDelete(id); hideAlert();}}
          showCancel
          confirmBtnBsStyle="primary"
          confirmBtnText="Si, Eliminarlo!"
          cancelBtnBsStyle="danger"
          cancelBtnText="Cancelar"
          btnSize=""
        >
          No podrás revertir esto!
        </ReactBSAlert>
      )
    });
  };

  const hideAlert = () => {
    setState({
      alert: null
    });
  };
                
  useEffect(() => {
    setDetail({});
    setToUpdate(0);
  },[]);

  useEffect(() => {
    if(idDelete){
      deleteData(idDelete);
    }
  },[idDelete]);

  const handleDelete = (e, id) => {
    e.preventDefault();
    confirmAlert(id);
  }

  return (
    <>
    {state.alert}
    <Header brandText="Artículos" />
    <Container className="mt--7" fluid>
      <Row>
        <div className="col">
          <Card className="shadow">
            <CardHeader className="">
              <div className="align-items-center row">
                <div className="col-11">
                  <h3 className="mb-0">Artículos</h3>
                  <p className="text-sm mb-0">
                    Listado de artículos registrados en el sistema
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <FormGroup>
                <Label for="buscar">Buscar</Label>
                <Input
                  id="buscar"
                  type="text"
                  placeholder="Buscar..."
                  value={filter}
                  onChange={e => setFilter(e.target.value)}
                />
              </FormGroup>
              <DataTable
                columns={columns}
                data={filteredData}
                pagination
                highlightOnHover
                responsive
                noDataComponent="No hay artículos registrados"
              />
              <div className="m-3">
                <Link 
                  className='btn btn-primary'
                  color="primary"
                  to={"add"}
                >
                  Agregar Artículo
                </Link>
              </div>
            </CardBody>
          </Card>
        </div>
      </Row>
    </Container>
    </>
  );
}

export default List;
