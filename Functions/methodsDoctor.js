let documentoReceta = ""
function citasPendientes(){
  let cadena = ""
  let tabla = document.getElementById('citasP')
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
        <td><button value = ${response[i].id} type="button" onclick = "aceptarCita(this)" href="#" class="btn btn-outline-success">Aceptar</a></td>
        <td><button value = ${response[i].id} type="button" href="#" onclick = "rechazarCita(this)" class="btn btn-outline-danger">Rechazar</a></td>
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

function aceptarCita(button){
    userDoctor = sessionStorage.getItem("Usuario")
    idcita = button.value
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

function citasAceptadas(){
  let user = sessionStorage.getItem("Usuario")
  let cadena = ""
  let tabla = document.getElementById('citasA')
  fetch(`https://backend-ipc1-202004804.herokuapp.com/Doctor/MisCitas/${user}`,{
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
         ` 
        if(response[i].state == "Completada"){
          cadena+= `<td><input type="checkbox" class='form-check-input' checked = true disabled = true></td></tr>`
        }
        else{
          cadena +=`<td><input type="checkbox" class='form-check-input' id= ${response[i].id} onclick = "completarCita(this)"></td>
          `
        }
         
      }
      tabla.innerHTML = cadena
  })
}

function procesarReceta(){
    document.getElementById('generarReceta').disabled = false
    var usuarioDoctor = sessionStorage.getItem("Usuario")
    var fecha = document.getElementById('fecha').value
    var paciente = document.getElementById('patient').value
    var illness = document.getElementById('illness').value
    var descripcion = document.getElementById('description').value
    objeto = {
      idDoctor: usuarioDoctor,
      date: fecha,
      patient: paciente,
      padecimiento: illness,
      descripcion: descripcion
    }
    documentoReceta = `
    <h2>Receta médica</h2>
    <h3>Fecha:</h3><h4> ${fecha}</h4>
    <h3>Nombre del paciente:</h3> <h4>${paciente}</h4>
    <h3>Padecimiento:</h3> <h4>${padecimiento}</h4>
    <h3>Descripción:</h3> <h4>${descripcion}</h4>
    
    `
    fetch("https://backend-ipc1-202004804.herokuapp.com/Guardar/Receta",{
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
        })
}
function generarRecetapdf(){
  html2pdf().from(documentoReceta).toPdf().save("receta.pdf");
}
function completarCita(checkbox){
  var idcita = checkbox.id
  var doctor = sessionStorage.getItem("Usuario")
  objeto = {
    idCita: idcita,
    user: doctor
  }
  fetch("http://localhost:3000/cita/completar",{
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
          window.citasAceptadas()
        })

}

