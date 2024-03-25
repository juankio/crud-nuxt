import { Schema, model } from "mongoose";

const PeliculasSchema = new Schema({
    nombre: String,
    descripcion: String,
})

export const Pelicula = model('peliculas', PeliculasSchema)