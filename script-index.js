// Función para obtener el valor del select de ciudad
let select = document.getElementById('ciudad');
select.addEventListener('change', function sel(event) {
    console.log(event.target.value)
})

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
    vs() 
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// FUNCIONES PARA MODALES 
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function mostrarModalDestino() {
    document.getElementById('openModal').style.display = 'block';
}

function CerrarModal() {
    document.getElementById('openModal').style.display = 'none';
}

function mostrarModalFechas() {
    document.getElementById('openModal2').style.display = 'initial';
}

function CerrarModal2() {
    document.getElementById('openModal2').style.display = 'none';
}

function mostrarModalHabitaciones() {
    document.getElementById('openModal3').style.display = 'block';
    vs() 
}

function CerrarModal3() {
    document.getElementById('openModal3').style.display = 'none';
}

//:::::: BANDERA ::::::::


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// LLAMADA DE FUNCION
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
window.onload = ejecutarAlCargarPagina;
CerrarModal()
CerrarModal2()
let decision = ""
function aceptar() {
    decision = true
    localStorage.setItem("decision", decision)
    CerrarModal3()
    window.location.href = "bogota.html", true;
    localStorage.removeItem('HUEvsHAB');
    localStorage.removeItem('decision');
    
    
}
function cancelar() {
    decision = false
    localStorage.setItem("decision", decision)
    alert("Entonces cambie las habitaciones");
    CerrarModal3()
    window.location.href = "index.html"
}


function vs(){
    if(document.getElementById("numAdult").value >= document.getElementById("numHab").value){
        let HueFlag = 1;
        localStorage.setItem("HUEvsHAB", HueFlag)
    }else{
        let HueFlag = 2;
        localStorage.setItem("HUEvsHAB", HueFlag)
        
    } 
}

function creacion(){
    let n = 1
    localStorage.setItem("numeroAdultos",n)
    localStorage.setItem("numeroHabitaciones",n)
    let fechaHoy = new Date().toISOString().slice(0, 10)
    localStorage.setItem("fechaCheckIn",fechaHoy)
    localStorage.setItem("fechaCheckOut",fechaHoy)
    let ciudad = "BOGOTA"
    localStorage.setItem("ciudadSeleccion", ciudad)
}

function funcionBuscar() {
    // Validando que las fechas del checkOut no sea antes del checkIN
    if (document.getElementById('ciudad').value == "BARRANQUILLA") {
        document.location.href = "bogota.html", true;
    } else if (document.getElementById('ciudad').value == "BARICHARA") {
         document.location.href = "bogota.html", true;
    } else if (document.getElementById('ciudad').value == "BOGOTA") {
        if (document.getElementById('fechaIN').value > document.getElementById('fechaOut').value) {
            mostrarModalFechas()
            }else if(document.getElementById('numHab').value > document.getElementById('numAdult').value){
                mostrarModalHabitaciones()  
            }else if(localStorage.getItem("HUEvsHAB") == 1 ){
                    window.location.href = "bogota.html", true;
            } 
    } else if (document.getElementById('ciudad').value == "CALI") {
        document.location.href = "destinos.html", true;
    } else if (document.getElementById('ciudad').value == "CARTAGENA") {
        if (document.getElementById('fechaIN').value > document.getElementById('fechaOut').value) {
            mostrarModalFechas()
            }else if(document.getElementById('numHab').value > document.getElementById('numAdult').value){
                mostrarModalHabitaciones()  
            }else if(localStorage.getItem("HUEvsHAB") == 1 ){
                    window.location.href = "bogota.html", true;
            } 
    } else if (document.getElementById('ciudad').value == "SAN ANDRES") {
        document.location.href = "bogota.html", true;
    } else if (document.getElementById('ciudad').value == "SANTA MARTA") {
        document.location.href = "bogota.html", true;
    } else if (document.getElementById('ciudad').value == "LETICIA") {
        document.location.href = "bogota.html", true;
    } else {
        mostrarModalDestino() // Modal seleccionar Destino
    }
    passInformacion() //Ejecutamos la funcion de guardar información para luego utilizarla en los otros html
}
    

