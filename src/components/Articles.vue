<template>
  <v-app>
    <div class="container" style="margin-top: 240px">
      <div class="row article-row-title animated bounceInUp my-5">
        <div class="col-md-8 offset-md-2 mx-2 my-5 text-center">
          <h2 class="api-title">API Rick&Morty</h2>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-md-12 article-col-cards animated bounceInRight">
          <div :class="visibility">
            <!--CARD ONE-->
            <div class="col-md-4">
              <div class="card text-center animate-cards animated fadeIn">
                <div class="card-header">
                  <div class="card-title">Episodes</div>
                  <ul>
                    <li
                      v-for="{ name, episode, url, id } in episodes"
                      :key="id"
                    >
                      <a :href="`${url}`"> {{ name }} - {{ episode }} </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!--CARD TWO-->
            <div class="col-md-4">
              <div class="card text-center animate-cards animated fadeIn">
                <div class="card-header">
                  <div class="card-title">Locations</div>
                  <ul>
                    <li
                      v-for="{ name, type, dimension, url, id } in locations"
                      :key="id"
                    >
                      <a :href="`${url}`">
                        {{ name }} - {{ type }} - {{ dimension }}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!--CARD THREE-->
            <div class="col-md-4">
              <div class="card text-center animate-cards animated fadeIn">
                <div class="card-header">
                  <div class="card-title">Characters</div>
                  <ul>
                    <li
                      v-for="{
                        name,
                        type,
                        status,
                        gender,
                        location,
                        image,
                        id,
                      } in characters"
                      :key="id"
                    >
                      <a :href="`${url}`">
                        <h6 class="my-0">
                          <img
                            :src="image"
                            width="40px"
                            class="img-responsive img-thumbnail mr-2"
                          />{{ name }}
                        </h6>
                        <small
                          ><em>
                            {{ gender }} - {{ type }} - {{ status }}</em
                          ></small
                        >
                        <small
                          ><em>{{ location }}</em></small
                        >
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
/**
      "characters": "https://rickandmortyapi.com/api/character",
  "locations": "https://rickandmortyapi.com/api/location",
  "episodes": "https://rickandmortyapi.com/api/episode"
     */
import axios from "axios";

export default {
  name: "Articles",
  data: () => ({
    title: "Rick&Morty",
    episodes: [],
    locations: [],
    characters: [],
    items: [],
    arrArticle: [],
    arrProductos: [],
    arrRecetas: [],
    arrConsejos: [],
    visibility: "row hide",
  }),
  mounted() {
    this.title = "articulos";

    try {
      var vm = this;
      let datos = axios
        .get(`https://rickandmortyapi.com/api/character`)
        .then((character) => {
          //console.log(character.data.results);
          this.characters = character.data.results;
          //vm.articleList(location.data);
        });
      //console.log(datos);
    } catch (error) {
      console.log(error);
    }

    //location
    try {
      var vm = this;
      let datos = axios
        .get(`https://rickandmortyapi.com/api/location`)
        .then((location) => {
          //console.log(location.data.results);
          this.locations = location.data.results;
          //vm.articleList(location.data);
        });
      //console.log(datos);
    } catch (error) {
      console.log(error);
    }

    try {
      var vm = this;
      let datos = axios
        .get(`https://rickandmortyapi.com/api/episode`)
        .then((episode) => {
          //console.log(episode.data.results);
          this.episodes = episode.data.results;
          //vm.articleList(location.data);
        });
      //console.log(datos);
    } catch (error) {
      console.log(error);
    }

    ////
    try {
      var vm = this;
      let datos = axios
        .get(`https://5eed24da4cbc340016330f0d.mockapi.io/api/articles`)
        .then((articles) => {
          vm.articleList(articles.data);
        });
      //console.log(datos);
    } catch (error) {
      console.log(error);
    }
  },
  created() {},
  methods: {
    redirectUrl(url) {
      //window.location.href = url;
      this.$router.push(url);
    },
    articleList(articles) {
      this.articleStorage(articles);
    },
    getProductList(Productos) {
      try {
        var vm = this;
        this.title = "productos";
        let datos = axios
          .get(
            `https://5eed24da4cbc340016330f0d.mockapi.io/api/articles?filter=${Productos}`
          )
          .then((productos) => {
            vm.productList(productos.data);
          });
      } catch (error) {
        console.log(error);
      }
    },
    productList(producto) {
      this.articleStorage(producto);
    },
    getRecipeList() {
      try {
        var vm = this;
        this.title = "recetas";
        let datos = axios
          .get(
            `https://5eed24da4cbc340016330f0d.mockapi.io/api/articles?filter=Recetas`
          )
          .then((recetas) => {
            vm.recipeList(recetas.data);
          });
      } catch (error) {
        console.log(error);
      }
    },
    recipeList(recipe) {
      this.articleStorage(recipe);
    },
    getAdviseList(advise) {
      try {
        var vm = this;
        this.title = "consejos";
        let datos = axios
          .get(
            `https://5eed24da4cbc340016330f0d.mockapi.io/api/articles?filter=${advise}`
          )
          .then((consejo) => {
            vm.adviseList(consejo.data);
          });
      } catch (error) {
        console.log(error);
      }
    },
    adviseList(consejos) {
      this.articleStorage(consejos);
    },
    articleStorage(data) {
      let arrData = [];

      for (let i = 0; i < data.length; i++) {
        if (i < 6) {
          arrData.push(data[i]);
        }
      }

      if (localStorage.getItem("article") !== null && data.lenght !== 0) {
        this.arrArticle = [];
        localStorage.removeItem("article");

        localStorage.setItem("article", JSON.stringify(arrData));

        let articleStorage = JSON.parse(localStorage.getItem("article"));

        this.arrArticle = articleStorage;
        this.visibility = "row mt-2";
      } else if (
        localStorage.getItem("article") === null &&
        data.lenght !== 0
      ) {
        localStorage.setItem("article", JSON.stringify(arrData));

        this.arrArticle = arrData;
        this.visibility = "row";
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/* b2 1 */
.header {
  position: absolute;
  width: 1536px;
  height: 805px;
  left: -96px;
  top: -14px;

  //background: url(b2.png);
}

.api-title {
  position: absolute;

  /* H2 */

  font-family: Caveat;
  font-style: normal;
  font-weight: bold;
  font-size: 60px;
  line-height: 38px;
  /* or 47% */

  display: flex;
  align-items: center;
  text-align: center;

  /* #24272A */

  color: #3f454a;
}

.article-menu {
  /* todos PRODUCTOS RECETAS CONSEJOS */

  position: absolute;
  width: 198px;
  height: 177px;
  left: 154px;
  top: 990px;

  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 23px;
  /* or 192% */

  letter-spacing: 0.03em;
  text-transform: uppercase;

  /* #24272A */

  color: #3f454a;
}

.article-card-title {
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 24px;
  /* or 133% */

  letter-spacing: 0.01em;

  /* #24272A */

  color: #3f454a;
}

.article-card-body {
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  /* or 171% */

  color: #3f454a;
}

.article-col-menu {
  animation-delay: 1.5s;
  animation-duration: 2s;
}
.article-col-cards {
  animation-delay: 1.5s;
  animation-duration: 2s;
}
.animate-cards {
  animation-delay: 3.2s;
  animation-duration: 1.5s;
}

.article-row-title {
  animation-delay: 1.5s;
  animation-duration: 2s;
}

.hide {
  visibility: hidden !important;
}
</style>
