export const validationsForm = (form) => {
    let errores = {};
    
    // Regex patterns
    let regexText100 = /^.{1,100}$/;
    let regexText255 = /^.{1,255}$/;
    let regexNumber = /^\d+$/;
    let regexDecimal = /^\d+(\.\d{1,2})?$/;

    // Validación de Nombre
    if (!form.nombre) {
        errores.nombre = "El campo nombre es requerido.";
    } else if (!regexText100.test(form.nombre.trim())) {
        errores.nombre = "El nombre acepta hasta 100 caracteres.";
    } else {
        errores.nombre = "";
    }

    // Validación de Descripción
    if (!form.descripcion) {
        errores.descripcion = "El campo descripción es requerido.";
    } else if (!regexText255.test(form.descripcion.trim())) {
        errores.descripcion = "La descripción acepta hasta 255 caracteres.";
    } else {
        errores.descripcion = "";
    }

    // Validación de Cantidad
    if (!form.cantidad) {
        errores.cantidad = "El campo cantidad es requerido.";
    } else if (!regexNumber.test(form.cantidad.toString())) {
        errores.cantidad = "La cantidad debe ser un número entero.";
    } else if (parseInt(form.cantidad) < 0) {
        errores.cantidad = "La cantidad no puede ser negativa.";
    } else if (parseInt(form.cantidad) > 999999) {
        errores.cantidad = "La cantidad no puede ser mayor a 999,999.";
    } else {
        errores.cantidad = "";
    }

    // Validación de Estado
    if (form.estado === undefined || form.estado === null || form.estado === "") {
        errores.estado = "El campo estado es requerido.";
    } else if (![1, 2].includes(parseInt(form.estado))) {
        errores.estado = "El estado debe ser 1 (Activo) o 2 (Inactivo).";
    } else {
        errores.estado = "";
    }

    // Validación de Categoría
    if (!form.categoria) {
        errores.categoria = "El campo categoría es requerido.";
    } else if (!regexNumber.test(form.categoria.toString())) {
        errores.categoria = "La categoría debe ser un número válido.";
    } else if (parseInt(form.categoria) <= 0) {
        errores.categoria = "Debe seleccionar una categoría válida.";
    } else {
        errores.categoria = "";
    }

    return errores;
};

const ArticuloForm = {
    validationsForm,
  };
  
  export default ArticuloForm;
