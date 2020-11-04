const { info } = require('console'); 
var dgram = require('dgram');       //creamos datagrama 
var server = dgram.createSocket("udp4");    //Socket de tipo UDP4
var Nombres =["Dan Israel Copa Lupe", "Roberto Carlos Chambi Calizaya", "Maria René Davalos Cuenca"]
var usuarios = ["danis", "roca","mare"]
var passwords = ["dan123", "roy64","2843g"]

// Recibimos mensaje del cliente
server.on("message", function (msg, client) {
    
    console.log("Cliente conectado: "+ msg);
    msg= msg+'';
    var datos = msg.split('/')
    const posi = Vusuario(datos[0]);
    const posic = Vpass(datos[1]);
    var Mcli = ''
    if (posi==posic && posic != 3){
        Mcli = "Bienvenido "+Nombres[posi];
        //client.close();
    }else{
        if(posi<3){
            Mcli = "La contraseña para "+ datos[0]+" es incorrecta."
        }else{
            if(posic<3)
                Mcli ="El usuario "+datos[0]+ " es incorrecto o no existe."
            else
                Mcli = "No existe usuario ni contraseña."
        }
    }
    server.send(Mcli, 0, Mcli.length, client.port, client.address, function () {
    });
    
});
function Vusuario(user){ //Funcion que verifica si existe el nombre de ususrio
    var res = 3;
    for (let index = 0; index < usuarios.length; index++) {
        const element = usuarios[index];
        if(element==user){
            res=index;
            break;
        }
        else
            res=3;
    }
    return res;
}
function Vpass(passw){  //funcion que verifica si existe password
    var res = 3;
    for (let index = 0; index < passwords.length; index++) {
        const element = passwords[index];
        if(element==passw){
            res=index;
            break;
        }
        else
            res=3;
    }
    return res;
}
// modulo listening nos permite iniciar la conexion mediante un puerto.
server.on('listening', function () {
    var address = server.address();
    console.log('***Servidor iniciado en el puerto: ' + address.port);
});
server.bind(8000); 