import { over } from "stompjs";
import { URL, webSocketEndpoint,destMessageWS} from "./Configuracion";

//Es una librearia de JS. A diferencia de usar la api WebSocket para crear la conexion,
//Esta sirve para que pueda ser usada en navegadores más viejos.
import SockJS from "sockjs-client";

var stompClient = null;

const WebSocket = ({ mensajeRecibido }) => {
  const connect = () => {
    if(stompClient===null){
        let Sock = new SockJS(URL+webSocketEndpoint);
        stompClient = over(Sock);
        stompClient.debug = false;
        stompClient.connect({}, onConnected, onError);
    }
  };

  const onConnected = () => {
    stompClient.subscribe(destMessageWS, onMessageReceived);
  };

  const onMessageReceived = (payload) => {
    return mensajeRecibido(payload);
  };

  const onError = (err) => {
    console.log("Error: " + err);
  };

  connect();
};
export default WebSocket;
