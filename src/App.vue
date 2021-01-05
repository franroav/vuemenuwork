<template>
  <v-app>
    <Navbar />
    <section class="app-main">
      <router-view />
    </section>
  </v-app>
</template>

<script>
import { mapState } from "vuex";

import Navbar from "@/components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
  },
  data: () => ({
    //
  }),
  computed: {
    ...mapState(["loading"]),
  },
};
</script>
<style  scoped>
.app-main {
  background-image: url("https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1413&q=80");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
}
</style>