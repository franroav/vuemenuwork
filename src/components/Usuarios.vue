
<template>
  <v-app>
    <!-- 1°first ROW -->
    <div class="row">
      <div class="col-md-12">
        <!-- 1°first Card -->
        <div class="card">
          <div class="card-header text-white bg-secondary">
            Personajes Favoritos
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <span
                  v-on="on"
                  class="badge badge-dark badge-pill float-right sdw"
                >
                  <i class="fa fa-user text-white"></i>
                </span>
              </template>
              <span>Favorite users</span>
            </v-tooltip>
          </div>
          <div v-if="loadTransition" class="alert bluesky-line m-0 mb-0"></div>
          <div class="card-body">
            <v-data-table
              :headers="headers"
              :items="userList"
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
                            <v-row>
                              <div class="card col-md-12">
                                <ul class="list-group mb-3 mt-2">
                                  <h4
                                    class="d-flex justify-content-between align-items-center mb-3"
                                  >
                                    <span class="text-muted">{{
                                      editedItem.username
                                    }}</span>
                                    <span
                                      class="badge badge-secondary badge-pill"
                                      >ID: {{ editedItem.id }}</span
                                    >
                                  </h4>
                                  <li
                                    class="list-group-item d-flex justify-content-between lh-condensed"
                                  >
                                    <div>
                                      <h6 class="my-0">
                                        {{ editedItem.role }}
                                      </h6>
                                    </div>
                                    <div>
                                      <span
                                        class="badge badge-secondary badge-pill float-right"
                                      >
                                        <i class="fa fa-user"></i>
                                      </span>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </v-row>
                          </v-container>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="#FF6347" text @click="close"
                            >Cancelar</v-btn
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
                    <router-link :to="`/inventario/productos/${item.id}`">
                      <v-icon v-on="on" small color="#93a2dd" class="mr-2"
                        >mdi-eye</v-icon
                      >
                    </router-link>
                  </template>
                  <span>Ver Usuario {{ item.id }}</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <a
                      v-on="on"
                      class="btn btn-xs btn-danger"
                      @click="editItem(item)"
                      ><i class="fa fa-pencil text-white"></i
                    ></a>
                  </template>
                  <span
                    >Ver Detalles: {{ item.name }} {{ " | " + item.id }}</span
                  >
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
                  <span>Eliminar Usuario {{ item.id }}</span>
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
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  name: "Usuarios",
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
    userList: [],
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
      username: "",
      password: "",
      role: "",
      createdAt: "",
      updateAt: "",
    },
    defaultItem: {
      id: 0,
      username: "",
      password: "",
      role: "",
      createdAt: "",
      updateAt: "",
    },
  }),
  mounted() {
    if (localStorage.getItem("token") !== null) {
      this.token = localStorage.getItem("token");
      this.loading = true;
      this.fetchUsers();
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Nuevo Personaje"
        : "Detalles de Usuario";
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
          value: "username",
        },
        {
          text: "Perfil",
          value: "role",
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
      if (localStorage.getItem("deleteUser") !== null) {
        this.deletedProductMessage();
      }
    },
    editItem(item) {
      //console.log(item);
      this.editedIndex = this.userList.indexOf(item);
      //console.log(this.userList);
      this.editedItem = Object.assign({}, item);

      //console.log(Object.assign({}, this.editedItem));

      this.dialog = true;
    },
    deleteItem(item) {
      var vm = this;
      let deleteUser = Object.assign({}, item);
      /*
      const confirmacion = confirm(
        `Esta seguro de eliminar el Producto: ${deleteUser.name} || ID: ${deleteUser.id}?`
      );
      if (confirmacion) {
        vm.axios({
          url: "xxxxxxxx" + deleteUser.id,
          method: "DELETE",
        })
          .then((response) => {
            vm.fetchUsers();

            vm.$bvToast.toast(
              `El Usuario: ${deleteUser.name} ha sido eliminado, el ${vm.dateMsg} exitosamente!`,
              {
                title: `Información`,
                variant: "success",
                solid: true,
                toaster: "b-toaster-bottom-center",
              }
            );
          })
          .catch((error) => {
            console.log(error);
          });
      }*/
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
        //Object.assign(this.userList[this.editedIndex]);

        // EDIT User
        let editedUser = Object.assign({}, this.editedItem);

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
        } = editedUser;
        const ubicacion = JSON.stringify(location);
        const tipos = JSON.stringify(type);
        const episodio = JSON.stringify(episode);
        const origen = JSON.stringify(origin);
        const headers = { "Content-Type": "application/json" };

        let datos = {
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
          axios
            .post("http://localhost:3000/user", datos, {
              headers: headers,
            })
            .then((response) => {
              console.log(response.data);
              if (response) {
                //console.log(response.data);
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
      this.close();
    },
    fetchUsers() {
      var vm = this;

      try {
        var vm = this;
        const next = this.number;

        axios.get(`http://localhost:3000/users`).then((response) => {
          console.log(response.data);
          this.loading = false;
          vm.pageCount = Math.ceil(response.data.length / 10);
          response.data.map((user, i) => {
            const { id, username, role } = user;
            vm.userList.unshift({ id: i + 1, username, role });
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
      this.userList = [];
      this.loading = true;
      this.fetchUsers();
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
.theme--light.v-pagination .v-pagination__item--active {
  color: #ffffff !important;
  background-color: royalblue !important;
}
</style>

