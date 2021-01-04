<template>
  <div class="signin">
    <div class="row mt-5">
      <div class="offset-md-2 col-md-4">
        <Login />
      </div>
    </div>
  </div>
</template>

<script>
import Login from "../components/Login.vue";

export default {
  name: "Signin",
  components: {
    Login,
  },
};
</script>