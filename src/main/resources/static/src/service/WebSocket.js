import { over } from "stompjs";

//Es una librearia de JS. A diferencia de usar la api WebSocket para crear la conexion,
//Esta sirve para que pueda ser usada en navegadores más viejos.
import SockJS from "sockjs-client";

var stompClient = null;

const WebSocket = ({ mensajeRecibido }) => {
  const connect = () => {
    if(stompClient===null){
        let Sock = new SockJS("http://192.168.0.19:8080/ws");
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }
  };

  const onConnected = () => {
    stompClient.subscribe("/topic/notification", onMessageReceived);
  };

  const onMessageReceived = (payload) => {
    return mensajeRecibido(payload);
  };

  const onError = (err) => {
    console.log("Error: " + err);
    alert(err);
  };

  connect();
};
export default WebSocket;
