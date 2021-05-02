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
    <section id="basic-vertical-layouts">
        <div class="row match-height">
            <div class="col-md-6 col-12">
            <div class="card">
                <div class="card-content">
                <div class="card-body">
                  <h4 class="card-title">Fecha de creación: ${new Date().toLocaleDateString("es-US")}</h4>
                  <h3>Receta médica</h3>
                    <form class="form form-vertical">
                    <div class="form-body">
                        <div class="row">
                        <div class="col-12">
                            <div class="form-group">
                            <label for="first-name-vertical">Paciente</label>
                            <input type="text"  class="form-control" name="fname" value = ${paciente}>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="form-group">
                            <label for="contact-info-vertical">Padecimiento</label>
                            <input type="text" class="form-control" name="contact" value=${illness}>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="form-group">
                            <label for="password-vertical">Descripcion</label>
                            <input type="text" class="form-control" name="contact" value =${descripcion}>
                            </div>
                        </div>
                        </div>
                    </div>
                    </form>
                </div>
                </div>
            </div>
            </div>
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
  fetch("https://backend-ipc1-202004804.herokuapp.com/cita/completar",{
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

