package com.ejemplo;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Collections;
import java.util.Date;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Path("/login")
public class LoginResource {

    private final String KEY = System.getenv("CLAVE_JWT");

    @POST
    @Consumes(MediaType.APPLICATION_JSON) // <--- ESTO ES VITAL
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(User usuario) {
        Key key = Keys.hmacShaKeyFor(KEY.getBytes(StandardCharsets.UTF_8));
        // En un caso real, validas contra DB aquí
        if ("admin".equals(usuario.getUsuario()) && "1234".equals(usuario.getPass())) {
            String token = Jwts.builder()
                    .setSubject(usuario.getUsuario())
                    .claim("rol", "admin") // Payload: metemos el rol
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + 3600000))
                    .signWith(key)
                    .compact();
            return Response.ok(Collections.singletonMap("token", token)).build();
        }
        return Response.status(Response.Status.UNAUTHORIZED).build();
    }
}