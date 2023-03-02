package com.sistemaProductos.SistemaProductos.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        //Prefijo para conectarse con el controlador
        registry.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        //Todos los que quieran establecer una conexion con este webSocket deberán establcer la URL con ws
        //Es decir para establcer la conexion será http:localhost:8080/ws
        registry.addEndpoint("/ws").setAllowedOriginPatterns("*").withSockJS();
    }
}
