<template>
  <v-app>
    <div class="row animated fadeIn">
      <div class="card col-md-12">
        <div class="card-header bg-info text-white">
          <h1>Rick And Morty App</h1>
          <hr class="bg bg-warning" />
          <h4 class="mt-2 text-dark">Login de Usuario</h4>
        </div>
        <div class="row">
          <div class="offset-md-2 col-md-6">
            <img
              :src="image"
              class="img-responsive img-thumbnail"
              style="width: 100%"
            />
          </div>
          <div class="col-md-12">
            <ul class="list-group mb-3 mt-2">
              <h4
                class="d-flex justify-content-between align-items-center mb-3"
              >
                <span class="text-muted">{{ name }}</span>
                <span class="badge badge-secondary badge-pill"
                  >Gender: {{ gender }}</span
                >
              </h4>
              <li
                class="list-group-item d-flex justify-content-between lh-condensed"
              >
                <div>
                  <h6 class="my-0">{{ status }}</h6>
                </div>
                <div>
                  <h6 class="my-0">{{ species }}</h6>
                </div>
                <div>
                  <span class="badge badge-secondary badge-pill float-right">
                    <i class="fa fa-user"></i>
                  </span>
                </div>
              </li>
              <li
                class="list-group-item d-flex justify-content-between lh-condensed"
              >
                <div>
                  <h6 class="my-0">
                    <i class="fa fa-map"></i> {{ ": " + location }}
                  </h6>
                  <small class="text-muted"> Ubicación del personaje.</small>
                </div>
              </li>
              <li
                class="list-group-item d-flex justify-content-between lh-condensed"
              >
                <div class="card col-md-12">
                  <div class="card-body">
                    <div class="mx-3 mt-5">
                      <v-row justify="center">
                        <v-dialog v-model="dialog" persistent max-width="600px">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              color="primary"
                              dark
                              v-bind="attrs"
                              v-on="on"
                            >
                              Ingresar
                            </v-btn>
                          </template>
                          <v-card>
                            <v-card-title>
                              <span class="headline">Login de Usuario</span>
                            </v-card-title>
                            <v-card-text>
                              <v-container>
                                <v-form
                                  ref="form"
                                  v-model="valid"
                                  lazy-validation
                                >
                                  <v-row>
                                    <v-col cols="12">
                                      <v-text-field
                                        label="Email*"
                                        v-model="username"
                                        :rules="emailRules"
                                        type="email"
                                        required
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                      <v-text-field
                                        label="Password*"
                                        :rules="defaultRequiredRules"
                                        v-model="password"
                                        type="password"
                                        required
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                      <v-text-field
                                        label="Perfil*"
                                        v-model="role"
                                        :rules="defaultRequiredRules"
                                        placeholder="suscriptor"
                                        readonly
                                        hint="Usuario Suscriptor"
                                        persistent-hint
                                        required
                                      ></v-text-field>
                                    </v-col>
                                  </v-row>
                                </v-form>
                                <v-snackbar v-model="snackbar">
                                  {{ text }}

                                  <template v-slot:action="{ attrs }">
                                    <v-btn
                                      color="pink"
                                      text
                                      v-bind="attrs"
                                      @click="snackbar = false"
                                    >
                                      Cerrar
                                    </v-btn>
                                  </template>
                                </v-snackbar>
                              </v-container>
                              <small>*indica que el campo es requerido</small>
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                color="blue darken-1"
                                text
                                @click="dialog = false"
                              >
                                Cerrar
                              </v-btn>
                              <v-btn
                                color="blue darken-1"
                                text
                                @click="submitForm()"
                              >
                                Enviar
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-row>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  name: "Logueo",
  data: () => ({
    username: "",
    password: "",
    role: "suscriptor",
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    carouselSate: false,
    valid: true,
    charactersData: [],
    number: 1,
    dialog: false,
    name: "Rick",
    species: "Human",
    status: "Alive",
    gender: "Male",
    location: "Citadel of Ricks",
    defaultRequiredRules: [(v) => !!v || "Este campo es obligatorio"],
    emailRules: [
      (v) => !!v || "Este campo de obligatorio",
      (v) => /.+@.+\..+/.test(v) || "Debes poner un email válido",
    ],
    snackbar: false,
    text: `Usuario Logeado Correctamente`,
  }),
  mounted() {
    console.log("Component mounted.");
  },
  created() {
    //this.initialize();
    this.carousel();
  },
  methods: {
    submitForm() {
      var vm = this;
      if (!vm.username.length || vm.username == null) {
        vm.$refs.form.$el[0].focus();
        alert("El Email no debe ir vacío!");
        return;
      }

      if (!vm.password.length || vm.password == null) {
        vm.$refs.form.$el[1].focus();
        alert("El password no debe ir vacío!");
        return;
      }

      if (this.$refs.form.validate()) {
        /* console.log({
          username: this.username,
          password: this.password,
          role: this.role,
        });*/
        //console.log(this.$refs.form.values());
        //const {}
        const headers = { "Content-Type": "application/json" };

        let datos = {
          username: this.username,
          password: this.password,
        };
        console.log(datos);
        //const { username, password } = datos;
        console.log(datos);
        axios
          .post(process.env.VUE_APP_API_URL + "auth/login", datos)
          .then((response) => {
            if (response) {
              //console.log(response.data);
              if (localStorage.getItem("token") === null) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userId", response.data.userId);
              } else {
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userId", response.data.userId);
              }

              this.snackbar = true;
              this.dialog = false;

              setTimeout(() => {
                vm.$router.push("/home");
              }, 2000);
            }
          })
          .catch((error) => {
            console.log(error);
          });
        /*this.axios({
          url: "http://localhost:3000/auth/login",
          method: "POST",
          data: {
            data: datos,
            headers: headers,
          },
        })
          .then((response) => {
            vm.storesList = response.data;
            this.snackbar = true;
          })
          .catch((error) => {
            console.log(error);
          }); */

        /* this.$bvToast.toast(
          "Debes añadir al menos un producto a la orden de pedido",
          {
            title: `Acción concretada`,
            variant: "danger",
            solid: true,
            toaster: "b-toaster-bottom-center",
          }
        );*/
      }
    },
    carousel() {
      try {
        var vm = this;
        const next = this.number;

        axios
          .get(process.env.VUE_APP_API_URL`character/${next}`)
          .then((response) => {
            console.log(response);
            this.image = response.data.image;
            this.name = response.data.name;
            this.species = response.data.species;
            this.status = response.data.status;
            this.gender = response.data.gender;
            this.location = response.data.location.name;
            this.number++;

            setTimeout(() => {
              vm.activate(1);
            }, 200);
          });
      } catch (error) {
        console.log(error);
      }
    },
    activate() {
      setTimeout(() => {
        if (this.number === 671) {
          this.number = 1;
        }
        this.carousel();
      }, 200);
    },
  },
};
</script>

<style scoped>
/**CARD */
.card:hover,
.sdw {
  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14),
    0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.3);
  color: black;
}
</style>
