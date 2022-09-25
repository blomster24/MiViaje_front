// :::::  OBTENIENDO INFORMACION RESERVA ::::::

let URL_R = "http://localhost:8080/api/reservas/cedulatoken"
URL_R += "?numeroDocumento=" + localStorage.getItem("numeroDocumento") + "&token=" + localStorage.getItem("token") + "&tipoDocumento=" + localStorage.getItem("tipoDocumento")

async function get_info_reserva(url) {
    const respuesta = await fetch(url)
    const inforeserva = await respuesta.json()
    return inforeserva
}
async function mainR() {
    const url = URL_R
    const info = await get_info_reserva(url)
    console.table(info)

    // :::::  INFORMACION RESERVA ::::::
    // <-- ID RESERVA -->
    let id_rese = info.idReservas
    localStorage.setItem("idReservas", id_rese)
    // <-- FECHA CHECK IN -->
    let fechaIN = info.fechaInicial
    localStorage.setItem("fechaCheckIn", fechaIN)
    // <-- FECHA CHECK OUT -->
    let fechaOut = info.fechaFinal
    localStorage.setItem("fechaCheckOut", fechaOut)
    // <-- HUESPEDES -->
    let numHuespedes = info.cantidadPersonas
    localStorage.setItem("numeroAdultos", numHuespedes)
    // <-- HABITACIONES -->
    localStorage.setItem("numeroHabitaciones", info.cantidadHabitaciones)
    // <-- NOMBRE -->
    let nombre = info.nombrePersona
    localStorage.setItem("nombre", nombre)
    // <-- APELLIDO -->
    let apellido = info.apellidoPersona
    localStorage.setItem("apellido", apellido)
    // <-- TELEFONO -->
    let telefono = info.telefonoPersona
    localStorage.setItem("telefono", telefono)
    // <-- EMAIL -->
    let email = info.correoPersona
    localStorage.setItem("email", email)
    // <-- TIPO DOCUMENTO -->
    let tipoDocumento = info.tipoDocumento
    localStorage.setItem("tipoDocumento", tipoDocumento)
    // <-- ID HOTEL  -->
    let id_hr = info.fkHotel
    localStorage.setItem("idHotelReserva", id_hr)

    console.log(" fkhotel ->" + localStorage.getItem("idHotelReserva"))

    mostrar()
}
mainR()


function mostrar() {
    // :::::  SI EXISTE LA RESERVA SE MUESTRA LA INFORMACION - SI NO SE DEVUELVE ::::::
    if (localStorage.getItem("idHotelReserva") != 0) {

        // :::::  OBTENIENDO INFORMACION DEL HOTEL DE LA RESERVA ::::::
        let URL_H = "http://localhost:8080/api/hoteles/"
        URL_H += localStorage.getItem("idHotelReserva")

        async function get_info_hotel(url) {
            const respuestaH = await fetch(url)
            const infoHotel = await respuestaH.json()
            return infoHotel
        }
        async function mainH() {
            const url = URL_H
            const info = await get_info_hotel(url)
            console.table(info)
            set_value_hote(info)
            saludo()
        }
        mainH()

        function saludo() {
            const saludo = document.getElementById("txt_inicial_mireserva_resultado")
            let div = "<div>"
            div += `
                    <p class = "advertencia_mireserva">  <span style = "font-size: 20px;"><span style ="color:#E48D36;">HOLA</span> ${(localStorage.getItem("nombre")).toUpperCase()} ${(localStorage.getItem("apellido")).toUpperCase()}</span>
                    <br>SI DESEAS HOSPEDARTE EN OTRO HOTEL, CANCELA ESTA RESERVA Y REALIZA UNA NUEVA CON EL HOTEL QUE DESEES.<br> <span style = "font-weight: 500;">SI SOLO QUIERES ACTUALIZAR TUS DATOS O CONDICIONES DE TU RESERVA HAZLO EN EL SIGUIENTE FORMULARIO.</span></p>
                `

            div += "</div>"
            saludo.innerHTML += div
        }
        // :::::  CARD CON INFORMACION DEL HOTEL DE LA RESERVA ::::::
        function set_value_hote(hotel) {
            const card_hotel = document.getElementById("hotelSeleccionadoApi")
            let div = "<div class = 'box-img'>"
            const h = hotel
            let imghr = h.imagen
            localStorage.setItem("imgHotelDS", imghr)
            let namehotel = h.nombreHotel
            localStorage.setItem("namehotel", namehotel)
            let costohab = h.costoHabitacion
            localStorage.setItem("precioHab", costohab)

            div += `
            
            <div class ="imgHotelSelec">
                <img src = "${h.imagen}">
            </div>
            <div class = "txt_hotel_seleccionado">
               
                <p class = "tu_has_reservado" >TU HAS RESERVADO</p>
                <p style = "font-size: 23px; font-weight: 700;">${h.nombreHotel}</p>
               
                <div>
                    <p style = "font-size: 12px; margin-top:10px; color: #E48D36;">CHECK -IN </p>
                    <p style = "font-size: 14px; font-weight: 700;">${localStorage.getItem("fechaCheckIn")}</p>
                    <p style = "font-size: 12px; color: #E48D36; margin-top:15px;">CHECK-OUT</p>
                    <p style = "font-size: 14px; font-weight: 700;">${localStorage.getItem("fechaCheckOut")}</p>
                </div>
                <div style ="margin-top:20px;">
                    <img src="Image/icoHuesped.svg " class = "img_huesped_hs">
                    <p> <span style ="font-size:14px; font-weight: 400;margin:0 0 0 30px;"> Huespedes:</span> 
                    <span style = "font-weight: 700; font-size:14px;">${localStorage.getItem("numeroAdultos")}</span></p>
        
                    <img class = "img_huesped_hs" style = "scale:70%; margin:2px 0 0 -168px;" src="Image/icoHab.svg">
                    <p style =" margin-top:12px;"> <span style ="font-size:14px; font-weight: 400; margin-left:30px; ">Habitaciones:</span>  
                    <span style = "font-size:14px; font-weight: 700;">${localStorage.getItem("numeroHabitaciones")}</span></p>
                </div>
                
                <p style = "margin:20px auto;"><span style = "font-size:18px; font-weight: 700;">$${(((h.costoHabitacion) * 1).toLocaleString('de-DE'))}</span> por noche</p>
        
                <p style = "text-align: right; margin: 45px 0 0 0; padding-right:20px;">
                    <span style = "color: #E48D36;">Total por </span> ${numeroNoches()} 
                    <span style = "color: #E48D36;">${txtnoche()}</span></p>
                    
        
                <p style = "text-align: right; padding-right:20px; margin: 10px 0 0 0;">$
                <span style ="font-size:25px; font-weight: 700;"> ${((((h.costoHabitacion) * 1) * numeroNoches()).toLocaleString('de-DE'))}</span><p>
                <input type="reset" value="CANCELAR RESERVA" class="boton_cancelar" onclick="borrar_reserva(${localStorage.getItem("idReservas")})">
            </div>
            `
            div += "</div>"
            card_hotel.innerHTML += div
        }

        // :::::  FORMULARIO CON LA INFORMAICON DE LA RESERVA ::::::
        function formulario_Actualizar() {
            const formu_actualizar = document.getElementById("form_reserva_mireserva")
            div = "<div>"
            div += `
                    <div class ="cajasTexto">   
                        <section class="seleccion_fechas_actualizar_mireserva">
                        
                            <div class="caja_principal_seleccion_fechas">
                                
                                <div class = caja_mi_reserva>
                                    <label for = "checkin" >CHECK-IN</label>
                                        <div class="caja_seleccion_mireserva">
                                            <div class="txt_caja_seleccion_mireserva">
                                            <img class = "img_huesped_mireserva" src ="Image/icoHuesped.svg">
                                                <input style ="width:60%;" type="date" id="fechaInicial" class ="checkin_mireserva" min ="${verificarFechaIN()}" name ="checkin" value ="${(localStorage.getItem("fechaCheckIn"))}">
                                            </div>
                                        </div>
                                </div>
                                <div class = caja_mi_reserva> 
                                   
                                    <label for = "checkout" >CHECK-OUT</label>
                                        <div class="caja_seleccion_mireserva">
                                            <div class="txt_caja_seleccion_mireserva">
                                            <img class = "img_huesped_mireserva" src ="Image/icoHuesped.svg">
                                                <input style ="width:60%;" type="date" id = "fechaFinal" class ="checkin_mireserva" min ="${verificarFechaIN()}" name ="checkout" value ="${(localStorage.getItem("fechaCheckOut"))}">
                                            </div>
                                        </div>
                                </div> 
                            
                                <div class = caja_mi_reserva>
                                    <label for = "checkin" >HUESPEDES</label>
                                        <div class="caja_seleccion_mireserva">
                                            <div class="txt_caja_seleccion_mireserva">   
                                                <img class = "img_huesped_mireserva" src ="Image/icoHuesped.svg">
                                                <select id ="cantidadPersonas" class="adul_selecionar_mireserva">
                                                    <option value="1">1 ADULTO</option>
                                                    <option value="2">2 ADULTOS</option>
                                                    <option value="3">3 ADULTOS</option>
                                                    <option value="4">4 ADULTOS</option>
                                                </select>
                                            </div>
                                        </div>
                                </div>
                                <div class = caja_mi_reserva> 
                                    <label for = "checkin" >HABITACIONES</label>
                                        <div class="caja_seleccion_mireserva">
                                            <div class="txt_caja_seleccion_mireserva">
                                            <img class = "img_huesped_mireserva" src ="Image/icoHuesped.svg">
                                                <select id ="numhabiciones" class="hab_selecionar_mireserva">
                                                    <option value="1">1 HABITACION</option>
                                                    <option value="2">2 HABITACIONES</option>
                                                    <option value="3">3 HABITACIONES</option>
                                                    <option value="4">4 HABITACIONES</option>
                                                </select>
                                            </div>
                                        </div>
                                </div> 
                               
                        </div>  
                        
                        <div class ="datos_personales">
                            <div class = caja_mi_reserva3> 
                                <label for = "nombrePersona" >NOMBRE</label>
                                <input type = "text" id = "nombrePersona" name = "nombrePersona" class ="inputForm" required>
                            </div>
                            <div class = id_mi_reserva> 
                                <label for = "idReserva"></label>
                                <input type = "text" id = "idReserva" name = "idReserva" class ="inputForm" required>
                            </div>
                            <div class = id_mi_reserva> 
                                <label for = "token"></label>
                                <input type = "text" id = "token" name = "token" class ="inputForm" required>
                            </div>
                            <div class = id_mi_reserva> 
                                <label for = "fkHotel"></label>
                                <input type = "text" id = "fkHotel" name = "fkHotel" class ="inputForm" required>
                            </div>
                            <div class = caja_mi_reserva3> 
                                <label for = "apellidoPersona">APELLIDO</label>
                                <input type = "text" id = "apellidoPersona" name = "apellidoPersona" class ="inputForm" required>
                            </div>
                            <div class = caja_mi_reserva3> 
                                <label for = "correoPersona">CORREO ELECTRONICO</label>
                                <input type = "email" id = "correoPersona" name = "correoPersona" class ="inputForm" required
                                placeholder="email@domino.com">
                            </div>
                            <div class = caja_mi_reserva3> 
                                <label for = "telefonoPersona">TELÉFONO</label>
                                <input type = "tel" id = "telefonoPersona" name = "telefonoPersona" class ="inputForm" required
                                placeholder="(xx) xxx xxx xxxx" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" />
                                </div>                                
                            <div class = caja_mi_reserva3> 
                                <label for = "tipoDocumento">TIPO DE DOCUMENTO</label>
                                <select class ="inputForm" name = "tipoDocumento" id = "tipoDocumento" required >
                                    <option value="CC">Cedula de Ciudadania</option>
                                    <option value="CE">Cedula de Extranjeria</option>
                                    <option value="PA">Pasaporte</option>
                                </select>
                            </div>
                            <div class = caja_mi_reserva3> 
                                <label for = "numeroDocumento">NÚMERO DOCUMENTO</label>
                                <input type ="text" id ="numeroDocumento" name = "numeroDocumento" class ="inputForm" required/>
                            </div>
                        </div>    
                    </div>    
                       
                    </div>
                    <section class = "botones_actualiza_elimnar">
                        <!-- BOTONES -->
                        <input type="submit" value="ACTUALIZAR RESERVA" class="boton_actualizar ">
                        
                    </section>
                
               
            `
            div += "</div>"
            formu_actualizar.innerHTML += div
            rellarFormulario()

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
            let min = ano + "-" + mes + "-" + dia;
            return min + 1

        }
        verificarFechaIN()
        // ::::: FUNCION PARA RELLANR EL FORMULARIO CON LOS DATOS DE LA RESERVA ::::::
        function rellarFormulario() {
            document.getElementById("nombrePersona").setAttribute("value", localStorage.getItem("nombre"))
            document.getElementById("apellidoPersona").setAttribute("value", localStorage.getItem("apellido"))
            document.getElementById("correoPersona").setAttribute("value", localStorage.getItem("email"))
            document.getElementById("telefonoPersona").setAttribute("value", localStorage.getItem("telefono"))
            document.getElementById("tipoDocumento").value = localStorage.getItem("tipoDocumento")
            document.getElementById("numeroDocumento").setAttribute("value", localStorage.getItem("numeroDocumento"))
            document.getElementById("cantidadPersonas").value = localStorage.getItem("numeroAdultos")
            document.getElementById("numhabiciones").value = localStorage.getItem("numeroHabitaciones")
            document.getElementById("idReserva").value = localStorage.getItem("idReservas")
            document.getElementById("token").value = localStorage.getItem("token")
            document.getElementById("fkHotel").value = localStorage.getItem("idHotelReserva")

        }


        // :::::  LLAMADO DE FUNCIONES ::::::
        formulario_Actualizar()

        // :::::: FUNCION PARA CONOCER EL NUMERO DE NOCHES ENTRE LAS FECHAS DE RESERVA :::::
        function numeroNoches() {
            let fechainicio = new Date(localStorage.getItem("fechaCheckIn"))
            let fechaFin = new Date(localStorage.getItem("fechaCheckOut"))
            let diaMilisegundos = 86400000
            let diferenciaMil = fechaFin - fechainicio
            let diferenciaDia = diferenciaMil / diaMilisegundos
            if (diferenciaDia < 1) {
                diferenciaDia = 1
            }
            return diferenciaDia
        }
        // :::: FUNCION PARA CAMBIAR TEXTO NOCHES O NOCHE
        function txtnoche() {
            let txt = "noches"
            if (numeroNoches() == 1) {
                txt = "noche"
            }
            return txt
        }


    } else {
        NO_existe_reserva()
    }
}

// ::: FUNCION VERIFICAR FECHAS
function verificar_fechas(){
    if (localStorage.getItem("fechaCheckIn") > localStorage.getItem("fechaCheckOut")) {
        mostrarModalFechas()
    }
}


// ::::: FUNCION PARA CREAR EL JSON PARA MODIFICAR RESERVA ::::
function obtenerInfo(evt) {
    evt.preventDefault()
    const form = evt.target
    const reserva = {
        idReservas: form.idReserva.value,
        token: form.token.value,
        fechaInicial: form.fechaInicial.value,
        fechaFinal: form.fechaFinal.value,
        cantidadPersonas: form.cantidadPersonas.value,
        cantidadHabitaciones:form.numhabiciones.value,
        nombrePersona: form.nombrePersona.value,
        apellidoPersona: form.apellidoPersona.value,
        correoPersona: form.correoPersona.value,
        telefonoPersona: form.telefonoPersona.value,
        tipoDocumento: form.tipoDocumento.value,
        numeroDocumento: form.numeroDocumento.value,
        fkHotel: form.fkHotel.value

    }
    console.log(reserva)
    save_info()
    if (localStorage.getItem("fechaCheckIn") > localStorage.getItem("fechaCheckOut")) {
        mostrarModalFechas()   
    }else{
        update(reserva)
    }
    

}

function save_info() {
    let nombre = document.getElementById("nombrePersona").value
    localStorage.setItem("nombreAdul", nombre)
    let apellido = document.getElementById("apellidoPersona").value
    localStorage.setItem("apellidoAdul", apellido)
    let numeroDocu = document.getElementById("numeroDocumento").value
    localStorage.setItem("numDocum", numeroDocu)
    let fechaIN = document.getElementById("fechaInicial").value
    localStorage.setItem("fechaCheckIn", fechaIN)
    let fechaOUT = document.getElementById("fechaFinal").value
    localStorage.setItem("fechaCheckOut", fechaOUT)

}
const URL_API = "http://localhost:8080/api/reservas"

async function update(reserva) {
    // Enviar petición
    const resp = await fetch(URL_API, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reserva)
    })
    const text = await resp.text()
    window.location.replace("confirmacion-reserva.html")
}

async function borrar_reserva(id) {
    // Enviar petición
    const resp = await fetch(`${URL_API}/${id}`, {
        method: 'DELETE'
    })
    const text = await resp.text()
    alert(text)
    location.reload()
}


function aceptar() {
    window.location.replace("index.html")
}


//window.onload = clearStorage;
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// FUNCIONES PARA MODALES 
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function mostrarModalFechas() {
    document.getElementById('openModal2').style.display = 'initial';
}

function CerrarModal2() {
    document.getElementById('openModal2').style.display = 'none';
}

function NO_existe_reserva() {
    document.getElementById('openModal3').style.display = 'block';
}

function CerrarModal3() {
    document.getElementById('openModal3').style.display = 'none';
}

CerrarModal2()

// Funcion para limpiar el localStorage
function clearStorage() {
    localStorage.clear();
}