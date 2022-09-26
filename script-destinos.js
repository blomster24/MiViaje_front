
function seleccionardestinoB() {
    let ciudad = "BOGOTA"
    localStorage.setItem("ciudadSeleccion", ciudad)
    rellenoDatos()
}

function seleccionardestinoCR() {
    let ciudad = "CARTAGENA"
    localStorage.setItem("ciudadSeleccion", ciudad)
    rellenoDatos()
}

function seleccionardestinoM() {
    let ciudad = "MEDELLIN"
    localStorage.setItem("ciudadSeleccion", ciudad)
    rellenoDatos()
}

function seleccionardestinoSA() {
    let ciudad = "SAN ANDRES"
    localStorage.setItem("ciudadSeleccion", ciudad)
    rellenoDatos()
}

function seleccionardestinoC() {
    let ciudad = "CALI"
    localStorage.setItem("ciudadSeleccion", ciudad)
    rellenoDatos()
}

function seleccionardestinoSM() {
    let ciudad = "SANTA MARTA"
    localStorage.setItem("ciudadSeleccion", ciudad)
    rellenoDatos()
}
function seleccionardestinoBC() {
    let ciudad = "BARICHARA"
    localStorage.setItem("ciudadSeleccion", ciudad)
    rellenoDatos()
}
function seleccionardestinoL() {
    let ciudad = "LETICIA"
    localStorage.setItem("ciudadSeleccion", ciudad)
    rellenoDatos()
}
// ::: RELLENAR FORMULARIO CUANDO NO SE ENTRA DESDE LA PESTAÑA DESTINOS O CARD BANNER :::
function rellenoDatos(){
    let n = 1
    let h = 2
    localStorage.setItem("numeroAdultos", h)
    localStorage.setItem("numeroHabitaciones", n)
    let fechaHoy = new Date().toISOString().slice(0, 10)
    localStorage.setItem("fechaCheckIn", fechaHoy)
    localStorage.setItem("fechaCheckOut", fechaHoy)

}


// ::: ESTABLECER FECHAS ACTUALES Y MINIMAS CHECK IN - CHEKC OUT :::
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
    document.getElementById('infoOUT').min = ano + "-" + mes + "-" + dia;
    document.getElementById('infoIN').min = ano + "-" + mes + "-" + dia;
    document.getElementById("infoOUT").value = new Date().toISOString().slice(0, 10)
    document.getElementById("infoIN").value = new Date().toISOString().slice(0, 10)
   
}

// :::: GUARDAR INFORMACION LOCALSTORAGE - PASAR A OTRO HTML ::::
function passInformacion() {
    let fechaIN = document.getElementById('infoIN').value;
    localStorage.setItem("fechaCheckIn", fechaIN); // Guardando en el localStorage la fecha del checkIn
    let fechaOUT = document.getElementById('infoOUT').value;
    localStorage.setItem("fechaCheckOut", fechaOUT); // Guardando en el localStorage la fecha del checkOut
    let destinoSelec = document.getElementById('ciudad').value;
    localStorage.setItem("ciudadSeleccion", destinoSelec); // Guardando en el localStorage la ciudad
    let adultosSelec = document.getElementById('numero_adultos_destinos').value;
    localStorage.setItem("numeroAdultos", adultosSelec); // Guardando en el localStorage la num Huespedes
    let habSelec = document.getElementById('numero_hab_destinos').value;
    localStorage.setItem("numeroHabitaciones", habSelec);
    return true;
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// FUNCIONES BARRA DE BUSQUEDA
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function funcionBuscar() {
    // Validando que las fechas del checkOut no sea antes del checkIN
    if (document.getElementById('ciudad').value == "BARRANQUILLA") {
        document.location.href = "destino-seleccionado.html", true;
    } else if (document.getElementById('ciudad').value == "BARICHARA") {
         document.location.href = "destino-seleccionado.html", true;
    } else if (document.getElementById('ciudad').value == "BOGOTA") {
        if (document.getElementById('infoIN').value > document.getElementById('infoOUT').value) {
            mostrarModalFechas()
            }else if(document.getElementById('numero_hab_destinos').value > document.getElementById('numero_adultos_destinos').value){
                if(localStorage.getItem("decision") == false || localStorage.getItem("decision") == undefined){
                    mostrarModalHabitaciones()  
                } else{
                    window.location.href = "destino-seleccionado.html", true;
                }
            }else if(localStorage.getItem("HUEvsHAB") == 1 ){
                    window.location.href = "destino-seleccionado.html", true;
            } 

    } else if (document.getElementById('ciudad').value == "CALI") {
        document.location.href = "destinos.html", true;
    } else if (document.getElementById('ciudad').value == "CARTAGENA") {
        if (document.getElementById('infoIN').value > document.getElementById('infoOUT').value) {
            mostrarModalFechas()
            }else if(document.getElementById('numero_hab_destinos').value > document.getElementById('numero_adultos_destinos').value){
                if(localStorage.getItem("decision") == false || localStorage.getItem("decision") == undefined){
                    mostrarModalHabitaciones()  
                } else{
                    window.location.href = "destino-seleccionado.html", true;
                }
            }else if(localStorage.getItem("HUEvsHAB") == 1 ){
                    window.location.href = "destino-seleccionado.html", true;
            } 
    } else if (document.getElementById('ciudad').value == "MEDELLIN") {
        document.location.href = "destino-seleccionado.html", true;       
    } else if (document.getElementById('ciudad').value == "SAN ANDRES") {
        document.location.href = "destino-seleccionado.html", true;
    } else if (document.getElementById('ciudad').value == "SANTA MARTA") {
        document.location.href = "destino-seleccionado.html", true;
    } else if (document.getElementById('ciudad').value == "LETICIA") {
        document.location.href = "destino-seleccionado.html", true;
    } else {
        mostrarModalDestino() // Modal seleccionar Destino
    }
    passInformacion() //Ejecutamos la funcion de guardar información para luego utilizarla en los otros html
    localStorage.removeItem("decision")
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

let decision = ""
function aceptar() {
    decision = true
    localStorage.setItem("decision", decision)
    CerrarModal3()
    window.location.href = "destino-seleccionado.html", true;
    let e = 1;
    localStorage.setItem("HUEvsHAB",e)
    
    
}
function cancelar() {
    decision = false
    localStorage.setItem("decision", decision)
    alert("Entonces cambie las habitaciones");
    CerrarModal3()
    window.location.href = "destinos.html"
}
function vs(){
    if(document.getElementById("numero_adultos_destinos").value >= document.getElementById("numero_hab_destinos").value){
        let HueFlag = 1;
        localStorage.setItem("HUEvsHAB", HueFlag)
    }else{
        let HueFlag = 2;
        localStorage.setItem("HUEvsHAB", HueFlag)
        
    } 
}
//+++++++++++++++++++++++++++++++++
// :::: LLAMADO DE FUNCIONES :::::
//+++++++++++++++++++++++++++++++++

verificarFechaIN()
vs()
localStorage.removeItem("decision")