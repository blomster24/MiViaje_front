// document.getElementById('infoIN').value = localStorage.getItem("fechaCheckIn");
let adulnum_seleccionado = ""
    switch (localStorage.getItem("numeroAdultos")) {
        case '1':
            adulnum_seleccionado = "1 ADULTO"
            break;
        case '2':
            adulnum_seleccionado = "2 ADULTOS"
            break;
        case '3':
            adulnum_seleccionado = "3 ADULTOS"
            break;
        case '4':
            adulnum_seleccionado = "4 ADULTOS"
            break;
    }
let habnum_seleccionado = ""   
    switch (localStorage.getItem("numeroHabitaciones")) {
        case '1':
            habnum_seleccionado = "1 HABITACION"
            break;
        case '2':
            habnum_seleccionado = "2 HABITACIONES"
            break;
        case '3':
            habnum_seleccionado = "3 HABITACIONES"
            break;
        case '4':
            habnum_seleccionado = "4 HABITACIONES"
            break; 
           }

async function obtenerHoteles(url) {
    const respuesta = await fetch(url)
    const hoteles = await respuesta.json()
    return hoteles
}

const fechaHoy_3 = new Date().toISOString().slice(0, 10)
function hoteles_disponibles(hoteles) {
    
    const cardHotelDisponible = document.getElementById('hoteldisponible')
    let section = "<div>"
    for (let i = 0; i < hoteles.length; i++) {
        const h = hoteles[i]
        section += ` 
                <section class="cajaHotelPrincipal">
                <section class="caja1">
                    <section class="informacion">
                        <div class="cajaText">
                            <p class="txtHRC">${h.nombreHotel}</p>
                            <div class ="beneficios_hotel">
                                <div class="check"><img src="Image/Check.svg"></div>
                                <div class="check2"><img src="Image/Check.svg"></div>
                                <div class="desc">
                                    <p class="text2">Beneficios de MiViaje.com</p>
                                    <p class="text3">Cancelacion Gratuita</p>
                                    <p class="text5">Pago en efectivo en el hotel</p>
                                    <div class="precio">
                                        <p class = "txtprecio"><span style ="font-size:20px; font-weight: 400;">$</span>${(h.costoHabitacion * 1).toLocaleString('de-DE')} <span class = "txtprecio2" >por noche</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    <div class = "division_card"></div>
                    <section class="informacion2">
                    
                        <div class = fechas_seleccionadas>
                            <section class="checkIn">  
                                <div class="datosCheckIN"  >
                                    <p style ="color: #E48D36;" >Check In</p>
                                    <p class = "fecha_destino_selecionado" style ="font-weight: 800;">${localStorage.getItem("fechaCheckIn")}</p>
                                </div>
                            </section>
                            <section class="checkIn">
                                <div  style ="margin-top: 10px;" class="datosCheckIN">
                                    <p style ="color: #E48D36;" >Huespedes</p>
                                    <p class = "fecha_destino_selecionado" style ="font-weight: 800;">${adulnum_seleccionado}</p>
                                </div>  
                            </section>
                        </div>
                        <div class = fechas_seleccionadas2>
                            <section class="checkIn">  
                                <div class="datosCheckIN">
                                    <p style ="color: #E48D36;">Check Out </p>
                                    <p class = "fecha_destino_selecionado" style ="font-weight: 800;" >${localStorage.getItem("fechaCheckOut")}</p>
                                </div>
                            </section>
                            <section class="checkIn">
                                <div  style ="margin-top: 0px;" class="datosCheckIN">
                                    <p style ="color: #E48D36;">Habitaciones </p>
                                    <p class = "fecha_destino_selecionado" style ="font-weight: 800;" >${habnum_seleccionado}</p>
                                </div>  
                            </section>
                           
                        </div> 
                             
                        <button onclick = 'sendInfo(${JSON.stringify(h)})'>RESERVAR AHORA</button> 
                    </section>
                    
                   
                </section>
                <div class="caja2">
                    <img src="${h.imagen}">
                </div>
            </section>
        `
    }
    section += "</div>"
    cardHotelDisponible.innerHTML += section
    rellarFormulario()

}

// ::::::::  ITERACIONES PARA CONSUMO DE API :::::::
function rellarFormulario() {

    // CONDICIONAL PARA SELEC -> DESTINO, SI SE ENTRA DIRECTAMENTE ESCOGER UN DESTINO SIN UTILIZAR FORMULARIO
    if (window.localStorage.getItem('ciudadSeleccion') != undefined) {
        document.getElementById('ciudad').value = localStorage.getItem("ciudadSeleccion")
    }else{
        document.getElementById('ciudad').value = localStorage.getItem("ciudadSeleccion")
    }   

    // ::::: CONDICIONAL PARA RELLENAR HUESPDES SI ESTA DEFINIDO O NO ::::::

    if (window.localStorage.getItem('numeroAdultos') != undefined) {
        // Iteración para rellenar el numero de huespedes 
        let elemNumHues = document.getElementsByClassName("select2")
        for (let y = 0; y < elemNumHues.length; ++y) {
            elemNumHues[y].value = localStorage.getItem("numeroAdultos")
        }
    } else {
        let elemNumHues = document.getElementsByClassName("select2")
        for (let y = 0; y < elemNumHues.length; ++y) {
            elemNumHues[y].value = "opcion 1"
        }
    }

    // ::::: CONDICIONAL PARA RELLENAR HABITACIONES SI ESTA DEFINIDO O NO ::::::

    if (window.localStorage.getItem('numeroHabitaciones') != undefined) {
        let elemNumHab = document.getElementsByClassName("select3")
        for (let y = 0; y < elemNumHab.length; ++y) {
            elemNumHab[y].value = localStorage.getItem("numeroHabitaciones")
        }
    }else{
        let elemNumHab = document.getElementsByClassName("select3")
        for (let y = 0; y < elemNumHab.length; ++y) {
            elemNumHab[y].value = "opcion 0"
        }
    }

    // ::::: CONDICIONAL PARA RELLENAR FECHAS SI ESTA NDEFINIDAS O NO ::::::
    const fechaHoy_2 = new Date().toISOString().slice(0, 10)

    // Condicional fechas CheckIN, si no hay fechas guardadas en el local storage entonces utilice por defecto la fecha de hoy
    if (window.localStorage.getItem('fechaCheckIn') == undefined || document.getElementsByClassName('fechaINCards') == undefined) {
        document.getElementById('infoIN').value = fechaHoy_2; // Rellenando formulario principal
    }else{
        document.getElementById('infoIN').value =localStorage.getItem("fechaCheckIn"); 
    }

    // Condicional fechas CheckOUT, si no hay fechas guardadas en el local storage entonces utilice por defecto la fecha de hoy
    if (window.localStorage.getItem('fechaCheckOut') == undefined || document.getElementsByClassName('cajaOut') == undefined) {

        document.getElementById('infoOUT').value = fechaHoy_2;// Rellenando formulario principal

    }else{
        document.getElementById('infoOUT').value =localStorage.getItem("fechaCheckOut");    
    }
}

function sendInfo(hotel) {
    //window.location.href= `form-reserva.html?idhotel=${hotel.idHoteles}&img=${hotel.imagen}&p=${hotel.costoHabitacion}`
    let id_H = hotel.idHotel
    localStorage.setItem("id_hotel_sc", id_H)
    let precio_H = hotel.costoHabitacion
    localStorage.setItem("precioHab", precio_H)
    let nombre_H = hotel.nombreHotel
    localStorage.setItem("namehotel", nombre_H)
    let img_H = hotel.imagen
    localStorage.setItem("imgHotelDS", img_H)
    window.location.href = `form-reserva.html`
    //`form-reserva.html?hotel=${JSON.stringify(hotel)}`
}
let ciudad = localStorage.getItem("ciudadSeleccion")

async function main() {
    let url = "http://localhost:8080/api/hoteles/ciudad/"
    url += ciudad
    //console.log(url)
    const hoteles = await obtenerHoteles(url)
    hoteles_disponibles(hoteles)
}

// Funcion para iniciar funciones que necesitemos al iniciar la pagina
function ejecutarAlCargarPagina() {
    verificarFechaIN()
}

window.onload = ejecutarAlCargarPagina;
main()

// Funcion para establcer la fecha del Check In y no permitir escoger una fecha anterior
function verificarFechaIN() {
    let fecha = new Date() //Fecha actual
    let mes = fecha.getMonth() + 1 //obteniendo mes
    let dia = fecha.getDate() //obteniendo dia
    let ano = fecha.getFullYear() //obteniendo año
    if (dia < 10)
        dia = '0' + dia; //agrega cero si el menor de 10
    if (mes < 10)
        mes = '0' + mes //agrega cero si el menor de 10
    let fechaHoy = new Date().toISOString().slice(0, 10)
    document.getElementById('infoIN').min = ano + "-" + mes + "-" + dia;
    document.getElementById('infoOUT').min = ano + "-" + mes + "-" + dia;
}

// :::: GUARDAR INFORMACION LOCALSTORAGE - PASAR A OTRO HTML ::::
function passInformacion() {
    let fechaIN = document.getElementById('infoIN').value;
    localStorage.setItem("fechaCheckIn", fechaIN); // Guardando en el localStorage la fecha del checkIn
    let fechaOUT = document.getElementById('infoOUT').value;
    localStorage.setItem("fechaCheckOut", fechaOUT); // Guardando en el localStorage la fecha del checkOut
    let destinoSelec = document.getElementById('ciudad').value;
    localStorage.setItem("ciudadSeleccion", destinoSelec); // Guardando en el localStorage la ciudad
    let adultosSelec = document.getElementById('numAdult').value;
    localStorage.setItem("numeroAdultos", adultosSelec); // Guardando en el localStorage la num Huespedes
    let habSelec = document.getElementById('numHabiDS').value;
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
            }else if(document.getElementById('numHabiDS').value > document.getElementById('numAdult').value){
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

    //CARTAGENA 
    } else if (document.getElementById('ciudad').value == "CARTAGENA") {
        if (document.getElementById('infoIN').value > document.getElementById('infoOUT').value) {
            mostrarModalFechas()
            }else if(document.getElementById('numHabiDS').value > document.getElementById('numAdult').value){
                if(localStorage.getItem("decision") == false || localStorage.getItem("decision") == undefined){
                    mostrarModalHabitaciones()  
                }else{
                    window.location.href = "destino-seleccionado.html", true;
                }
            }else if(localStorage.getItem("HUEvsHAB") == 1 ){
                    window.location.href = "destino-seleccionado.html", true;
            } 

    } else if (document.getElementById('ciudad').value == "SAN ANDRES") {
        document.location.href = "destino-seleccionado.html", true;

    } else if (document.getElementById('ciudad').value == "SANTA MARTA") {
        document.location.href = "destino-seleccionado.html", true;
        
    } else if (document.getElementById('ciudad').value == "MEDELLIN") {
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
   
}

function CerrarModal3() {
    document.getElementById('openModal3').style.display = 'none';
}

//:::::: BANDERA ::::::::


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// LLAMADA DE FUNCION
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

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

if(localStorage.getItem("numeroAdultos") == undefined){
    location.href = "index.html"
}

function clearStorage() {
    if (localStorage.getItem("flag") == "true") {
        localStorage.clear();
        window.location.href = "destinos.html"
    }
} 
clearStorage();


