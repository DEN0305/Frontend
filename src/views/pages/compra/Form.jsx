import React, { useContext, useEffect, useState } from "react";
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col, Label } from "reactstrap";
  
import { Link, useParams } from "react-router-dom";
import ArticuloContext from "context/ArticuloContext";
import CategoriaContext from "context/CompraContext";
import ArticuloFormValidate from "../../../services/ArticuloForm";
import { useForm } from "hooks/useForm";
import Header from "components/Headers/Header";

const initialForm = {
    fecha: "",
    valor: "",
    proveedor: "",
    estado: "",
    categoria: "",
};

const Formulario = ( ) => {

    const { 
        detail:data, updateData, saveData, setModule, module, setToDetail,setDetail, 
        setToUpdate
    } = useContext(ArticuloContext);

    const { db: categorias } = useContext(CategoriaContext);

    const {
        validateInit,
        validate,
        form,
        errors,
        setValidateInit,
        setValidate,
        setForm,
        setErrors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = useForm(initialForm, ArticuloFormValidate.validationsForm);

    const { id } = useParams();

    useEffect(() => {
        if(id){
            setToDetail(id);
            setToUpdate(id);
            setModule("actualizar");
        }else{
            setModule("agregar");
        }
    },[]);

    useEffect(() => {
        if(data && Object.keys(data).length > 0) {
            const formData = {
                ...data,
                categoria: typeof data.categoria === 'object' ? data.categoria?.id : data.categoria,
                estado: data.estado !== undefined && data.estado !== null ? data.estado.toString() : ""
            };
            setForm(formData);
        }
        setErrors(initialForm);
    },[data]);
    
    const handleUpdate = (e) => {
        e.preventDefault();
        let valid = handleSubmit(e);
        if(valid){
            const formData = {
                nombre: form.nombre,
                descripcion: form.descripcion,
                cantidad: parseInt(form.cantidad),
                estado: parseInt(form.estado),
                categoria: {
                    id: parseInt(form.categoria)
                }
            };
            updateData(formData, form.id);
        }
    }

    const handleSave = (e) => {
        e.preventDefault();
        let valid = handleSubmit(e);
        if(valid){
            // Convertir valores a los tipos correctos y estructura esperada por el backend
            const formData = {
                nombre: form.nombre,
                descripcion: form.descripcion,
                cantidad: parseInt(form.cantidad),
                estado: parseInt(form.estado),
                categoria: {
                    id: parseInt(form.categoria)
                }
            };
            saveData(formData);
        }
    }

    // Funciones de restricción de entrada
    const handleNameInput = (e) => {
        const value = e.target.value;
        // Solo permite letras, números, espacios y caracteres especiales básicos
        const filteredValue = value.replace(/[^A-Za-z0-9ÑñÁáÉéÍíÓóÚúÜü\s\-_\.]/g, '');
        e.target.value = filteredValue;
        handleChange(e);
    }

    const handleQuantityInput = (e) => {
        const value = e.target.value;
        // Solo permite números
        const filteredValue = value.replace(/[^\d]/g, '');
        e.target.value = filteredValue;
        handleChange(e);
    }

    const handleDescriptionInput = (e) => {
        const value = e.target.value;
        // Permite letras, números, espacios y caracteres especiales básicos
        const filteredValue = value.replace(/[^A-Za-z0-9ÑñÁáÉéÍíÓóÚúÜü\s\-_\.\,\:\;]/g, '');
        e.target.value = filteredValue;
        handleChange(e);
    }

    return (
      <>
        <Header />
            <Container className="mt--7" fluid>
              <Row>
                <div className="col">
                  <Card className="shadow">
                    <CardHeader className="">
                      <div className="align-items-center row">
                        <div className="col-11">
                          <h3 className="mb-0">{module?.toUpperCase()} ARTÍCULO</h3>
                          <p className="text-sm mb-0">
                            Formulario de gestión de artículos
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <div className="pl-lg-4">
                            <Row>
                                <Col lg="6">
                                    <FormGroup>
                                        <label
                                        className="form-control-label"
                                        htmlFor="input-nombre"
                                        >
                                        Nombre <span className="text-danger">*</span>
                                        </label>
                                        <Input
                                        className="form-control"
                                        id="input-nombre"
                                        placeholder="Ej: Laptop Dell Inspiron"
                                        type="text"
                                        name="nombre"
                                        required="required"
                                        invalid={errors.nombre !== ""}
                                        onChange={handleNameInput}
                                        onBlur={handleBlur}
                                        value={form.nombre || ""}
                                        />
                                        <div className="invalid-feedback">
                                            {errors.nombre}
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="6">
                                    <FormGroup>
                                        <label
                                        className="form-control-label"
                                        htmlFor="input-cantidad"
                                        >
                                        Cantidad <span className="text-danger">*</span>
                                        </label>
                                        <Input
                                        className="form-control"
                                        id="input-cantidad"
                                        placeholder="Ej: 50"
                                        type="number"
                                        name="cantidad"
                                        min="0"
                                        max="999999"
                                        required="required"
                                        invalid={errors.cantidad !== ""}
                                        onChange={handleQuantityInput}
                                        onBlur={handleBlur}
                                        value={form.cantidad || ""}
                                        />
                                        <div className="invalid-feedback">
                                            {errors.cantidad}
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="12">
                                    <FormGroup>
                                        <label
                                        className="form-control-label"
                                        htmlFor="input-descripcion"
                                        >
                                        Descripción <span className="text-danger">*</span>
                                        </label>
                                        <Input
                                        className="form-control"
                                        id="input-descripcion"
                                        placeholder="Ej: Laptop para uso empresarial con procesador Intel i7"
                                        type="textarea"
                                        name="descripcion"
                                        rows="3"
                                        required="required"
                                        invalid={errors.descripcion !== ""}
                                        onChange={handleDescriptionInput}
                                        onBlur={handleBlur}
                                        value={form.descripcion || ""}
                                        />
                                        <div className="invalid-feedback">
                                            {errors.descripcion}
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="6">
                                    <FormGroup>
                                        <label
                                        className="form-control-label"
                                        htmlFor="input-estado"
                                        >
                                        Estado <span className="text-danger">*</span>
                                        </label>
                                        <Input
                                        className="form-control"
                                        id="input-estado"
                                        type="select"
                                        name="estado"
                                        required="required"
                                        invalid={errors.estado !== ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={form.estado || ""}
                                        >
                                        <option value="">Seleccione un estado</option>
                                        <option value="1">Activo</option>
                                        <option value="2">Inactivo</option>
                                        </Input>
                                        <div className="invalid-feedback">
                                            {errors.estado}
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="6">
                                    <FormGroup>
                                        <label
                                        className="form-control-label"
                                        htmlFor="input-categoria"
                                        >
                                        Categoría <span className="text-danger">*</span>
                                        </label>
                                        <Input
                                        className="form-control"
                                        id="input-categoria"
                                        type="select"
                                        name="categoria"
                                        required="required"
                                        invalid={errors.categoria !== ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={form.categoria || ""}
                                        >
                                        <option value="">Seleccione una categoría</option>
                                        {categorias.map((categoria) => (
                                            <option key={categoria.id} value={categoria.id}>
                                                {categoria.descripcion}
                                            </option>
                                        ))}
                                        </Input>
                                        <div className="invalid-feedback">
                                            {errors.categoria}
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="col justify-content-end">
                                {module == "actualizar" ? (
                                    <Button
                                        color="primary"
                                        href=""
                                        onClick={handleUpdate}
                                        >
                                        Actualizar
                                    </Button>
                                ) : (
                                    <Button
                                        color="primary"
                                        href=""
                                        onClick={handleSave}
                                        >
                                        Guardar 
                                    </Button>
                                )}
                                <Link
                                    className="btn btn-danger"
                                    color="default"
                                    to={"/admin/articulo"}
                                    >
                                    Cancelar
                                </Link>
                            </Row>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
                </div>
            </Row>
        </Container>
      </>
    );
  };

  export default Formulario;
