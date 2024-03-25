import { defineStore } from "pinia";
import { Pelicula } from '../server/models/pelicula.model';
interface IState {
    peliculas: IPelicula[],
    peliculaActual: IPelicula | null
}

export const usePeliculaStore = defineStore('peliculas', {
    state: (): IState => ({
        peliculas: [],
        peliculaActual: null
    }),
    actions: {
        async obtenerPeliculas() {
            const { data, error } = await useFetch('/api/listar-peliculas')
            this.peliculas = (data.value as any).peliculas
        },
        async Agregar(body: { nombre: string, descripcion: string }) {
            const { data, error } = await useFetch('/api/agregar-pelicula', {
                method: 'POST',
                body
            })
            navigateTo('/')
        },
        async Actualizar(body: Pelicula) {
            const { data, error } = await useFetch('/api/actualizar-pelicula', {
                method: 'PATCH',
                body
            })
            navigateTo('/')
        },
        async eliminar(id: string) {
            const { data, error } = await useFetch(`/api/eliminar-pelicula/${id}`, {
                method: 'DELETE'
            })
            this.peliculas = this.peliculas.filter(x => x._id !== id)
        },
        setPeliculaActual(pelicula: IPelicula | null) {
            this.peliculaActual = pelicula
        }

    }
})