import {over} from 'stompjs';

//Es una librearia de JS. A diferencia de usar la api WebSocket para crear la conexion,
//Esta sirve para que pueda ser usada en navegadores más viejos.
import SockJS from 'sockjs-client';

var stompClient =null;


export const connect =()=>{
    let Sock = new SockJS('http://192.168.0.19:8080/ws');
    stompClient = over(Sock);
    stompClient.connect({},onConnected, onError);
}

const onConnected = () => {
    stompClient.subscribe('/topic/notification', onMessageReceived);
}

const onMessageReceived = (payload)=>{
    var payloadData = JSON.parse(payload.body);
    alert('msj del socket: '+payloadData)
}

const onError = (err) => {
    console.log("Error: "+err);
    alert(err)
}