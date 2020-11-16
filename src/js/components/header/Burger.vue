<template>
  <span class="burger" @click="$emit('click')">
    <span></span>
  </span>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
})
export default class Burger extends Vue {
}
</script>

<style scoped lang="stylus">
  .burger
    position relative
    display none
    width 22px
    height 2px
    background black
    cursor pointer
    @media (max-width: 1200px)
      display block
    & span
      position absolute
      width 22px
      height 20px
      top -10px
      left 0
    &:before, &:after
      content ''
      position absolute
      display block
      background black
      width 100%
      height inherit
    &:after
      bottom -8px
    &:before
      top -8px


</style>