<template>
  <div class="container">
    <div class="config">
      <GameConfig />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import GameConfig from '@/components/GameConfig.vue';

export default {
  name: 'Config',
  components: {
    GameConfig,
  },
};
</script>
<style scoped lang="scss">
.config{
  transform: translateY(20%);
}
</style>
