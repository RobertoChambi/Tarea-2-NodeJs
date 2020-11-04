
var dgram = require('dgram'); //Usamos modulo dgram para crear datagramas
var client = dgram.createSocket("udp4");
var bienve = "Bienvenido al sistema LAB273"
console.log(bienve)
var condi =true;
// funcion que nos permite leer
const readline = require('readline');
const rl =  readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
 console.log("Ingrese su usuario y contraseña: ")

    rl.on('line', (Men) =>{
    client.send(Men, 0 , Men.length, 8000, 'localhost');
    rl.close();
    });
    // recepcionamos msg
    client.on('message', function (msg){
        msg=msg+'';
        var vec = msg.split(' ')
     if(vec[0]=="Bienvenido"){
        console.log(msg.toString());
        client.close(); 
     }else{
        console.log(msg.toString());
        console.log("\nIngrese su usuario y contraseña: ");
         if(vec[0]=="El"){
            rl.on('line', (Men) =>{
                client.send(Men, 0 , Men.length, 8000, 'localhost');
                rl.close();
                });
         }else{
                 rl.on('line', (Men) =>{
                client.send(Men, 0 , Men.length, 8000, 'localhost');
                rl.close();
                });
         }
     }
    });

client.on('close', function () {   
});

