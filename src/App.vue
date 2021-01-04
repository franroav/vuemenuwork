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

import Header from "@/components/Header.vue";
import Articles from "@/components/Articles.vue";
import Contact from "@/components/Contact.vue";
import Navbar from "@/components/Navbar.vue";
import Registro from "@/components/Registro.vue";

export default {
  name: "App",
  components: {
    Header,
    Articles,
    Contact,
    Registro,
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