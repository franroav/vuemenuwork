<template>
  <div class="navegacion">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#"
        ><img
          :src="image"
          class="img-responsive rounded-circle"
          width="60px"
          height="auto"
      /></a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/favorite" class="nav-link">Favoritos</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/characters" class="nav-link"
              >Personajes</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/user" class="nav-link">Usuarios</router-link>
          </li>
        </ul>
        <div class="my-2 my-lg-0">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link to="/login" v-if="!authState" class="nav-link"
                >Login</router-link
              >
            </li>
            <li class="nav-item" v-if="!authState">
              <router-link to="/register" class="nav-link"
                >Registrarse</router-link
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="salir()">
                <i class="fas fa-door-open"></i> Salir</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "navegacion",
  props: {
    msg: String,
  },

  data: () => ({
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    authState: false,
    token: "",
  }),
  mounted() {
    var vm = this;
    if (localStorage.getItem("token") !== null) {
      setTimeout(() => {
        this.authState = true;
      }, 200);
    } else {
      setTimeout(() => {
        this.authState = false;
      }, 200);
    }
  },
  methods: {
    salir() {
      var vm = this;
      localStorage.removeItem("token");
      this.authState = false;
      setTimeout(() => {
        vm.$router.push("/home");
      }, 2000);
    },
  },
};
</script>

<style scoped>
.navbar {
  width: 100%;
}
</style>