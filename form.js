const formulario = document.querySelector("#formulario");

//crear el evento
formulario.addEventListener( "submit", validarFormulario )


//mis funciones
function validarFormulario(e){
    e.preventDefault();
    const nombre = document.querySelector("#nombre").value
    const mail = document.querySelector("#Email").value

    const respuesta = document.getElementById("respuesta");
    respuesta.textContent = `Hola ${nombre} Nos vamos a estar comunicando para darte mas informacion a  ${mail}`
}



