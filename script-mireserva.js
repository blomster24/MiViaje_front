function get_data_form(evt) {
    // Indicar que no recarge página al enviar el formulario
    evt.preventDefault()
    const form = evt.target
    let tipoDocu = form.tipoDocumento.value
    localStorage.setItem("tipoDocumento",tipoDocu)

    let numDocu = form.numeroDocumento.value
    localStorage.setItem("numeroDocumento", numDocu)

    let numtoken = form.token.value
    localStorage.setItem("token", numtoken)

    let flag2 = true
    localStorage.setItem("flag2",flag2)
    const reserva = {
        tipoDocumento:form.numeroDocumento.value,
        numeroDocumento: form.numeroDocumento.value,
        token: form.token.value  
    }
    limpiar_formulario()
    return reserva 
}

// Funcion para limpiar el localStorage
function clearStorage() {
    localStorage.clear();
}

function verificacion(){
    if(document.getElementById("numeroDocumento").value != "" && document.getElementById("token").value != ""){
        window.location.href = 'mireserva_resultado.html'
    }
}

window.onload = clearStorage;

function limpiar_formulario(){
    document.getElementById("numeroDocumento").value = ""
    document.getElementById("token").value = ""
    clearStorage
}
