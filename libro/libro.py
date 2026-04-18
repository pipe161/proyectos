import tkinter as tk
from tkinter import messagebox
import sqlite3

# --- Configuración de la Base de Datos ---
def inicializar_db():
    conn = sqlite3.connect('mi_base_de_datos.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS textos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            contenido TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

# --- Funciones de Lógica ---
def guardar_en_db():
    texto = entrada.get()
    if texto.strip() == "":
        messagebox.showwarning("Error", "El campo no puede estar vacío")
        return
    
    conn = sqlite3.connect('mi_base_de_datos.db')
    cursor = conn.cursor()
    cursor.execute('INSERT INTO textos (contenido) VALUES (?)', (texto,))
    conn.commit()
    conn.close()
    
    entrada.delete(0, tk.END)
    actualizar_lista()

def actualizar_lista():
    lista_textos.delete(0, tk.END) # Limpiamos la lista actual
    conn = sqlite3.connect('mi_base_de_datos.db')
    cursor = conn.cursor()
    cursor.execute('SELECT contenido FROM textos')
    for fila in cursor.fetchall():
        lista_textos.insert(tk.END, fila[0])
    conn.close()

# --- Interfaz Gráfica ---
inicializar_db()

ventana = tk.Tk()
ventana.title("Gestor de Textos")
ventana.geometry("300x400")

tk.Label(ventana, text="Introduce un texto:").pack(pady=5)
entrada = tk.Entry(ventana, width=30)
entrada.pack(pady=5)

btn_guardar = tk.Button(ventana, text="Guardar", command=guardar_en_db)
btn_guardar.pack(pady=5)

tk.Label(ventana, text="Registros guardados:").pack(pady=(10, 0))
lista_textos = tk.Listbox(ventana, width=40, height=10)
lista_textos.pack(pady=5, padx=10)

# Cargar los datos existentes al iniciar
actualizar_lista()

ventana.mainloop()