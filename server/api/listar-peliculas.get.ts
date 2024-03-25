import { Pelicula } from "../models/pelicula.model"

export default defineEventHandler(async (event) => {
    return {
        peliculas: await Pelicula.find()
    }
})