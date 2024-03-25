<template>
  <VContainer>
    <VRow>
      <VCol>
        <VBtn icon="mdi-plus" @click="navigateTo('/formularioPelicula')" />
      </VCol>
    </VRow>
    <VRow>
      <VCol>
        <VTable>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Aciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in peliculas" :key="i">
              <td>{{ i.nombre }}</td>
              <td>{{ i.descripcion }}</td>
              <td>
                <VBtn
                  variant="text"
                  color="warning"
                  icon="mdi-eye"
                  @click="editarFormulario(i)"
                />
                <VBtn
                  variant="text"
                  color="error"
                  icon="mdi-delete"
                 @click="eliminar(i._id)"
                />
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

const peliculaStore = usePeliculaStore();
const { obtenerPeliculas,eliminar, setPeliculaActual } = peliculaStore;
const { peliculas } = storeToRefs(peliculaStore);

await obtenerPeliculas();

const editarFormulario=(pelicula:IPelicula)=>{
    setPeliculaActual(pelicula)
    navigateTo('/formularioPelicula')
}
</script>

<style scoped></style>
