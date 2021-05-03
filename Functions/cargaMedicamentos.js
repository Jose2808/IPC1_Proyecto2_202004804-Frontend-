var listadoMedicamentos = ""
var topMedicinas =""
function obtenerMedicamentos(){
    var index = 1
    var tabla = document.getElementById('listaMedicamentos')
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
        console.log(response[i])
        cadena += 
        `<tr>
        <td class="text-bold-500">${response[i].name}</td>
        <td>${response[i].description}</td>
        <td><button value = "${response[i].name}" type="button" data-toggle="modal" data-target="#inlineForm"  onclick = "buscarMedicamento(this)" class="btn btn-outline-primary"> Ver detalles </button> </td>
        <td><button value = "${response[i].name}" type = "button" onclick = "eliminarMedicamento(this)" class="btn btn-outline-primary"> Eliminar </button> </td>
      </tr>`
      }
      tabla.innerHTML = cadena
      listadoMedicamentos = 
      `<div class="row" id="table-borderless">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Fecha de creación: ${new Date().toLocaleDateString("es-US")}</h4>
            <h3>Listado de medicamentos en el sistema</h3>
          </div>
          <div class="card-content">
            <!-- table with no border -->
            <div class="table-responsive">
              <table class="table table-borderless mb-0">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>NOMBRE</th>
                    <th>DESCRIPCION</th>
                    <th>PRECIO</th>
                    <th>EXISTENCIAS</th>
                  </tr>
                </thead>
                <tbody>`
                for (var j in response){
                  listadoMedicamentos += `
                  <tr>
                  <td class="text-bold-500">${index}</td>
                  <td class="text-bold-500">${response[j].name}</td>
                  <td class="text-bold-500">${response[j].description}</td>
                  <td class="text-bold-500">${response[j].price}</td>
                  <td class="text-bold-500">${response[j].amount}</td>
                  </tr>
                  `
                  index++
                }
                listadoMedicamentos += `</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>`
    })
}

function buscarMedicamento(button){
    document.getElementById('modificarMedicamento').value = button.value
    var medicamento = button.value
    fetch(`https://backend-ipc1-202004804.herokuapp.com/Medicamentos/${medicamento}`,{
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
      document.getElementById('see-name').value = response.name
      document.getElementById('see-description').value = response.description
      document.getElementById('see-price').value = response.price
      document.getElementById('see-amount').value = response.cantidad
     })
  }

  function eliminarMedicamento(button){
    console.log(button.value)
    fetch(`https://backend-ipc1-202004804.herokuapp.com/Eliminar/Medicamentos/${button.value}`,{
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
        window.obtenerMedicamentos()
}

function cargaMedicamentos(){
  let archivoMedicamentos = document.getElementById('file-drugs').files[0];
  const reader = new FileReader();
  reader.addEventListener('load', (event) => {
    procesarMedicamentos(event.target.result);
  })
  reader.readAsText(archivoMedicamentos, 'UTF-8');
}
function procesarMedicamentos(texto){
  const textMedicamentos = document.getElementById('vistaMedicamentos')
    let listaMedicamentos = [];
  
    texto = texto.split('\n')

    texto.forEach(linea => {
      let medicamentos_aux = linea.split(',');
      if(medicamentos_aux[0] != ""){
        textMedicamentos.innerHTML +=
        `
        nombre: ${medicamentos_aux[0]}, precio: ${medicamentos_aux[1]}, descripcion: ${medicamentos_aux[2]}, cantidad: ${medicamentos_aux[3]}
        `
        let medicamento = {
          name: medicamentos_aux[0],
          price: medicamentos_aux[1],
          description: medicamentos_aux[2],
          amount: medicamentos_aux[3]
        }
        listaMedicamentos.push(medicamento)
      }
    });
    console.log(listaMedicamentos)

    let nuevosMedicamentos = {
      medicamentos: listaMedicamentos
    }
    fetch("https://backend-ipc1-202004804.herokuapp.com/carga-masiva/Medicamentos", {
      method: 'POST',
      body: JSON.stringify(nuevosMedicamentos),
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
    window.obtenerMedicamentos()
  
}

function reporteMedicamentos(){
  html2pdf().from(listadoMedicamentos).toPdf().save("reporte_medicamentos.pdf")
}

function topMedicamentos(){
  var index = 1
  fetch(`https://backend-ipc1-202004804.herokuapp.com/top-5-medicamentos`,{
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
          topMedicinas =   `<div class="row" id="table-borderless">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h4 class="card-title">Fecha de creación: ${new Date().toLocaleDateString("es-US")}</h4>
                <h3>Top 5 medicamentos más vendidos</h3>
              </div>
              <div class="card-content">
                <!-- table with no border -->
                <div class="table-responsive">
                  <table class="table table-borderless mb-0">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>ID</th>
                        <th>NOMBRE</th>
                        <th>UNIDADES VENDIDAS</th>
                        
                      </tr>
                    </thead>
                    <tbody>`
                    for (var j = 0; j < 5; j++){
                      topMedicinas +=
                       `
                      <tr><td class="text-bold-500">${index}</td>
                      <td class="text-bold-500">${response[j].id}</td>
                      <td class="text-bold-500">${response[j].medicamento}</td>
                      <td class="text-bold-500">${response[j].cantidad}</td>
                      </tr>
                      `
                      index++
                    }
                    topMedicinas += `</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>`
        imprimirTop(topMedicinas)
        } catch {
          index = 1
          topMedicinas =   `<div class="row" id="table-borderless">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h4 class="card-title">Fecha de creación: ${new Date().toLocaleDateString("es-US")}</h4>
                <h3>Top 5 medicamentos más vendidos</h3>
              </div>
              <div class="card-content">
                <!-- table with no border -->
                <div class="table-responsive">
                  <table class="table table-borderless mb-0">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>ID</th>
                        <th>NOMBRE</th>
                        <th>UNIDADES VENDIDAS</th>
                        
                      </tr>
                    </thead>
                    <tbody>`
                    for (var j in response){
                      topMedicinas +=
                       `
                      <tr><td class="text-bold-500">${index}</td>
                      <td class="text-bold-500">${response[j].id}</td>
                      <td class="text-bold-500">${response[j].medicamento}</td>
                      <td class="text-bold-500">${response[j].cantidad}</td>
                      </tr>
                      `
                      index++
                    }
                    topMedicinas += `</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>`
        imprimirTop(topMedicinas)
        }
     })

}

function imprimirTop(texto){
  html2pdf().from(texto).toPdf().save("top_medicamentos.pdf")
}