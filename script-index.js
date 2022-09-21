// Función para obtener el valor del select de ciudad
let select = document.getElementById('ciudad');
select.addEventListener('change', function sel(event) {
    console.log(event.target.value)
})

// Condicional para formulario de busqueda
function funcionBuscar22() {
    // Validando que las fechas del checkOut no sea antes del checkIN
    if (document.getElementById('fechaIN').value > document.getElementById('fechaOut').value) {
        mostrarModalFechas()
    } else {
        if (document.getElementById('ciudad').value == "BARRANQUILLA") {
            document.location.href = "destinos.html", true;
        } else if (document.getElementById('ciudad').value == "BARICHARA") {
            document.location.href = "destinos.html", true;
        } else if (document.getElementById('ciudad').value == "BOGOTA") {
            document.location.href = "bogota.html";
        } else if (document.getElementById('ciudad').value == "CALI") {
            document.location.href = "destinos.html", true;
        } else if (document.getElementById('ciudad').value == "CARTAGENA") {
            document.location.href = "destinos.html", true;
        } else if (document.getElementById('ciudad').value == "SAN ANDRES") {
            document.location.href = "destinos.html", true;
        } else if (document.getElementById('ciudad').value == "SANTA MARTA") {
            document.location.href = "destinos.html", true;
        } else if (document.getElementById('ciudad').value == "LETICIA") {
            document.location.href = "destinos.html", true;
        } else {
            mostrarModalDestino() // Modal seleccionar Destino
        }
        passInformacion() //Ejecutamos la funcion de guardar información para luego utilizarla en los otros html
    }
    // Validando que el numero de habitaciones sea menor o igual al numero de huespedes
    let result = false;
    if (document.getElementById('numHab').value > document.getElementById('numAdult').value) {
        result = window.confirm("El número de habitaciones es mayor al número de huespedes,¿Esta seguro que desea reservar ese numero de habitaciones?")
        alert(result)
        if (result == false) {
            alert("Entonces cambie las habitaciones");
        

        }
    }
};



// Funcion para guardar y pasar información de un html a otro
function passInformacion() {
    let fechaIN = document.getElementById('fechaIN').value;
    localStorage.setItem("fechaCheckIn", fechaIN); // Guardando en el localStorage la fecha del checkIn
    let fechaOUT = document.getElementById('fechaOut').value;
    localStorage.setItem("fechaCheckOut", fechaOUT); // Guardando en el localStorage la fecha del checkOut
    let destinoSelec = document.getElementById('ciudad').value;
    localStorage.setItem("ciudadSeleccion", destinoSelec); // Guardando en el localStorage la ciudad
    let adultosSelec = document.getElementById('numAdult').value;
    localStorage.setItem("numeroAdultos", adultosSelec); // Guardando en el localStorage la num Huespedes
    let habSelec = document.getElementById('numHab').value;
    localStorage.setItem("numeroHabitaciones", habSelec);
    return true;
}

// Funcion para establcer la fecha del Check In y no permitir escoger una fecha anterior
function verificarFechaIN() {
    let fecha = new Date(); //Fecha actual
    let mes = fecha.getMonth() + 1; //obteniendo mes
    let dia = fecha.getDate(); //obteniendo dia
    let ano = fecha.getFullYear(); //obteniendo año
    if (dia < 10)
        dia = '0' + dia; //agrega cero si el menor de 10
    if (mes < 10)
        mes = '0' + mes //agrega cero si el menor de 10
    let fechaHoy = ano + "-" + mes + "-" + dia;
    document.getElementById('fechaIN').min = ano + "-" + mes + "-" + dia;
    document.getElementById('fechaOut').min = ano + "-" + mes + "-" + dia;
    document.getElementById('fechaIN').value = fechaHoy;
    document.getElementById('fechaOut').value = fechaHoy;
}
// Funcion para limpiar el localStorage
function clearStorage() {
    localStorage.clear();
}

// Funcion para iniciar funciones que necesitemos al iniciar la pagina
function ejecutarAlCargarPagina() {
    verificarFechaIN();
    clearStorage();
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// FUNCIONES PARA MODALES 
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function mostrarModalDestino() {
    document.getElementById('openModal').style.display = 'block';
}

function mostrarModalFechas() {
    document.getElementById('openModal2').style.display = 'block';
}

function CerrarModal() {
    document.getElementById('openModal').style.display = 'none';
}

function CerrarModal2() {
    document.getElementById('openModal2').style.display = 'none';
}


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// LLAMADA DE FUNCION
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
window.onload = ejecutarAlCargarPagina;
CerrarModal()
CerrarModal2()

function funcionBuscar() {

    // Validando que las fechas del checkOut no sea antes del checkIN
    if (document.getElementById('fechaIN').value > document.getElementById('fechaOut').value) {
        mostrarModalFechas()
    } else {
        if (document.getElementById('ciudad').value == "BARRANQUILLA") {
            document.location.href = "destinos.html", true;
        } else if (document.getElementById('ciudad').value == "BARICHARA") {
            document.location.href = "destinos.html", true;
        } else if (document.getElementById('ciudad').value == "BOGOTA") {
            document.location.href = "bogota.html", true;
        } else if (document.getElementById('ciudad').value == "CALI") {
            document.location.href = "destinos.html", true;
        } else if (document.getElementById('ciudad').value == "CARTAGENA") {
            document.location.href = "destinos.html", true;
        } else if (document.getElementById('ciudad').value == "SAN ANDRES") {
            document.location.href = "destinos.html", true;
        } else if (document.getElementById('ciudad').value == "SANTA MARTA") {
            document.location.href = "destinos.html", true;
        } else if (document.getElementById('ciudad').value == "LETICIA") {
            document.location.href = "destinos.html", true;
        } else {
            mostrarModalDestino() // Modal seleccionar Destino
        }
        passInformacion() //Ejecutamos la funcion de guardar información para luego utilizarla en los otros html
    }
    // Validando que el numero de habitaciones sea menor o igual al numero de huespedes
    let result;
    if (document.getElementById('numHab').value > document.getElementById('numAdult').value) {
        result = window.confirm("El número de habitaciones es mayor al número de huespedes,¿Esta seguro que desea reservar ese numero de habitaciones?")
        alert(result)
        if (result == false) {
            alert("Entonces cambie las habitaciones");
           


        }


    }
}
