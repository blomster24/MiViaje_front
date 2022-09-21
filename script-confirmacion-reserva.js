
let URLT = "http://localhost:8080/api/reservas/documento/"
URLT +=  localStorage.getItem("numDocum")
console.log(URLT)
async function obtenertoken(url) {
    const respuesta = await fetch(url)
    const reservatoken = await respuesta.text()
    console.log(reservatoken)
    return reservatoken
}
async function main() {
    const url = URLT
    const token = await obtenertoken(url)
    token_reserva(token)
}
main()

function token_reserva(token){
    const complemento_reserva = document.getElementById("confirmacion_reserva")
    let t = token
    let div = "<div>"
    div += `
        <div>
            <p>!HURRA¡</p>
            <p>${localStorage.getItem("nombreAdul")}  ${localStorage.getItem("apellidoAdul")}</p>
            <p>TU RESERVA HA SIDO<br> CONFIRMADA<p>

            <p> GUARDA TU NÚMERO DE RESERVA<p>
            <p>${t}</p>



        `
    div += "</div>"
    complemento_reserva.innerHTML += div
}


function set_value_hote() {
    const card_hotel = document.getElementById("hotelSeleccionadoApi")
    let div = "<div class = 'box-img'>"
    div += `
    <div class ="imgHotelSelec">
        <img src = "${localStorage.getItem("imgHotelDS")}">
    </div>
    <div class = "txt_hotel_seleccionado">
        <p style = "color: #E48D36; font-size: 16px; margin-top:10px, font-weight: 800;">¡HURRA!</p>
        <p>HAS RESERVADO</p>
        <p style = "font-size: 25px; font-weight: 700;">${localStorage.getItem("namehotel")}</p>
       
        <div>
            <p style = "font-size: 12px; margin-top:20px; color: #E48D36;">CHECK -IN </p>
            <p style = "font-size: 15px; font-weight: 700;">${localStorage.getItem("fechaCheckIn")}</p>
            <p style = "font-size: 12px; color: #E48D36;">CHECK-OUT</p>
            <p style = "font-size: 15px; font-weight: 700;">${localStorage.getItem("fechaCheckOut")}</p>
        </div>
        <div style ="margin-top:20px;">
            <img src="Image/icoHuesped.svg" class = "img_huesped_hs">
            <p> <span style ="font-size:15px; font-weight: 400;margin:0 0 0 30px;"> Huespedes:</span> 
            <span style = "font-weight: 700;">${localStorage.getItem("numeroAdultos")}</span></p>

            <img  src="Image/icoHab.svg" class = "img_huesped_hs" style = "scale:70%; margin:2px 0 0 -168px;">
            <p style = "margin-top:12px;"> <span style ="font-size:15px; font-weight: 400; margin-left:30px;">Habitaciones:</span>  
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

function txtnoche(){
    let txt = "noches"
    if(numeroNoches() == 1){
        txt = "noche"
    }
    return txt
}
txtnoche()
set_value_hote()
