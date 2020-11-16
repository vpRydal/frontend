<template>
  <main v-touch:swipe.right="handleSwipeRight" v-touch:swipe.left="handleSwipeLeft">
    <NavBar/>
    <Header/>
    <router-view class="view"/>
    <Footer/>
  </main>
</template>

<script lang="ts">
import Header from "./components/header/Header.vue";
import Footer from "./components/Footer.vue";
import NavBar from "./components/NavBar.vue";
import {Component, Vue} from 'vue-property-decorator';
import bus from "./bus";
import {Vue2TouchEventsOptions} from 'vue2-touch-events'

@Component({components: {NavBar, Footer, Header}})
export default class App extends Vue {
  handleSwipeRight(event: Vue2TouchEventsOptions) {
      bus.$emit('nav-bar-show')
  }
  handleSwipeLeft() {
    bus.$emit('nav-bar-hide')
  }

}

</script>

<style lang="stylus" scoped>
  .view
    padding-top 90px
</style>
