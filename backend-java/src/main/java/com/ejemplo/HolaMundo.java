package com.ejemplo;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/mensaje")
public class HolaMundo {
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getMensaje() {
        return "{\"texto\": \"¡Hola desde JAX-RS en Kubernetes!\"}";
    }
}