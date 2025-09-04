export const validationsForm = (form) => {
    let errores = {};
    
    // Regex patterns
    let regexText255 = /^.{1,255}$/;
    let regexNumber = /^\d+$/;

    // Validación de Artículo
    if (!form.articulo) {
        errores.articulo = "Debe seleccionar un artículo.";
    } else if (!regexNumber.test(form.articulo.toString())) {
        errores.articulo = "El artículo debe ser un número válido.";
    } else {
        errores.articulo = "";
    }

    // Validación de Característica
    if (!form.caracteristica) {
        errores.caracteristica = "Debe seleccionar una característica.";
    } else if (!regexNumber.test(form.caracteristica.toString())) {
        errores.caracteristica = "La característica debe ser un número válido.";
    } else {
        errores.caracteristica = "";
    }

    // Validación de Valor
    if (!form.valor) {
        errores.valor = "El campo valor es requerido.";
    } else if (!regexText255.test(form.valor.trim())) {
        errores.valor = "El valor acepta hasta 255 caracteres.";
    } else {
        errores.valor = "";
    }

    return errores;
};

const ArticuloCaracteristicaForm = {
    validationsForm,
  };
  
  export default ArticuloCaracteristicaForm;
