let socket = io();
let input = document.getElementById('inputtext');
let output = document.getElementById('output');
let send = document.getElementById('send');
let username = document.getElementById('username');
let user = null;
socket.on('listenserver', function(data){
    output.innerHTML += data.message + '<br>';
}
);
let form_data = document.getElementById('data_user');
form_data.addEventListener('submit', function(e){
    e.preventDefault();
    user = {
        name : e.target[0].value,
        email : e.target[1].value
    }
    if(user.name === '' || user.email === ''){
        alert('Please fill all the fields');
        window.location.reload();
    }
    socket.IO();
    socket.emit('addUser', user); 
    // socket.emit('listenclient', {
    //     message: input.value,
    //     username: username.value
    // });
    //input.value = '';
  //  readSocket(){
        
   // }
});
