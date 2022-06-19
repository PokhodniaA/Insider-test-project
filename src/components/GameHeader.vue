<template>
<header class="header">
  <div class="container">
    <div>Total user weight: {{ userWeight }}</div>
    <div>Level: {{ currentLevel }}/{{5}}</div>
    <div>Total computer weight: {{ computerWeight }}</div>
  </div>
</header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {Getter} from "vuex-class";
import {GET_LEVEL, GET_TOTAL_WEIGHT} from "@/store/getters.const";
import {GameUser, TotalWeight} from "@/store/index.interface";

@Component({})
export default class Header extends Vue {
  @Getter(GET_TOTAL_WEIGHT) private totalWeight !: TotalWeight;
  @Getter(GET_LEVEL) private currentLevel !: TotalWeight;
// TODO: поменять везде .user и .computer на enum
  private get userWeight(): number {
    return this.totalWeight[GameUser.USER]
  }

  private get computerWeight(): number {
    return this.totalWeight[GameUser.COMPUTER]
  }
}
</script>

<style lang="scss" scoped>
// TODO: Set height to variables
.header {
  width: 100%;
  height: 35px;
  background-color: #fafafa;

  .container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-transform: uppercase;
  }
}
</style>
