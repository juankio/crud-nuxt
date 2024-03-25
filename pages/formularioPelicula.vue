<template>
  <VContainer class="centrar">
    <VCard width="450" class="ma-auto">
      <VCardTitle class="text-center"> {{ titulo }} Pelicula Favorita </VCardTitle>
      <VCardText>
        <VForm @submit.prevent="procesarFormulario">
          <VTextField v-model="campos.nombre" label="Nombre" />
          <VTextField v-model="campos.descripcion" label="Descripcion" />
          <VBtn color="success" type="submit" block :loading="cargando">
            {{ titulo }}</VBtn
          >
          <VBtn class="mt-2" color="error"  block :loading="cargando" @click="navigateTo('/')">
           Cancelar</VBtn
          >
        </VForm>
      </VCardText>
    </VCard>
  </VContainer>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

const peliculaStore = usePeliculaStore();
const { Agregar, Actualizar, setPeliculaActual } = peliculaStore;
const cargando = ref(false);
const { peliculaActual } = storeToRefs(peliculaStore);
const campos = reactive({
  nombre: peliculaActual.value ? peliculaActual.value.nombre : "",
  descripcion: peliculaActual.value ? peliculaActual.value.descripcion : "",
});
const procesarFormulario = async () => {
  cargando.value = true;
  if (peliculaActual.value) {
    await Actualizar({ ...campos, _id: peliculaActual.value._id });
  } else {
    await Agregar(campos);
  }
  cargando.value = false;
};
const titulo = computed(() => (peliculaActual.value ? "Editar" : "Agregar"));

onUnmounted(()=>{
    setPeliculaActual(null)
})
</script>

<style scoped>
.centrar {
  display: flex;
  align-items: center;
  height: 80vh;
}
</style>
