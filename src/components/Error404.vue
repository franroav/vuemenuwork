<template>
  <v-app>
    <section class="Register">
      <div class="container">
        <div class="row">
          <div class="offset-md-2 col-md-8">
            <div class="card">
              <div class="card-header">
                <h5>Error 404 Pagina No Encontrada 😬</h5>
              </div>
              <div class="card-body">
                <h6>Porfavor redirigase a los siguientes Link:</h6>
                <li>
                  <router-link to="/">Home</router-link>
                </li>
                <ul>
                  <li class="nav-item">
                    <router-link to="/login">Login</router-link>
                  </li>
                  <li>
                    <router-link to="/register">Registrarse</router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </v-app>
</template>
              

<script>
export default {
  name: "404",
  data: () => ({
    title: "404",
    data: {},
  }),
  mounted() {},
};
</script>

<style lang="sass" scoped>
</style>