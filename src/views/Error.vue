<template>
  <div class="home">
    <Error404 />
  </div>
</template>

<script>
import Error404 from "../components/Error404";

export default {
  name: "Home",
  components: {
    Error404,
  },
};
</script>