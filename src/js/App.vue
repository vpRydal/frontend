<template>
  <main v-touch:swipe.right="handleSwipeRight" v-touch:swipe.left="handleSwipeLeft">
    <NavBar/>
    <Header/>
    <router-view class="view"/>
    <Footer/>
  </main>
</template>

<script lang="ts">
import Header from "./components/layouts/header/Header.vue";
import Footer from "./components/layouts/Footer.vue";
import NavBar from "./components/NavBar.vue";
import {Component, Vue} from 'vue-property-decorator';
import bus from "./common/bus";

@Component({
  components: {NavBar, Footer, Header},
  metaInfo: {
    title: 'Аренда помещений Севастополь',
    titleTemplate: '%s | Ассоциация Технопарк Маяк',
    meta: [
      {
        vmid: 'keywords',
        name: 'keywords',
        content: 'Технопарк Маяк, Ассоциация Технопарк Маяк',
      }
    ]
  }
})
export default class App extends Vue {
  handleSwipeRight(): void {
      bus.$emit('nav-bar-show')
  }
  handleSwipeLeft(): void {
    bus.$emit('nav-bar-hide')
  }

}

</script>

<style lang="stylus" scoped>
  .view
    padding-top 90px
</style>
