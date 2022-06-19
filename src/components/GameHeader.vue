<template>
<header class="header">
  <div class="container">
    <div>Total user weight: {{ userWeight }}</div>
    <div>Level: {{ currentLevel }}/{{maxLevel}}</div>
    <div>Total computer weight: {{ computerWeight }}</div>
  </div>
</header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {Getter} from "vuex-class";
import {GET_LEVEL, GET_TOTAL_WEIGHT} from "@/store/getters.const";
import {MAX_LEVEL_CONST} from "@/utils/constants";
import {TotalWeight} from "@/types/types";
import {GameUser} from "@/types/enums";

@Component({})
export default class Header extends Vue {
  @Getter(GET_TOTAL_WEIGHT) private totalWeight !: TotalWeight;
  @Getter(GET_LEVEL) private currentLevel !: TotalWeight;

  private maxLevel = MAX_LEVEL_CONST;
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
@import "@/scss/_variables.scss";

.header {
  width: 100%;
  height: $header-height;
  background-color: $bg-main;

  .container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-transform: uppercase;
  }
}
</style>
