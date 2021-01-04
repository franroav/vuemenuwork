<template>
  <v-app>
    <div class="container" style="margin-top: 240px">
      <div class="row contact-row-title animated bounceInUp">
        <div class="col-md-8 offset-md-2 text-center">
          <h2 class="contact-title">Contáctanos</h2>
          <img class="my-5" src="../assets/brush_background.png" />
        </div>
      </div>
      <div class="row contact-row-form animated bounceInUp">
        <div class="col-md-8 offset-md-2">
          <v-divider></v-divider>
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <strong><label for="NOMBRE">NOMBRE</label></strong>
                  <v-text-field
                    v-model="firstname"
                    name="firstname"
                    color="#D8AD3D"
                    :rules="[(v) => !!v || 'Nombres, son requeridos!']"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <strong><label for="APELLIDO">APELLIDO</label></strong>
                  <v-text-field
                    name="lastname"
                    color="#D8AD3D"
                    v-model="lastname"
                    :rules="[(v) => !!v || 'Apellidos, son requeridos!']"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <strong><label for="MAIL">MAIL</label></strong>
                  <v-text-field
                    name="email"
                    color="#D8AD3D"
                    v-model="email"
                    :rules="emailRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <strong><label for="TÉLÉFONO">TÉLÉFONO</label></strong>
                  <v-text-field
                    name="phone"
                    color="#D8AD3D"
                    v-model="phone"
                    :rules="[(v) => !!v || 'Telefono, es requerido!']"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              rounded
              color="#D8AD3D"
              class="mx-3"
              dark
              x-large
              @click="enviarFormulario()"
            >
              Enviar
            </v-btn>
          </v-card-actions>
          <v-card></v-card>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";

export default {
  name: "Contact",
  data: () => ({
    valid: true,
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    emailRules: [
      (v) => !!v || "Este campo de obligatorio",
      (v) => /.+@.+\..+/.test(v) || "Debes poner un email válido",
    ],
  }),
  mounted() {},
  created() {},
  methods: {
    ...mapMutations(["mostrarLoading", "ocultarLoading"]),
    enviarFormulario() {
      var vm = this;

      if (!vm.firstname.length || vm.firstname == null) {
        vm.$refs.form.$el[0].focus();
        alert("El Nombre no debe ir vacío!!");
        return;
      }

      if (!vm.lastname.length || vm.lastname == null) {
        vm.$refs.form.$el[1].focus();
        alert("El Apellido no debe ir vacío!");
        return;
      }

      if (!vm.email.length || vm.email == null) {
        vm.$refs.form.$el[2].focus();
        alert("El Email no debe ir vacío!");
        return;
      }

      if (!vm.phone.length || vm.phone == null) {
        vm.$refs.form.$el[3].focus();
        alert("El Telefono no debe ir vacío!");
        return;
      }

      if (this.$refs.form.validate()) {
        const confirmacion = confirm(
          `Esta seguro de Guardar su información de contacto?`
        );
        if (confirmacion) {
          try {
            //el loader recibe un objeto
            this.mostrarLoading({
              titulo: "Accediendo a información",
              color: "secondary",
            });

            vm.axios({
              url: "https://5eed24da4cbc340016330f0d.mockapi.io/api/subscribe",
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              data: {
                firstname: vm.firstname,
                lastname: vm.lastname,
                email: vm.email,
                phone: vm.phone,
              },
            }).then((response) => {
              console.log(response);
              //vm.fetchLocation();
              vm.toast(`Datos de Contacto Enviados Correctamente!`, {
                title: `Información`,
                variant: "success",
                solid: true,
                toaster: "",
              });
            });
          } catch (error) {
            console.log(error);
          } finally {
            this.ocultarLoading();
          }

          this.mostrarLoading({
            titulo: "Accediendo a información",
            color: "secondary",
          });
        }
      }
    },
  },
};
</script>


<style scoped lang="scss">
.contact-title {
  /* Nuestros artículos */

  position: absolute;
  left: 28.68%;
  right: 28.68%;
  top: 1.82%;
  bottom: 65.52%;

  /* H2 */

  font-family: Caveat;
  font-style: normal;
  font-weight: bold;
  font-size: 80px;
  line-height: 38px;
  /* or 47% */

  display: flex;
  align-items: center;
  text-align: center;

  /* #24272A */

  color: #3f454a;
}

.contact-row-title {
  animation-delay: 4s;
  animation-duration: 2s;
}

.contact-row-form {
  animation-delay: 4.1s;
  animation-duration: 2s;
}

.contact-input {
  /* todos PRODUCTOS RECETAS CONSEJOS */

  position: absolute;
  left: 0%;
  right: 5.18%;
  top: 43.82%;
  bottom: 0%;

  background: #ffffff;
  border: 1px solid #d8ad3d;
  box-sizing: border-box;
}
</style>