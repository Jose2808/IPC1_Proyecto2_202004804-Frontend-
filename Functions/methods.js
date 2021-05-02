function registroPaciente(event){
    event.preventDefault();
    var nombre = document.getElementById('first-name-column').value
    var apellido = document.getElementById('last-name-column').value
    var nacimiento = document.getElementById('date').value
    var genero = document.getElementById('genero').value
    var user = document.getElementById('username-column').value
    var password = document.getElementById('password-column').value
    var phone = document.getElementById('phone-column').value
    var objeto = {
        'name': nombre,
        'surname': apellido,
        'birth': nacimiento,
        'sex': genero,
        'user': user,
        'password': password,
        'phone': phone
    }
    console.log(objeto)
    fetch("https://backend-ipc1-202004804.herokuapp.com/registroPaciente",{
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
        console.log(response);
        alert(response.Mensaje)
        localStorage.setItem("Usuario", JSON.stringify(response))
        location.href = "auth-login.html"
    })

}

function login(event){
    event.preventDefault();
    var usuario = document.getElementById('username').value
    var password = document.getElementById('password').value
    sessionStorage.setItem("Usuario", usuario)
    var objeto = {
      'user': usuario,
      'password': password
    }
    console.log(sessionStorage.getItem("Usuario"))
    fetch("https://backend-ipc1-202004804.herokuapp.com/login",{
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
          console.log(response);
          alert(response.Mensaje)
          var objetoRespuesta = {
            'Mensaje': response.Mensaje,
            'User': response.User,
            'Tipo': response.Tipo,
            'Exist': response.Exist
          }
          if (objetoRespuesta.Exist == true) {
            if(objetoRespuesta.Tipo == 0){
              location.href = "AdminPacientes.html"
            }else if(objetoRespuesta.Tipo == 1){
              location.href = "PatientModule.html"
            }else if(objetoRespuesta.Tipo == 2){
              location.href = "NurseModule.html"
            }else if(objetoRespuesta.Tipo == 3){
              location.href = "DoctorModule.html"
            }
          }

          console.log(objetoRespuesta)
    })
}

function obtenerUsuario(){
    var user = sessionStorage.getItem("Usuario")
    fetch(`https://backend-ipc1-202004804.herokuapp.com/Usuario/${user}`,{
    method: 'GET',
    headers:{
      'content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',}})
    .then(res => res.json())
    .catch(err=> {
      console.error('Error:', err)
      alert("Ocurrió un error, ver la consola")
    })
    .then(response =>{
      console.log(response);
      window.onload = obtenerUsuario()
    })
}

function buscarUsuarioLog(){
  var user = sessionStorage.getItem("Usuario")
  fetch(`https://backend-ipc1-202004804.herokuapp.com/Usuario/${user}`,{
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
    document.getElementById('myUser').value = response.user
    document.getElementById('myPassword').value = response.password
    document.getElementById('myName').value = response.name
    document.getElementById('mySurname').value = response.surname
    document.getElementById('myBirth').value = response.birth
    document.getElementById('myGenre').value = response.sex
    document.getElementById('myPhone').value = response.phone
   })
}

function modificarUsuarioLog(){
  var user = sessionStorage.getItem("Usuario")
  var newUser = document.getElementById('myUser').value
  var password = document.getElementById('myPassword').value 
  var name = document.getElementById('myName').value 
  var surname = document.getElementById('mySurname').value 
  var birth = document.getElementById('myBirth').value 
  var sex = document.getElementById('myGenre').value 
  var phone = document.getElementById('myPhone').value 
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
  console.log(objeto)
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
      if(response.status == 'OK'){
        sessionStorage.setItem("Usuario", response.user)
      }
    })
}

function buscarDoctorLog(){
  var user = sessionStorage.getItem("Usuario")
  fetch(`https://backend-ipc1-202004804.herokuapp.com/Doctor/${user}`,{
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
    document.getElementById('myUser').value = response.user
    document.getElementById('myPassword').value = response.password
    document.getElementById('myName').value = response.name
    document.getElementById('mySurname').value = response.surname
    document.getElementById('myBirth').value = response.birth
    document.getElementById('mySpeciality').value = response.speciality
    document.getElementById('myGenre').value = response.sex
    document.getElementById('myPhone').value = response.phone
   })
}



function modificarDoctorLog(){
  var user = sessionStorage.getItem("Usuario")
  var newUser = document.getElementById('myUser').value
  var password = document.getElementById('myPassword').value 
  var name = document.getElementById('myName').value 
  var surname = document.getElementById('mySurname').value 
  var birth = document.getElementById('myBirth').value 
  var speciality = document.getElementById('mySpeciality').value
  var sex = document.getElementById('myGenre').value 
  var phone = document.getElementById('myPhone').value 
  var objeto = {
    'name': name,
    'surname': surname,
    'birth': birth,
    'speciality': speciality,
    'sex': sex,
    'user': user,
    'newUser': newUser,
    'password': password,
    'phone': phone
  }
  console.log(objeto)
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
      if(response.status == 'OK'){
        sessionStorage.setItem("Usuario", response.user)
      }
    })
}
