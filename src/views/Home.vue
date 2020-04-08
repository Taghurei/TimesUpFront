<template>
  <div class="home">
    <h1>
    Welcome to this Times'Up
    </h1>
        <router-link class="button"
    :to="{ name: 'Config' }"> Start
    </router-link>
  </div>

</template>

<script>


export default {
  name: 'Home',

  components: {

  },
};
</script>
