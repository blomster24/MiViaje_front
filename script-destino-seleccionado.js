// document.getElementById('infoIN').value = localStorage.getItem("fechaCheckIn");


async function obtenerHoteles(url) {
    const respuesta = await fetch(url)
    const hoteles = await respuesta.json()
    return hoteles
}


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
                            <div class="check"><img src="Image/Check.svg"></div>
                            <div class="check2"><img src="Image/Check.svg"></div>
                            <div class="desc">
                                <p class="text2" style="color: black;">Beneficios de miviaje.com</p>
                                <p class="text3">Cancelacion Gratuita</p>
                                <p class="text5">Pago en efectivo en el hotel</p>
                                <div class="precio">
                                    <p class = "txtprecio"><span style ="font-size:20px; font-weight: 400;">$</span>${(h.costoHabitacion*1).toLocaleString('de-DE')} <span class = "txtprecio2" >por noche</span></p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section class="informacion">
                        <section class="checkIn">
                            <div class="imgCalendarioIN"><img src="Image/Vectorcalendario.svg"></div>
                            <div class="datosCheckIN">
                                <p>Check In</p>
                                <input id = "fechaINCards" class="cajaIn" type="date" max="2023-02-22" style="width: 100px;"
                                    onkeydown="return false" value ="${document.getElementById('infoIN').value}">
                            </div>
                        </section>
                        <section class="checkOut">
                            <div class="imgCalendarioOut"><img src="Image/Vectorcalendario.svg"></div>
                            <div class="datosCheckOut">
                                <p>Check Out</p>
                                <input class="cajaOut" type="date" max="2023-02-22" style="width: 100px;"
                                    onkeydown="return false" value ="${document.getElementById('infoOUT').value}">
                            </div>
                        </section>
                        <section class="huespedes">
                            <div class="imgHuespedes"><img src="Image/icoHuesped.svg "></div>
                            <div class="datosHuespedes" id ="rrr">
                                <p>Huespedes</p>
                                <select id="idr" class="select2" value = "opcion 2">
                                    <option value="opcion 0">1 Adulto</option>
                                    <option value="opcion 1">2 Adultos</option>
                                    <option value="opcion 2">3 Adultos</option>
                                    <option value="opcion 3">4 Adultos</option>
                                </select>
                            </div>
                            <img class="img3" src="Image/icoHab.svg">
                            <div>
                                <select class="select3" style="width: 80px;" value = "${localStorage.getItem("numeroHabitaciones")}">
                                    <option value="opcion 0">1 hab</option>
                                    <option value="opcion 1">2 hab</option>
                                    <option value="opcion 2">3 hab</option>
                                    <option value="opcion 3">4 hab</option>
                                </select>
                            </div>
                        </section>
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
}

function sendInfo(hotel){
    //window.location.href= `form-reserva.html?idhotel=${hotel.idHoteles}&img=${hotel.imagen}&p=${hotel.costoHabitacion}`
    let id_H = hotel.idHotel
    localStorage.setItem("id_hotel_sc",id_H)
    let precio_H = hotel.costoHabitacion
    localStorage.setItem("precioHab",precio_H)
    let nombre_H = hotel.nombreHotel
    localStorage.setItem("namehotel", nombre_H)
    let img_H = hotel.imagen
    localStorage.setItem("imgHotelDS", img_H)
    window.location.href= `form-reserva.html?hotel=${JSON.stringify(hotel)}`

}
async function main() {
    const url = "http://localhost:8080/api/hoteles/ciudad/Bogotá"
    const hoteles = await obtenerHoteles(url)
    hoteles_disponibles(hoteles)
}

// Funcion para iniciar funciones que necesitemos al iniciar la pagina
function ejecutarAlCargarPagina() {
    verificarFechaIN()
   
}


window.onload = ejecutarAlCargarPagina;
main()

// Iteraciones para consumo de API

// Iteración para rellenar la fecha de Cehck In
let elemIN = document.getElementsByClassName('cajaIn');
for (let n = 0; n < elemIN.length; ++n) {
    elemIN[n].value = localStorage.getItem("fechaCheckIn");
}

// Iteración para rellenar la fecha de Check Out
let elemOUT = document.getElementsByClassName('cajaOut');
let x;
for (x = 0; x < elemOUT.length; ++x) {
    elemOUT[x].value = localStorage.getItem("fechaCheckOut");
}

// Condicional para selec -> Adultos, si se entra directamente escoger un destino sin utilizar formulario
if (window.localStorage.getItem('numeroAdultos') != undefined) {
    // Iteración para rellenar el numero de huespedes 
    document.getElementById('numAdult').value = localStorage.getItem("numeroAdultos");
}



if (window.localStorage.getItem('numeroHabitaciones') != undefined) {
    // Iteración para rellenar el numero de huespedes 
    let elemNumAdultos = document.getElementsByClassName('select3');
    for (let a = 0; a < elemNumAdultos.length; ++a) {
        elemNumAdultos[a].value = localStorage.getItem("numeroHabitaciones")
    }
}


// Condicional para selec -> Destino, si se entra directamente escoger un destino sin utilizar formulario
if (window.localStorage.getItem('ciudadSeleccion') != undefined) {
    document.getElementById('ciudad').value = localStorage.getItem("ciudadSeleccion")
}

// Condicional fechas CheckIN, si no hay fechas guardadas en el local storage entonces utilice por defecto la fecha de hoy
if (window.localStorage.getItem('fechaCheckIn') == undefined) {
    let fechaHoy = new Date().toISOString().slice(0, 10)
    document.getElementById('infoIN').value = fechaHoy;
}

// Condicional fechas CheckOUT, si no hay fechas guardadas en el local storage entonces utilice por defecto la fecha de hoy
if (window.localStorage.getItem('fechaCheckOut') == undefined) {
    let fechaHoy = new Date().toISOString().slice(0, 10)
    document.getElementById('infoOUT').value = fechaHoy;
}

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

function funcionBuscar() {

    // Validando que las fechas del checkOut no sea antes del checkIN
    if (document.getElementById('infoIN').value > document.getElementById('infoOUT').value) {
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

    function passInformacion() {
        let fechaIN = document.getElementById('infoIN').value;
        localStorage.setItem("fechaCheckIn", fechaIN); // Guardando en el localStorage la fecha del checkIn
        let fechaOUT = document.getElementById('infoOUT').value;
        localStorage.setItem("fechaCheckOut", fechaOUT); // Guardando en el localStorage la fecha del checkOut
        let destinoSelec = document.getElementById('ciudad').value;
        localStorage.setItem("ciudadSeleccion", destinoSelec); // Guardando en el localStorage la ciudad
        let adultosSelec = document.getElementById('numAdult').value;
        localStorage.setItem("numeroAdultos", adultosSelec); // Guardando en el localStorage la num Huespedes
        let habSelec = document.getElementById('numHab').value;
        localStorage.setItem("numeroHabitaciones", habSelec);
        return true;
    }
    
}
