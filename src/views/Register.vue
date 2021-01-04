<template>
  <div class="register">
    <div class="row mt-5">
      <div class="offset-md-2 col-md-4">
        <Registro />
      </div>
    </div>
  </div>
</template>

<script>
import Registro from "../components/Registro.vue";

export default {
  name: "register",
  components: {
    Registro,
  },
};
</script>