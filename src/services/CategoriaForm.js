export const validationsForm = (form) => {
    let errores = {};
    
    // Regex patterns
    let regexText100 = /^.{1,100}$/;

    // Validación de Descripción
    if (!form.descripcion) {
        errores.descripcion = "El campo descripción es requerido.";
    } else if (!regexText100.test(form.descripcion.trim())) {
        errores.descripcion = "La descripción acepta hasta 100 caracteres.";
    } else {
        errores.descripcion = "";
    }

    return errores;
};

const CategoriaForm = {
    validationsForm,
  };
  
  export default CategoriaForm;
