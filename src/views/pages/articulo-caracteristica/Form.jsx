import React, { useContext, useEffect, useState } from "react";
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col } from "reactstrap";
  
import { Link, useParams } from "react-router-dom";
import ArticuloCaracteristicaContext from "context/ArticuloCaracteristicaContext";
import ArticuloContext from "context/ArticuloContext";
import CaracteristicaContext from "context/CaracteristicaContext";
import ArticuloCaracteristicaFormValidate from "../../../services/ArticuloCaracteristicaForm";
import { useForm } from "hooks/useForm";
import Header from "components/Headers/Header";

const initialForm = {
    articulo: "",
    caracteristica: "",
    valor: "",
};

const Formulario = ( ) => {

    const { 
        detail:data, updateData, saveData, setModule, module, setToDetail,setDetail, 
        setToUpdate
    } = useContext(ArticuloCaracteristicaContext);

    const { db: articulos } = useContext(ArticuloContext);
    const { db: caracteristicas } = useContext(CaracteristicaContext);

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
    } = useForm(initialForm, ArticuloCaracteristicaFormValidate.validationsForm);

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
        setForm(data);
        setErrors(initialForm);
    },[data]);
    
    const handleUpdate = (e) => {
        e.preventDefault();
        let valid = handleSubmit(e);
        if(valid){
            updateData(form);
        }
    }

    const handleSave = (e) => {
        e.preventDefault();
        let valid = handleSubmit(e);
        if(valid){
            saveData(form);
        }
    }

    // Función de restricción de entrada para valor
    const handleValueInput = (e) => {
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
                          <h3 className="mb-0">{module?.toUpperCase()} CARACTERÍSTICA DE ARTÍCULO</h3>
                          <p className="text-sm mb-0">
                            Asigna características específicas a los artículos
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
                                        htmlFor="input-articulo"
                                        >
                                        Seleccionar Artículo <span className="text-danger">*</span>
                                        </label>
                                        <Input
                                        className="form-control"
                                        id="input-articulo"
                                        type="select"
                                        name="articulo"
                                        required="required"
                                        invalid={errors.articulo !== ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        defaultValue={data.articulo}
                                        >
                                        <option value="">Seleccione un artículo</option>
                                        {articulos.map((articulo) => (
                                            <option key={articulo.id} value={articulo.id}>
                                                {articulo.nombre}
                                            </option>
                                        ))}
                                        </Input>
                                        <div className="invalid-feedback">
                                            {errors.articulo}
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="6">
                                    <FormGroup>
                                        <label
                                        className="form-control-label"
                                        htmlFor="input-caracteristica"
                                        >
                                        Seleccionar Característica <span className="text-danger">*</span>
                                        </label>
                                        <Input
                                        className="form-control"
                                        id="input-caracteristica"
                                        type="select"
                                        name="caracteristica"
                                        required="required"
                                        invalid={errors.caracteristica !== ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        defaultValue={data.caracteristica}
                                        >
                                        <option value="">Seleccione una característica</option>
                                        {caracteristicas.map((caracteristica) => (
                                            <option key={caracteristica.id} value={caracteristica.id}>
                                                {caracteristica.descripcion}
                                            </option>
                                        ))}
                                        </Input>
                                        <div className="invalid-feedback">
                                            {errors.caracteristica}
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="12">
                                    <FormGroup>
                                        <label
                                        className="form-control-label"
                                        htmlFor="input-valor"
                                        >
                                        Valor <span className="text-danger">*</span>
                                        </label>
                                        <Input
                                        className="form-control"
                                        id="input-valor"
                                        placeholder="Ej: Rojo, 15cm, Intel i5, Samsung, etc."
                                        type="text"
                                        name="valor"
                                        required="required"
                                        invalid={errors.valor !== ""}
                                        onChange={handleValueInput}
                                        onBlur={handleBlur}
                                        defaultValue={data.valor}
                                        />
                                        <div className="invalid-feedback">
                                            {errors.valor}
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
                                    to={"/admin/articulo-caracteristica"}
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
