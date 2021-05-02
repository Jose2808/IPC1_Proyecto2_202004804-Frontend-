let listadoEnfermeras = ""
function obtenerEnfermeras(){
    var index = 1
    var tabla = document.getElementById('listaEnfermeras')
    var cadena = ""
    fetch('https://backend-ipc1-202004804.herokuapp.com/lista-enfermeras',{
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
            <td><button value = ${response[i].user} type="button" data-toggle="modal" data-target="#inlineForm" onclick = "buscarEnfermera(this)"class="btn btn-outline-primary"> Ver perfil </button> </td>
            <td><button value = ${response[i].user} onclick = "eliminarUsuario(this)" type = "button" class="btn btn-outline-primary"> Eliminar </button> </td>
          </tr>`
          }
          tabla.innerHTML = cadena
          listadoEnfermeras = 
      `<div class="row" id="table-borderless">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Fecha de creación: ${new Date().toLocaleDateString("es-US")}</h4>
            <h3>Listado de enfermeras en el sistema</h3>
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
                  listadoEnfermeras += `<tr>
                  <td class="text-bold-500">${index}</td>
                  <td class="text-bold-500">${response[j].nombre}</td>
                  <td class="text-bold-500">${response[j].apellido}</td>
                  <td class="text-bold-500">${response[j].user}</td>
                  <td class="text-bold-500">${response[j].nacimiento}</td>
                  </tr>
                  `
                  index++
                }
                listadoEnfermeras += `</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>`
    })
}

function eliminarUsuario(button){
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
          window.obtenerEnfermeras()
        })
}

function buscarEnfermera(button){
    document.getElementById('modEnfermera').value = button.value
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
      document.getElementById('see-nurse-user').value = response.user
      document.getElementById('see-nurse-password').value = response.password
      document.getElementById('see-nurse-name').value = response.name
      document.getElementById('see-nurse-surname').value = response.surname
      document.getElementById('see-nurse-birth').value = response.birth
      document.getElementById('see-nurse-sex').value = response.sex
      document.getElementById('see-nurse-phone').value = response.phone
     })
  }

  function actualizarEnfermera(button){
    console.log(button.value)
    var user = button.value
    var newUser = document.getElementById('see-nurse-user').value
    var password = document.getElementById('see-nurse-password').value 
    var name = document.getElementById('see-nurse-name').value 
    var surname = document.getElementById('see-nurse-surname').value 
    var birth = document.getElementById('see-nurse-birth').value 
    var sex = document.getElementById('see-nurse-sex').value 
    var phone = document.getElementById('see-nurse-phone').value 
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
        window.obtenerEnfermeras()
      })
  }

  function cargaEnfermeras(){
    let archivoEnfermeras = document.getElementById('file-Nurses').files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      procesarEnfermeras(event.target.result);
    })
    reader.readAsText(archivoEnfermeras, 'UTF-8');
  }

  function procesarEnfermeras(texto){
    const textEnfermeras = document.getElementById('vistaEnfermeras')
    let listaEnfermeras = [];
  
    texto = texto.split('\n')
  
    texto.forEach(linea => {
      let enfermera_aux = linea.split(',');
      if(enfermera_aux[0] != ""){
        textEnfermeras.innerHTML +=
        `
        nombre: ${enfermera_aux[0]}, apellido: ${enfermera_aux[1]}, fecha: ${enfermera_aux[2]}, sexo: ${enfermera_aux[3]}, usuario: ${enfermera_aux[4]}, contraseña: ${enfermera_aux[5]}, teléfono: ${enfermera_aux[6]}
        `
        let enfermera = {
          name: enfermera_aux[0],
          surname: enfermera_aux[1],
          birth: enfermera_aux[2],
          sex: enfermera_aux[3],
          user: enfermera_aux[4],
          password: enfermera_aux[5],
          phone: enfermera_aux[6]
        }
        listaEnfermeras.push(enfermera)
      }
    });
    console.log(listaEnfermeras)
  
    let nuevasEnfermeras = {
      enfermeras: listaEnfermeras
    }
    fetch("https://backend-ipc1-202004804.herokuapp.com/carga-masiva/Enfermeras", {
      method: 'POST',
      body: JSON.stringify(nuevasEnfermeras),
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
    window.obtenerEnfermeras()
  }

  function reporteEnfermeras(){
    html2pdf().from(listadoEnfermeras).toPdf().save("reporte_enfermeras.pdf");
  }



