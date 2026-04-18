package com.ejemplo;

public class User {
    private String usuario;
    private String pass;

    // Constructor vacío (obligatorio para que Jackson funcione)
    public User() {}

    // Getters y Setters
    public String getUsuario() { return usuario; }
    public void setUsuario(String usuario) { this.usuario = usuario; }

    public String getPass() { return pass; }
    public void setPass(String pass) { this.pass = pass; }
}