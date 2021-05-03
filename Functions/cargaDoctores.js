let listadoDoctores = ""
let topDoctores = ""
function obtenerDoctores(){
    var index = 1
    var tabla = document.getElementById('listaDoctores')
    var cadena = ""
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
        console.log(response[i])
        cadena +=
        `<tr>
        <td class="text-bold-500">${response[i].nombre}</td>
        <td>${response[i].apellido}</td>
        <td class="text-bold-500">${response[i].speciality}</td>
        <td><button value = ${response[i].user} type="button" data-toggle="modal" data-target="#inlineForm" onclick = "buscarDoctor(this)" class="btn btn-outline-primary"> Ver perfil </button> </td>
        <td><button value = ${response[i].user} onclick = "eliminarDoctor(this)" type = "button" class="btn btn-outline-primary"> Eliminar </button> </td>
      </tr>`
      }
      tabla.innerHTML = cadena
      listadoDoctores = 
      `<div class="row" id="table-borderless">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Fecha de creación: ${new Date().toLocaleDateString("es-US")}</h4>
            <h3>Listado de doctores en el sistema</h3>
          </div>
          <div class="card-content">
            <!-- table with no border -->
            <div class="table-responsive">
              <table class="table table-borderless mb-0">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>NOMBRE</th>
                    <th>APELLIDO</th>
                    <th>USUARIO</th>
                    <th>ESPECIALIDAD</th>
                    <th>FECHA DE NACIMIENTO</th>
                  </tr>
                </thead>
                <tbody>`
                for (var j in response){
                  listadoDoctores += `
                  <tr><td class="text-bold-500">${index}</td>
                  <td class="text-bold-500">${response[j].nombre}</td>
                  <td class="text-bold-500">${response[j].apellido}</td>
                  <td class="text-bold-500">${response[j].user}</td>
                  <td class="text-bold-500">${response[j].speciality}</td>
                  <td class="text-bold-500">${response[j].nacimiento}</td>
                  </tr>
                  `
                  index++
                }
                listadoDoctores += `</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>`
    })
}

function eliminarDoctor(button){
  console.log(button.value)
  fetch(`https://backend-ipc1-202004804.herokuapp.com/Eliminar/${button.value}`,{
      method: 'DELETE',
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
        window.obtenerDoctores()
      })
      
}

function buscarDoctor(button){
  document.getElementById('modDoctor').value = button.value
  var usuario = button.value
  fetch(`https://backend-ipc1-202004804.herokuapp.com/Doctor/${usuario}`,{
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
    document.getElementById('see-doctor-user').value = response.user
    document.getElementById('see-doctor-password').value = response.password
    document.getElementById('see-doctor-name').value = response.name
    document.getElementById('see-doctor-surname').value = response.surname
    document.getElementById('see-doctor-speciality').value = response.speciality
    document.getElementById('see-doctor-birth').value = response.birth
    document.getElementById('see-doctor-sex').value = response.sex
    document.getElementById('see-doctor-phone').value = response.phone
   })
}


function modificarDoctor(button){
  console.log("Me estas presionando")
  console.log(button.value)
  var user = button.value
  var newUser = document.getElementById('see-doctor-user').value
  var password = document.getElementById('see-doctor-password').value 
  var speciality = document.getElementById('see-doctor-speciality').value 
  var name = document.getElementById('see-doctor-name').value 
  var surname = document.getElementById('see-doctor-surname').value 
  var birth = document.getElementById('see-doctor-birth').value 
  var sex = document.getElementById('see-doctor-sex').value 
  var phone = document.getElementById('see-doctor-phone').value 
  var objeto = {
    'name': name,
    'surname': surname,
    'speciality': speciality,
    'birth': birth,
    'sex': sex,
    'user': user,
    'newUser': newUser,
    'password': password,
    'phone': phone
  }
  fetch("https://backend-ipc1-202004804.herokuapp.com/modificar-perfil/Doctor",{
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
    window.obtenerDoctores()
}

function cargaDoctores(){
  let archivoDoctores = document.getElementById('file-Doctors').files[0];
  const reader = new FileReader();
  reader.addEventListener('load', (event) => {
    procesarDoctores(event.target.result);
  })
  reader.readAsText(archivoDoctores, 'UTF-8');
}

function procesarDoctores(texto){
  const textDoctores = document.getElementById('vistaDoctores')
  let listaDoctores = [];

  texto = texto.split('\n')

  texto.forEach(linea => {
    let doctores_aux = linea.split(',');
    if(doctores_aux[0] != ""){
      textDoctores.innerHTML +=
      `
      nombre: ${doctores_aux[0]}, apellido: ${doctores_aux[1]}, fecha: ${doctores_aux[2]}, sexo: ${doctores_aux[3]}, especialidad:${doctores_aux[4]}, usuario: ${doctores_aux[5]}, contraseña: ${doctores_aux[6]}, teléfono: ${doctores_aux[7]}
      `
      let doctor = {
        name: doctores_aux[0],
        surname: doctores_aux[1],
        birth: doctores_aux[2],
        sex: doctores_aux[3],
        speciality: doctores_aux[4],
        user: doctores_aux[5],
        password: doctores_aux[6],
        phone: doctores_aux[7]
      }
      listaDoctores.push(doctor)
    }
  });
  console.log(listaDoctores)
  let nuevosDoctores = {
    doctores: listaDoctores
  }
  fetch("https://backend-ipc1-202004804.herokuapp.com/carga-masiva/Doctores", {
    method: 'POST',
    body: JSON.stringify(nuevosDoctores),
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(res => res.json())
  .catch(err => {
    console.error('Error:', err)
    alert("Ocurrió un error, ver la consola")
  })
  .then(response =>{
    console.log(response.Mensaje)
    alert("Carga masiva realizada con éxito")
  })
  window.obtenerDoctores();
}

function reporteDoctores(){
  html2pdf().from(listadoDoctores).toPdf().save("reporte_doctores.pdf");
}

function topMedicos(){
  var index = 1
  fetch(`https://backend-ipc1-202004804.herokuapp.com/top-doctores`,{
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
      try{
        topDoctores =   `<div class="row" id="table-borderless">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">Fecha de creación: ${new Date().toLocaleDateString("es-US")}</h4>
              <h3>Doctores con más citas atendidas</h3>
            </div>
            <div class="card-content">
              <!-- table with no border -->
              <div class="table-responsive">
                <table class="table table-borderless mb-0">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>NOMBRE</th>
                      <th>CITAS ATENDIDAS</th>
                      
                    </tr>
                  </thead>
                  <tbody>`
                  for (var j = 0; j < 3; j++){
                    topDoctores +=
                     `
                    <tr><td class="text-bold-500">${index}</td>
                    <td class="text-bold-500">${response[j].Nombre}</td>
                    <td class="text-bold-500">${response[j].Citas}</td>
                    </tr>
                    `
                    index++
                  }
                  topDoctores += `</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>`
      imprimirTopDoctores(topDoctores)
      } catch {
        index = 1
        topDoctores =   `<div class="row" id="table-borderless">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">Fecha de creación: ${new Date().toLocaleDateString("es-US")}</h4>
              <h3>Doctores con más citas atendidas</h3>
            </div>
            <div class="card-content">
              <!-- table with no border -->
              <div class="table-responsive">
                <table class="table table-borderless mb-0">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>NOMBRE</th>
                      <th>CITAS ATENDIDAS</th>
                      
                    </tr>
                  </thead>
                  <tbody>`
                  for (var j in response){
                    topDoctores +=
                     `
                    <tr><td class="text-bold-500">${index}</td>
                    <td class="text-bold-500">${response[j].Nombre}</td>
                    <td class="text-bold-500">${response[j].Citas}</td>
                    </tr>
                    `
                    index++
                  }
                  topDoctores += `</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>`
      imprimirTopDoctores(topDoctores)
      }
    })
}

function imprimirTopDoctores(texto){
  html2pdf().from(texto).toPdf().save("top_doctores.pdf")
}

