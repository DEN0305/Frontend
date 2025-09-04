export const validationsForm = (form) => {
    let errores = {};
    
    // Regex patterns
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let regexPhone = /^[\d\s\-\+\(\)]+$/;
    let regexText40 = /^.{1,40}$/;
    let regexText100 = /^.{1,100}$/;

    // Validación de Nombre
    if (!form.nombre) {
        errores.nombre = "El campo nombre es requerido.";
    } else if (!regexName.test(form.nombre.trim())) {
        errores.nombre = "El nombre solo puede contener letras y espacios.";
    } else if (!regexText40.test(form.nombre.trim())) {
        errores.nombre = "El nombre acepta hasta 40 caracteres.";
    } else {
        errores.nombre = "";
    }

    // Validación de Dirección
    if (!form.direccion) {
        errores.direccion = "El campo dirección es requerido.";
    } else if (!regexText100.test(form.direccion.trim())) {
        errores.direccion = "La dirección acepta hasta 100 caracteres.";
    } else {
        errores.direccion = "";
    }

    // Validación de Teléfono
    if (!form.telefono) {
        errores.telefono = "El campo teléfono es requerido.";
    } else if (!regexPhone.test(form.telefono.trim())) {
        errores.telefono = "El teléfono solo puede contener números, espacios, guiones, paréntesis y el símbolo +.";
    } else if (form.telefono.replace(/\D/g, '').length < 7) {
        errores.telefono = "El teléfono debe tener al menos 7 dígitos.";
    } else if (form.telefono.replace(/\D/g, '').length > 15) {
        errores.telefono = "El teléfono no puede tener más de 15 dígitos.";
    } else {
        errores.telefono = "";
    }

    // Validación de Correo
    if (!form.correo) {
        errores.correo = "El campo correo es requerido.";
    } else if (!regexEmail.test(form.correo.trim())) {
        errores.correo = "El formato del correo electrónico no es válido.";
    } else if (!regexText40.test(form.correo.trim())) {
        errores.correo = "El correo acepta hasta 40 caracteres.";
    } else {
        errores.correo = "";
    }

    return errores;
};

const ClienteForm = {
    validationsForm,
  };
  
  export default ClienteForm;
