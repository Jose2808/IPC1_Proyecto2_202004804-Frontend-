var documentoCompra = ""
function crearCita(){
  var user = sessionStorage.getItem("Usuario")
  var date = document.getElementById('date').value
  var hour = document.getElementById('hour').value
  var motive = document.getElementById('motive').value
  var objeto = {
    'user': user,
    'date': date,
    'hour': hour,
    'motive': motive
  }
  fetch("https://backend-ipc1-202004804.herokuapp.com/Usuario/Crear-cita",{
    method: 'POST',
    body: JSON.stringify(objeto),
    headers:{
      'content-type':'application/json',
      'Access-Control-Allow-Origin':'*',}})
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

function citasUsuario(){
    var user = sessionStorage.getItem("Usuario")
    var tabla = document.getElementById('listaCitas')
    var cadena = ""
    fetch(`https://backend-ipc1-202004804.herokuapp.com/Usuario/citas/${user}`,{
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
            for (var i in response){
                console.log(response[i])
                cadena += 
                `<tr>
                <td class="text-bold-500">${response[i].date}</td>
                <td>${response[i].hour}</td>
                <td class="text-bold-500">${response[i].motive}</td>
                <td class="text-bold-500">${response[i].estado}</td>
              </tr>`
              }
              tabla.innerHTML = cadena
         })

}


function obtenerCompra(){
  var compraActual = []
  var compra = document.getElementById('compra')
  document.getElementById('generarCom').disabled = false
  var total = 0
  documentoCompra = 
  `<div class="row" id="table-borderless">
  <div class="col-12">
    <div class="card">
      <div class="card-header">
        <h4 class="card-title">Fecha de creación: ${new Date().toLocaleDateString("es-US")}</h4>
        <h3>Comprobante de compra</h3>
      </div>
      <div class="card-content">
        <!-- table with no border -->
        <div class="table-responsive">
          <table class="table table-borderless mb-0">
            <thead>
              <tr>
                <th>PRODUCTO</th>
                <th>DESCRIPCION</th>
                <th>CANTIDAD</th>
                <th>PRECIO TOTAL(Q)</th>
              </tr>
            </thead>
            <tbody>`
            for(var k = 0, l = compra.rows.length; k<l; k++){
              documentoCompra += `
              <tr><td class="text-bold-500">${compra.rows[k].cells[0].innerHTML}</td>
              <td class="text-bold-500">${compra.rows[k].cells[1].innerHTML}</td>
              <td class="text-bold-500">${compra.rows[k].cells[2].innerHTML}</td>
              <td class="text-bold-500">${compra.rows[k].cells[3].innerHTML}</td></tr>
            `
            total = total + parseFloat(compra.rows[k].cells[3].innerHTML)
            }
            documentoCompra += `</tbody>
          </table>
          <h4 class="card-title">Total a pagar: ${total}</h4>
        </div>
      </div>
    </div>
  </div>
</div>`
  for( var i = 0, j = compra.rows.length; i < j; i++){
    let medicamentoComprado = {
      name: compra.rows[i].cells[0].innerHTML,
      description: compra.rows[i].cells[1].innerHTML,
      amount: compra.rows[i].cells[2].innerHTML
    }
    compraActual.push(medicamentoComprado)
  }
  let listadoCompras = {
    listaCompras: compraActual
  }

  fetch("https://backend-ipc1-202004804.herokuapp.com/Procesar-compra", {
    method: 'POST',
    body: JSON.stringify(listadoCompras),
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
    alert("Pedido procesado con éxito")
  })
}

function generarComprobante(){
  html2pdf().from(documentoCompra).toPdf().save("comprobante_pago.pdf");
}
