<template>
<div class="view-realty">
  <div class="view-realty__container container" v-if="news">
    <nav class="view-object__nav nav">
      <ul class="nav__list">
        <li class="nav_item">
          <router-link :to="{name: 'home'}" class="nav__link link">Главная</router-link>
        </li>
        <li class="nav_item"><span class="nav__divider">-</span></li>
        <li class="nav_item"><router-link :to="{name: 'news'}" class="nav__link link">Новости</router-link></li>
        <li class="nav_item"><span class="nav__divider">-</span></li>
        <li class="nav_item" v-if="news"><a class="nav__link link link_disabled">{{ news.header }}</a></li>
      </ul>
    </nav>
    <div v-if="news" v-html="news.content"/>
  </div>
</div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import News from "@/js/models/News";

@Component({

})
export default class ViewNews extends Vue{
  news: News| null = null

  created (): void {
    News.get({ id: Number(this.$route.params.id) })
        .then((response) => {
          this.news = response.data
    })
  }
}
</script>

<style scoped lang="stylus">
.nav
  color mainColor
  margin-bottom 25px

  &__list
    display flex

  &__divider
    margin 0 5px
</style>
