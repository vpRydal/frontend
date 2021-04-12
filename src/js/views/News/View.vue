<template>
<div class="view-news">
  <div class="view-news__container container" v-if="news">
    <nav class="view-news__nav nav">
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
    <ibg :src="imageBasePath + news.photo" class="view-news__photo" alt=""/>

    <div v-if="news" v-html="news.content"/>
  </div>
</div>
</template>

<script lang="ts">
import {Component, Inject, Vue} from "vue-property-decorator";
import News from "@/js/models/News";

@Component({

})
export default class ViewNews extends Vue{
  news: News| null = null
  @Inject('imageBasePath') imageBasePath!: string

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
.view-news
  &__photo
    width 100%
    padding 0 0 30% 0
    margin-bottom 50px
</style>
