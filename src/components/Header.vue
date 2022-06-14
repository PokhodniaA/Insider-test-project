<template>
<header class="header">
  <div class="container">
    <button>Play</button>
  </div>
</header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class Header extends Vue {}
</script>

<style lang="scss" scoped>
// TODO: Set height to variables
.header {
  width: 100%;
  height: 35px;
  background-color: #fafafa;
}
</style>
