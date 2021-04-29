<template>
  <main class="main">
    <NavBar/>
    <Header/>
    <keep-alive :include="['LeftSideBar', 'Filters', 'Map', 'Catalog']">
      <router-view class="main__view"/>
    </keep-alive>
    <Footer/>
  </main>
</template>

<script lang="ts">
import Header from "./components/layouts/header/Header.vue";
import Footer from "./components/layouts/Footer.vue";
import NavBar from "./components/layouts/NavBar.vue";
import {Component, Provide, Vue} from 'vue-property-decorator';
import $ from "jquery";
import {getModule} from "vuex-module-decorators";
import CatalogModule from "@/js/store/modules/catalog";
import {Route} from "vue-router";

@Component({
  components: {NavBar, Footer, Header},
  data: () => ({}),
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
  },
  watch: {
    $route(val: Route, oldVal: Route): void {
      if (val.name !== oldVal.name) {
        $('body').css('overflow', '')
        getModule(CatalogModule, this.$store).setOnlyMap(false)
      }
    }
  }
})
export default class App extends Vue {
  baseApiPath = process.env.VUE_APP_URL
  useLocalApi = process.env.VUE_APP_USE_LOCAL_API === 'true'

  @Provide('imageBasePath')
  get imageBasePath(): string {
    return this.useLocalApi ? '' : this.baseApiPath
  }
}

</script>

<style lang="stylus" scoped>
.main
  display flex
  flex-direction column
  height 100%

  &__view
    padding-top 110px
    flex 1 1 100%
</style>
