<template>
  <div class="home">
    <Header />
    <Articles />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Articles from "@/components/Articles.vue";

export default {
  name: "Home",
  components: {
    Header,
    Articles,
  },
};
</script>