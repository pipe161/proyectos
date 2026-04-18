package com.ejemplo;

import javax.annotation.Priority;
import javax.ws.rs.NotAuthorizedException;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;

import io.jsonwebtoken.Jwts;

@Provider
@Priority(Priorities.AUTHENTICATION)
public class JwtFilter implements ContainerRequestFilter {
    @Override
    public void filter(ContainerRequestContext requestContext) {
        // 1. SI ES UNA PETICIÓN OPTIONS, DEJAMOS PASAR SIN VALIDAR TOKEN
        if (requestContext.getMethod().equalsIgnoreCase("OPTIONS")) {
            return;
        }
        // Excluir el path de login de la validación
        if (requestContext.getUriInfo().getPath().contains("login"))
            return;

        String authHeader = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new NotAuthorizedException("Token faltante");
        }

        String token = authHeader.substring("Bearer".length()).trim();
        try {
            // Si la firma es falsa o expiró, esto lanza una excepción
            Jwts.parser().setSigningKey(System.getenv("CLAVE_JWT").getBytes()).parseClaimsJws(token);
        } catch (Exception e) {
            requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED).build());
        }
    }
}