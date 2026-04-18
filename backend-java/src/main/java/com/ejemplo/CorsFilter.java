package com.ejemplo;

import java.io.IOException;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.ext.Provider;

@Provider
public class CorsFilter implements ContainerResponseFilter {

    @Override
    public void filter(ContainerRequestContext requestContext, 
                       ContainerResponseContext responseContext) throws IOException {
        
        // Permitimos el acceso desde cualquier origen (en desarrollo es lo más cómodo)
        responseContext.getHeaders().add("Access-Control-Allow-Origin", "*");
        
        // Cabeceras permitidas (Authorization es vital para el JWT)
        responseContext.getHeaders().add("Access-Control-Allow-Headers", 
            "origin, content-type, accept, authorization");
        
        // Métodos permitidos
        responseContext.getHeaders().add("Access-Control-Allow-Methods", 
            "GET, POST, PUT, DELETE, OPTIONS, HEAD");
        
        // Exponemos las cabeceras que el cliente puede leer
        responseContext.getHeaders().add("Access-Control-Expose-Headers", "Authorization");
        
        // Tiempo que el navegador puede cachear esta respuesta de CORS (opcional)
        responseContext.getHeaders().add("Access-Control-Max-Age", "1209600");
    }
}