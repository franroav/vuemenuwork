<template>
  <v-app>
    <section class="app-header">
      <!--HEADER BACKGROUND-->
      <div class="header-img animated fadeIn"></div>
      <div class="container-fluid">
        <div class="row my-5">
          <div class="offset-md-1 col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <em class="header-text animated bounceInLeft">Rick&Morty</em>
          </div>
        </div>
      </div>
    </section>
    <section class="header-main">
      <!--GRADIENT-->
      <div class="row">
        <div class="header-gradient"></div>
      </div>
    </section>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  name: "Header",
  data: () => ({
    data: {},
  }),
  mounted() {},
  created() {
    this.GetArticleList();
  },
  methods: {
    redirectUrl(url) {
      this.$router.push(url);
    },
    GetArticleList() {
      try {
        var vm = this;
        let datos = axios
          .get(`https://5eed24da4cbc340016330f0d.mockapi.io/api/articles`)
          .then((articles) => {
            vm.articleList(articles.data);
          });
      } catch (error) {
        console.log(error);
      }
    },
    articleList(articles) {
      //console.log(articles);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/* b2 1 */
.header-img {
  position: absolute;
  width: 100%;
  height: 805px;
  background: url("../assets/rick-and-morty.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.header-text {
  /* Logo */

  color: #3f454a;
  font-family: "Caveat";
  //font-family: "Comic Sans MS", cursive, sans-serif;
  font-size: 60px;
  font-weight: bold;
  letter-spacing: -1px;
  line-height: 1;
  text-align: center;

  animation-delay: 0.5s;
  animation-duration: 1.5s;

  /* #24272A */
}

.header-main-text {
  /* El secreto de tu cocina */

  position: absolute;
  font-family: "Caveat";
  font-style: normal;
  font-weight: bold;
  font-size: 120px;
  line-height: 100px;
  margin-top: 150px;
  padding-left: 90px;
  display: flex;
  align-items: center;
  color: #3f454a;
  animation-delay: 0.5s;
  animation-duration: 1.5s;
  z-index: 1;
}

.header-brush {
  position: absolute;
  width: 1312px;
  height: 174px;
  left: -80px;
  top: 428.62px;
  background: url("../assets/brush_header.png");
  background-repeat: no-repeat;
  transform: rotate(2.4deg);
  animation-delay: 0.5s;
  animation-duration: 1.5s;
}

/* Rectangle 180 */

.header-gradient {
  position: absolute;
  width: 1447px;
  height: 253px;
  left: 0px;
  top: 560px;

  background: linear-gradient(
    0deg,
    #ffffff 0%,
    #ffffff 32.22%,
    rgba(255, 255, 255, 0.71) 61.99%,
    rgba(255, 255, 255, 0.0729167) 93.72%,
    rgba(255, 255, 255, 0) 93.72%
  );
  z-index: 1;
}

@media (max-width: 568px) {
  .header-img {
    width: 558px;
    background: url("../assets/movil_rick_dimension.png");
    background-size: contain;
    background-attachment: scroll;
  }

  .header-text {
    /* Logo */

    color: #ffffff;
    font-family: "Caveat";
    //font-family: "Comic Sans MS", cursive, sans-serif;
    font-size: 60px;
    font-weight: bold;
    letter-spacing: -1px;
    line-height: 1;
    text-align: center;

    animation-delay: 0.5s;
    animation-duration: 1.5s;

    /* #24272A */
  }
}
</style>
