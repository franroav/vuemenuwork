<template>
  <v-app>
    <!-- 1°first ROW -->
    <div class="row">
      <div class="col-md-12">
        <!-- 1°first Card -->
        <div class="card">
          <div class="card-header text-white bg-secondary">
            Personajes
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <span
                  v-on="on"
                  class="badge badge-dark badge-pill float-right sdw"
                >
                  <i class="fa fa-user text-white"></i>
                </span>
              </template>
              <span>Character</span>
            </v-tooltip>
          </div>
          <div v-if="loadTransition" class="alert bluesky-line m-0 mb-0"></div>
          <div class="card-body">
            <v-data-table
              :headers="headers"
              :items="CharacterList"
              :page.sync="page"
              :items-per-page="itemsPerPage"
              :single-select="true"
              show-select
              v-model="selected"
              :search="search"
              :sort-by="'id'"
              :sort-desc="true"
              class="elevation-1 datatable"
            >
              <template v-slot:top>
                <v-card class="mt-1">
                  <v-spacer></v-spacer>
                  <v-toolbar flat color="white">
                    <div class="input-group">
                      <span class="input-group-addon">
                        <i class="fa fa-search mr-2 my-2"></i
                      ></span>

                      <input
                        v-model="search"
                        append-icon="search"
                        label="Búsqueda"
                        type="text"
                        class="form-control form-control-md col-md-8"
                        placeholder="Buscar..."
                      />
                    </div>
                    <!-- <v-text-field
                      class="text-xs-center"
                      v-model="search"
                      append-icon="search"
                      label="Búsqueda"
                    ></v-text-field>-->

                    <v-spacer></v-spacer>

                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-dialog v-model="dialog" max-width="600px">
                      <!-- 2°second Card -->
                      <v-card>
                        <v-card-title>
                          <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                          <v-container>
                            <v-form ref="form" v-model="valid" lazy-validation>
                              <!-- 2°second ROW -->
                              <v-row>
                                <v-col
                                  cols="12"
                                  sm="6"
                                  md="4"
                                  v-if="editedItem.id"
                                >
                                  <v-text-field
                                    v-model="editedItem.id"
                                    name="id"
                                    readonly="readonly"
                                    label="ID"
                                    prepend-icon="vpn_key"
                                    filled
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                  <v-text-field
                                    v-model="editedItem.name"
                                    label="name"
                                    :rules="defaultRequiredRules"
                                    prepend-icon="face"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                  <v-text-field
                                    v-model="editedItem.status"
                                    label="status"
                                    :rules="defaultRequiredRules"
                                    prepend-icon="check_circle_outline"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                  <v-text-field
                                    v-model="editedItem.species"
                                    label="species"
                                    :rules="defaultRequiredRules"
                                    prepend-icon="help"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                  <v-text-field
                                    v-model="editedItem.type"
                                    label="type"
                                    prepend-icon="assignment_ind"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                  <v-text-field
                                    v-model="editedItem.gender"
                                    label="gender"
                                    :rules="defaultRequiredRules"
                                    prepend-icon="assignment_ind"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                  <v-text-field
                                    v-model="editedItem.created"
                                    label="fecha"
                                    :rules="defaultRequiredRules"
                                    prepend-icon="date_range"
                                  ></v-text-field>
                                </v-col>
                              </v-row>
                            </v-form>
                          </v-container>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="#FF6347" text @click="close"
                            >Cancelar</v-btn
                          >
                          <v-btn color="#00FF00" text @click="save"
                            >Guardar</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-toolbar>
                </v-card>
              </template>
              <template v-slot:item.id="{ item }">
                <v-chip :color="getColor(item.id)" dark>{{ item.id }}</v-chip>
              </template>
              <template v-slot:item.image="{ item }">
                <img :src="item.image" class="img-responsive img-thumbnail" />
              </template>
              <template v-slot:item.actions="{ item }">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <router-link :to="`/inventario/Personajes/${item.id}`">
                      <v-icon v-on="on" small color="#93a2dd" class="mr-2"
                        >mdi-eye</v-icon
                      >
                    </router-link>
                  </template>
                  <span>Ver favorito {{ item.id }}</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <a
                      v-if="editButton"
                      v-on="on"
                      class="btn btn-xs btn-danger"
                      @click="editItem(item)"
                      ><i class="fa fa-pencil text-white"></i
                    ></a>
                  </template>
                  <span>Agregar {{ item.name }} {{ " | " + item.id }}</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon
                      v-on="on"
                      color="#93a2dd"
                      small
                      @click="deleteItem(item)"
                      >mdi-delete</v-icon
                    >
                  </template>
                  <span>Eliminar favorito {{ item.id }}</span>
                </v-tooltip>
              </template>
              <template v-slot:no-data>
                <v-btn
                  color="#87CEFA"
                  :loading="loading"
                  @click="reinitialize()"
                  >Cargando ..</v-btn
                >
              </template>
            </v-data-table>
            <div class="text-center pt-2">
              <v-pagination
                v-model="page"
                :total-visible="10"
                :length="pageCount"
                color="#BA68C"
                prev-icon="mdi-menu-left"
                next-icon="mdi-menu-right"
              ></v-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-snackbar v-model="snackbar">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
//import { SET_BREADCRUMB } from "@/store/breadcrumbs.module";
import axios from "axios";
export default {
  name: "Character",
  data: () => ({
    token: "",
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
    dialog: false,
    valid: true,
    loading: false,
    url: "",
    boolean: false,
    loadTransition: false,
    search: "",
    selected: [],
    CharacterList: [],
    defaultRequiredRules: [(v) => !!v || "Este campo es obligatorio"],
    windowSize: {
      x: 0,
      y: 0,
    },
    dateMsg:
      new Date().toISOString().substr(0, 10) +
      " " +
      new Date().toISOString().substr(11, 5),
    productsByStore: [],
    categories: [],
    editedIndex: -1,
    editedItem: {
      id: 0,
      name: "",
      status: "",
      species: "",
      type: "",
      gender: "",
      location: "",
      image: "",
      episode: "",
      url: "",
      created: "",
    },
    defaultItem: {
      id: 0,
      name: "",
      status: "",
      species: "",
      type: "",
      gender: "",
      location: "",
      image: "",
      episode: "",
      url: "",
      created: "",
    },
    snackbar: false,
    text: `Personaje Agregado a Favoritos ⭐ Correctamente`,
    editButton: false,
    user_id: 0,
  }),
  mounted() {
    if (localStorage.getItem("token") !== null) {
      this.editButton = true;
      this.token = localStorage.getItem("token");
      this.user_id = localStorage.getItem("userId");
    }
    this.fetchCharacters();
    this.loading = true;
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Personaje" : "Agregar Personaje";
    },
    headers() {
      return [
        {
          text: "ID",
          align: "start",
          sortable: false,
          value: "id",
        },
        {
          text: "Nombre",
          value: "name",
        },
        {
          text: "Gender",
          value: "gender",
        },
        {
          text: "Species",
          value: "gender",
        },
        {
          text: "Status",
          value: "status",
        },
        {
          text: "Image",
          value: "image",
        },
        {
          text: "Location",
          value: "location.name",
        },
        { text: "Acciones", value: "actions", sortable: false },
      ];
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      if (localStorage.getItem("deleteCharacter") !== null) {
        this.deletedProductMessage();
      }
    },
    editItem(item) {
      //console.log(item);
      this.editedIndex = this.CharacterList.indexOf(item);
      //console.log(this.CharacterList);
      this.editedItem = Object.assign({}, item);

      console.log(Object.assign({}, this.editedItem));

      //  console.log(product);
      this.dialog = true;
    },
    deleteItem(item) {
      var vm = this;
      let deleteCharacter = Object.assign({}, item);
      console.log(eleteCharacter);

      const confirmacion = confirm(
        `Esta seguro de eliminar el favorito: ${deleteCharacter.name} || ID: ${deleteCharacter.id}?`
      );
      if (confirmacion) {
        vm.axios({
          url: "xxxxxxxxxxx" + deleteCharacter.id,
          method: "DELETE",
        })
          .then((response) => {})
          .catch((error) => {
            console.log(error);
          });
      }
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      var vm = this;

      if (this.editedIndex > -1) {
        let editedCharacter = Object.assign({}, this.editedItem);
        console.log(editedCharacter);

        const {
          id,
          name,
          status,
          species,
          type,
          gender,
          location,
          origin,
          image,
          episode,
          url,
          created,
        } = editedCharacter;

        const ubicacion = JSON.stringify(location);
        const tipos = JSON.stringify(type);
        const episodio = JSON.stringify(episode);
        const origen = JSON.stringify(origin);
        const headers = {
          "Content-Type": "application/json",
          auth: this.token,
        };

        let datos = {
          user_id: this.user_id,
          id,
          name,
          status,
          species,
          type: tipos,
          origin: origen,
          gender,
          location: ubicacion,
          image,
          episode: episodio,
          url,
          created,
        };

        if (this.$refs.form.validate()) {
          const confirmacion = confirm(
            `Esta seguro de agregar a este personaje a favoritos? Nombre: ${name} || ID: ${id}?`
          );
          if (confirmacion) {
            axios
              .post(process.env.VUE_APP_API_URL + "character", datos, {
                headers: headers,
              })
              .then((response) => {
                console.log(response.data);

                if (response) {
                  console.log(response.data);

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
          }
        }
      }
      this.close();
    },
    fetchCharacters() {
      var vm = this;

      try {
        var vm = this;
        const next = this.number;

        console.log(process.env.VUE_APP_API_URL);

        axios
          .get(`${process.env.VUE_APP_API_URL}character`)
          .then((response) => {
            this.loading = false;
            vm.pageCount = Math.ceil(response.data.length / 10);
            response.data.map((character) => {
              vm.CharacterList.unshift(character);
              //console.log(character);
            });
          });
      } catch (error) {
        console.log(error);
      }
    },

    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    },
    getColor(id) {
      return "#B22222";
    },

    reinitialize() {
      this.CharacterList = [];
      this.loading = true;
      this.fetchCharacters();
    },
  },
};
</script>

<style scoped>
/**TABLE */
.datatable table tbody {
  border-spacing: 2px;
  border-color: #646c9a;
  box-sizing: border-box;
}

/** TABLE HEADER **/
.datatable table thead tr th {
  color: #646c9a !important;
  font-style: normal;
  font-size: 12px !important;
  border-bottom: 1px ridge #e3f1ff !important;
}
/** TABLE BODY **/
.datatable table tbody tr:first-child {
  color: #6c7293;
  font-size: 12px !important;
}
.datatable table tbody tr > td {
  color: #6c7293;
  font-size: 12px !important;
  border-bottom: 1px ridge #e3f1ff !important;
  /*border-top: 1px ridge #93a2dd !important;*/
}
.datatable table tbody tr:last-child {
  border-bottom: 1px ridge #f0f8ff !important;
}
.theme--light.v-data-table .v-data-footer {
  /**border-top: 1px ridge #F0F8FF !important;*/
}
.datatable table .v-data-footer {
  border-top: 1px ridge #f0f8ff !important;
}
/** PAGINACIÓN **/
.datatable > .v-data-footer .v-icon {
  color: royalblue !important;
}
.datatable > .v-data-footer .v-data-footer__select {
  content: "";
  display: inline-block !important;
}
</style>