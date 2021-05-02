function citasPendientes(){
  let cadena = ""
  let tabla = document.getElementById('citasPendientes')
  fetch('https://backend-ipc1-202004804.herokuapp.com/citas/pendientes',{
    method: 'GET',
    headers:{
      'content-type':'application/json',
      'Access-Control-Allow-Origin':'*', }})
    .then(res => res.json())
    .catch(err => {
      console.error('Error:', err)
      alert("Ocurrió un error, ver la consola")
    })
    .then(response =>{
      console.log(response)
      for (var i in response){
        cadena += 
        `<tr>
        <td class="text-bold-500">${response[i].date}</td>
        <td>${response[i].hour}</td>
        <td class="text-bold-500">${response[i].motive}</td>
        <td><button value = ${response[i].id} type="button" href="#" onclick="obtenerListaDoctores(this)" class="btn btn-outline-success" data-toggle="modal" data-target="#border-less">Aceptar</a></td>
        <td><button value = ${response[i].id} type="button" href="#" onclick="rechazarCita(this)" class="btn btn-outline-danger">Rechazar</a></td>
      </tr>`
      }
      tabla.innerHTML = cadena
  })
}

function citasAceptadas(){
  let cadena = ""
  let tabla = document.getElementById('citasAceptadas')
  fetch('https://backend-ipc1-202004804.herokuapp.com/citas/aceptadas',{
    method: 'GET',
    headers:{
      'content-type':'application/json',
      'Access-Control-Allow-Origin':'*', }})
    .then(res => res.json())
    .catch(err => {
      console.error('Error:', err)
      alert("Ocurrió un error, ver la consola")
    })
    .then(response =>{
      console.log(response)
      for (var i in response){
        cadena += 
        `<tr>
        <td class="text-bold-500">${response[i].date}</td>
        <td>${response[i].hour}</td>
        <td class="text-bold-500">${response[i].motive}</td>
      </tr>`
      }
      tabla.innerHTML = cadena
  })
}

function obtenerListaDoctores(button){
  let cadena = ""
  document.getElementById('listaDoctores').value = button.value
  let tabla = document.getElementById('listaDoctores')
  fetch('https://backend-ipc1-202004804.herokuapp.com/lista-medicos',{
    method: 'GET',
    headers:{
      'content-type':'application/json',
      'Access-Control-Allow-Origin':'*', }})
    .then(res => res.json())
    .catch(err => {
      console.error('Error:', err)
      alert("Ocurrió un error, ver la consola")
    })
    .then(response =>{
      console.log(response)
      for (var i in response){
        cadena += 
        `<tr>
        <td class="text-bold-500">${response[i].nombre}</td>
        <td>${response[i].apellido}</td>
        <td><button value = ${response[i].user} type="button" onclick = "asignarDoctor(this)" href="#" class="btn btn-outline-success" data-toggle="modal" data-target="#border-less">Asignar</a></td>
      </tr>`
      }
      tabla.innerHTML = cadena
  })
}

function rechazarCita(button){
  var id = button.value
  var objeto = {
    'id': id
  }
  fetch("https://backend-ipc1-202004804.herokuapp.com/cita/rechazar",{
    method: 'POST',
    body: JSON.stringify(objeto),
    headers:{
      'content-type':'application/json',}})
  .then(res => res.json())
  .catch(err => {
    console.error('Error', err)
    alert("Ocurrió un error, ver la consola")
  })
  .then(response => {
    console.log(response)
    alert(response.Mensaje)
    window.citasPendientes();
  })
}

function asignarDoctor(button){
  var userDoctor = button.value
  var idcita = document.getElementById('listaDoctores').value
  var objeto = {
    user: userDoctor,
    idCita: idcita 
  }
  fetch("https://backend-ipc1-202004804.herokuapp.com/cita/aceptar",{
    method: 'POST',
    body: JSON.stringify(objeto),
    headers:{
      'content-type':'application/json',
      'Access-Control-Allow-Origin':'*',  }})
    .then(res => res.json())
    .catch(err => {
      console.error('Error', err)
      alert("Ocurrió un error, ver la consola")
    })
    .then(response => {
      console.log(response)
      alert(response.Mensaje)
      window.citasPendientes()
    })

}

function doctoresFactura(){
  let cadena = ""
  let select = document.getElementById('doctorSelect')
  fetch('https://backend-ipc1-202004804.herokuapp.com/lista-medicos',{
    method: 'GET',
    headers:{
      'content-type':'application/json',
      'Access-Control-Allow-Origin':'*', }})
    .then(res => res.json())
    .catch(err => {
      console.error('Error:', err)
      alert("Ocurrió un error, ver la consola")
    })
    .then(response =>{
      console.log(response)
      for (var i in response){
        cadena += 
        `<option>${response[i].nombre}`+` ${response[i].apellido}</option>`
      }
      select.innerHTML = cadena
  })

}