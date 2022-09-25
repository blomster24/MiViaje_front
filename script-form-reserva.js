switch (localStorage.getItem("numeroAdultos")) {
    case 'opcion 0':
        localStorage.setItem("numeroAdultos", '1')
        break;
    case 'opcion 1':
        localStorage.setItem("numeroAdultos", '2')
        break;
    case 'opcion 2':
        localStorage.setItem("numeroAdultos", '3')
        break;
    case 'opcion 3':
        localStorage.setItem("numeroAdultos", '4')
        break;
}

switch (localStorage.getItem("numeroHabitaciones")) {
    case 'opcion 0':
        localStorage.setItem("numeroHabitaciones", '1')
        break;
    case 'opcion 1':
        localStorage.setItem("numeroHabitaciones", '2')
        break;
    case 'opcion 2':
        localStorage.setItem("numeroHabitaciones", '3')
        break;
    case 'opcion 3':
        localStorage.setItem("numeroHabitaciones", '4')
        break;
}

const URL_APi = "http://localhost:8080/api/reservas"

function obtenerInfo(evt) {
    evt.preventDefault()
    const form = evt.target
    const reserva = {
        fechaInicial: form.fechaInicial.value,
        fechaFinal: form.fechaFinal.value,
        cantidadPersonas:form.cantidadPersonas.value,
        cantidadHabitaciones:form.cantidadHabitaciones.value,
        nombrePersona: form.nombrePersona.value,
        apellidoPersona: form.apellidoPersona.value,
        correoPersona: form.correoPersona.value,
        telefonoPersona: form.telefonoPersona.value,
        tipoDocumento: form.tipoDocumento.value,
        numeroDocumento: form.numeroDocumento.value,
        fkHotel:form.fkHotel.value
        
    }
    console.log(reserva)
    save_name()
    crearReserva(reserva)

}
function save_name(){
    let nombre = document.getElementById("nombrePersona").value
    localStorage.setItem("nombreAdul",nombre)
    let apellido = document.getElementById("apellidoPersona").value
    localStorage.setItem("apellidoAdul",apellido)
    let numeroDocu =document.getElementById("numeroDocumento").value
    localStorage.setItem("numDocum",numeroDocu)
}


function clearForm(form) {
    form.nombrePersona.value = ""
    form.apellidoPersona.value = ""
    form.correoPersona.value = ""
    form.telefonoPersona.value = ""
    form.tipoDocumento.value = ""
    form.numeroDocumento.value = ""
}

async function crearReserva(reserva) {
    // Enviar peticion
    const respues = await fetch(URL_APi, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reserva)
    })
    const text = await respues.text()
    window.location.replace("confirmacion-reserva.html")
}


/* function get_params_url() {
    const params = window.location.search
    const url = new URLSearchParams(params)
    let hotel = JSON.parse(url.get("hotel"))
    //const id = (url.get('idhotel'))
    //const img = (url.get('img'))
    //let imgh = hotel.imagen
    //localStorage.setItem("imghs", imgh)
    set_value_hote(hotel)
    get_idhotel(hotel)

}

get_params_url() */

set_value_hote()
get_idhotel()
function get_idhotel(){
    const complemento_reserva = document.getElementById("form_reserva")
    let div = "<div style = 'display:none;'>"
    div += `
        <label for = "fkHotel">idhotel</label>
        <input type ="text" id = "fkHotel" name ="fkHotel" value ="${localStorage.getItem("id_hotel_sc")}">
        <label for = "fechaInicial">idhotel</label>
        <input type ="text" id = "fechaInicial" name ="fechaInicial" value ="${localStorage.getItem("fechaCheckIn")}">
        <label for = "fechaFinal">idhotel</label>
        <input type ="text" id = "fechaFinal" name ="fechaFinal" value ="${localStorage.getItem("fechaCheckOut")}">
        <label for = "cantidadPersonas">idhotel</label>
        <input type ="text" id = "cantidadPersonas" name ="cantidadPersonas" value ="${localStorage.getItem("numeroAdultos")}">
        <label for = "cantidadHabitaciones">idhotel</label>
        <input type ="text" id = "cantidadHabitaciones" name ="cantidadHabitaciones" value ="${localStorage.getItem("numeroHabitaciones")}">
        `
    div += "</div>"
    complemento_reserva.innerHTML += div
}



function set_value_hote(hotel) {
    const card_hotel = document.getElementById("hotelSeleccionadoApi")
    let div = "<div class = 'box-img'>"
    const h = hotel
    div += `
    <div class ="imgHotelSelec">
        <img src = "${localStorage.getItem("imgHotelDS")}">
    </div>
    <div class = "txt_hotel_seleccionado">
        <p style = "color: #E48D36; font-size: 15px; margin-top:10px">¡HURRA!</p>
        <p>HAS SELECCIONADO</p>
        <p style = "font-size: 25px; font-weight: 700;">${localStorage.getItem("namehotel")}</p>
       
        <div>
            <p style = "font-size: 12px; margin-top:20px; color: #E48D36;">CHECK -IN </p>
            <p style = "font-size: 15px; font-weight: 700;">${localStorage.getItem("fechaCheckIn")}</p>
            <p style = "font-size: 12px; color: #E48D36;">CHECK-OUT</p>
            <p style = "font-size: 15px; font-weight: 700;">${localStorage.getItem("fechaCheckOut")}</p>
        </div>
        <div style ="margin-top:20px;">
            <img src="Image/icoHuesped.svg " class = "img_huesped_hs">
            <p> <span style ="font-size:15px; font-weight: 400;margin:0 0 0 30px;"> Huespedes:</span> 
            <span style = "font-weight: 700;">${localStorage.getItem("numeroAdultos")}</span></p>

            <img class = "img_huesped_hs" style = "scale:70%; margin:2px 0 0 -168px;" src="Image/icoHab.svg">
            <p style =" margin-top:12px;"> <span style ="font-size:15px; font-weight: 400; margin-left:30px; ">Habitaciones:</span>  
            <span style = "font-size:16px; font-weight: 700;">${localStorage.getItem("numeroHabitaciones")}</span></p>
        </div>
        
        <p style = "margin:20px auto;"><span style = "font-size:18px; font-weight: 700;">$${(localStorage.getItem("precioHab")*1).toLocaleString('de-DE')}</span> por noche</p>

        <p style = "text-align: right; padding-right:20px;">
            <span style = "color: #E48D36;">Total por </span> ${numeroNoches().toLocaleString('de-DE')} 
            <span style = "color: #E48D36;">${txtnoche()}</span></p>

        <p style = "margin:5px 0 0 0; text-align: right; padding-right:20px;">$
        <span style ="font-size:25px; font-weight: 700;"> ${((localStorage.getItem("precioHab")*1) * numeroNoches()).toLocaleString('de-DE')}</span><p>
    </div>
    `
    div += "</div>"
    card_hotel.innerHTML += div

}

function numeroNoches(){
    let fechainicio = new Date(localStorage.getItem("fechaCheckIn"))
    let fechaFin = new Date(localStorage.getItem("fechaCheckOut"))
    let diaMilisegundos = 86400000
    let diferenciaMil = fechaFin - fechainicio
    let diferenciaDia = diferenciaMil / diaMilisegundos
    if(diferenciaDia < 1){
        diferenciaDia = 1
    }
    return diferenciaDia
    
}
let flag = true
localStorage.setItem("flag",flag)

function devolver(){
    if(localStorage.getItem("fechaCheckOut") == undefined){
        window.location.href = "destinos.html"
    }
}
devolver()
function txtnoche(){
    let txt = "noches"
    if(numeroNoches() == 1){
        txt = "noche"
    }
    return txt
}
txtnoche()






