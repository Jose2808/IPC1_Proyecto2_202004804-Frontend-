let listadoPacientes = ""

function obtenerPacientes(){
    var index = 1
    var tabla = document.getElementById('listaPacientes')
    var cadena = ""
    fetch('https://backend-ipc1-202004804.herokuapp.com/lista-pacientes',{
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
        <td class="text-bold-500">${response[i].user}</td>
        <td><button value = "${response[i].user}" type="button" data-toggle="modal" data-target="#inlineForm"  onclick = "buscarUsuario(this)" class="btn btn-outline-primary"> Ver perfil </button> </td>
        <td><button value = "${response[i].user}" onclick = "eliminarUsuario(this)" type = "button" class="btn btn-outline-primary"> Eliminar </button> </td>
      </tr>`
      }
      tabla.innerHTML = cadena
      listadoPacientes = 
    `<div class="row" id="table-borderless">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">Fecha de creación: ${new Date().toLocaleDateString("es-US")}</h4>
          <h3>Listado de pacientes en el sistema</h3>
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
                  <th>FECHA DE NACIMIENTO</th>
                </tr>
              </thead>
              <tbody>`
              for (var j in response){
                listadoPacientes += `
                <tr><td class="text-bold-500">${index}</td>
                <td class="text-bold-500">${response[j].nombre}</td>
                <td class="text-bold-500">${response[j].apellido}</td>
                <td class="text-bold-500">${response[j].user}</td>
                <td class="text-bold-500">${response[j].nacimiento}</td>
                </tr>
                `
                index++
              }
              listadoPacientes += `</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>`
    })
}

function buscarUsuario(button){
  document.getElementById('modificarPaciente').value = button.value
  var usuario = button.value
  fetch(`https://backend-ipc1-202004804.herokuapp.com/Usuario/${usuario}`,{
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
    console.log("Estoy siendo presionado")
    document.getElementById('see-user').value = response.user
    document.getElementById('see-password').value = response.password
    document.getElementById('see-name').value = response.name
    document.getElementById('see-surname').value = response.surname
    document.getElementById('see-birth').value = response.birth
    document.getElementById('see-sex').value = response.sex
    document.getElementById('see-phone').value = response.phone
   })
}

function eliminarUsuario(button){
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
        })
        window.obtenerPacientes()
}

function actualizarPacientes(button){
  console.log(button.value)
  var user = button.value
  var newUser = document.getElementById('see-user').value
  var password = document.getElementById('see-password').value 
  var name = document.getElementById('see-name').value 
  var surname = document.getElementById('see-surname').value 
  var birth = document.getElementById('see-birth').value 
  var sex = document.getElementById('see-sex').value 
  var phone = document.getElementById('see-phone').value 
  var objeto = {
    'name': name,
    'surname': surname,
    'birth': birth,
    'sex': sex,
    'user': user,
    'newUser': newUser,
    'password': password,
    'phone': phone
  }
  fetch("https://backend-ipc1-202004804.herokuapp.com/modificar-perfil",{
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
      window.obtenerPacientes()
    })


}

function obtenerMedicamentos(){
  var tabla = document.getElementById('medicinas')
  var cadena = ""
  fetch('https://backend-ipc1-202004804.herokuapp.com/Medicamentos',{
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
      <td class="text-bold-500">${response[i].name}</td>
      <td>${response[i].description}</td>
      <td class="text-bold-500">${response[i].price}</td>
      <td><input type="number" id= ${response[i].name} class="form-control" name="contact"
      placeholder="Cantidad"></td>
      <td><button value = ${response[i].name} type="button" onclick = "comprarMedicina(this)"  class="btn btn-outline-primary"> Agregar </button> </td>
    </tr>`
    }
    tabla.innerHTML = cadena
  })
}

function eliminarCompra(button){
  var compra = document.getElementById('compra')
  for(var i = 0, j = compra.rows.length; i< j; i++){
    if (compra.rows[i].cells[0].innerHTML == button.value){
      compra.deleteRow(i);
    }
  }
}


function comprarMedicina(button){
  var cadenaCompra = ""
  medicina = button.value
  var cantidad = document.getElementById(button.value)
  var tabla = document.getElementById('compra')
  console.log("Estoy siendo presionado")
  fetch(`https://backend-ipc1-202004804.herokuapp.com/Medicamentos/${medicina}`,{
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
    cadenaCompra = 
    `<tr>
    <td class="text-bold-500" id = ${response.name} >${response.name}</td>
    <td>${response.description}</td>
    <td idl = ${response.value}>${cantidad.value}</td>
    <td class="text-bold-500">${cantidad.value*response.price}</td>
    <td><button value = ${response.name} type="button" onclick = "eliminarCompra(this)" class="btn btn-outline-primary"> Remover </button> </td>
    </tr>`
    tabla.innerHTML += cadenaCompra
  })
}

function cargaPacientes(){
  let archivoPacientes = document.getElementById('file-Patients').files[0];
  const reader = new FileReader();
  reader.addEventListener('load', (event) => {
    procesarPacientes(event.target.result);
  })
  reader.readAsText(archivoPacientes, 'UTF-8');
}

function procesarPacientes(texto){
  const textPacientes = document.getElementById('vistaPacientes')
  let listaPacientes = [];
  console.log(texto)

  texto = texto.split('\n')

  texto.forEach(linea => {
    let paciente_aux = linea.split(',');
    if(paciente_aux[0] != ""){
      textPacientes.innerHTML +=
      `
      nombre: ${paciente_aux[0]}, apellido: ${paciente_aux[1]}, fecha: ${paciente_aux[2]}, sexo: ${paciente_aux[3]}, usuario: ${paciente_aux[4]}, contraseña: ${paciente_aux[5]}, teléfono: ${paciente_aux[6]}
      `
      let paciente = {
        name: paciente_aux[0],
        surname: paciente_aux[1],
        birth: paciente_aux[2],
        sex: paciente_aux[3],
        user: paciente_aux[4],
        password: paciente_aux[5],
        phone: paciente_aux[6]
      }
      listaPacientes.push(paciente)
    }
  });
  console.log(listaPacientes)

  let nuevosPacientes = {
    pacientes: listaPacientes
  }
  fetch("https://backend-ipc1-202004804.herokuapp.com/carga-masiva/Pacientes", {
    method: 'POST',
    body: JSON.stringify(nuevosPacientes),
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
  window.obtenerPacientes()
}

function reportePacientes(){
  html2pdf().from(listadoPacientes).toPdf().save("reporte_usuarios.pdf");
}