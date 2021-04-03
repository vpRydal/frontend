<template>
  <div class="news" ref="news">
    <div class="news__container container">
      <div class="news__flex-wrapper flex-wrapper flex-wrapper_J-SB flex-wrapper_A-FE">
        <Link :to="{ name: 'news' }" text="Смотреть все новости" class="news__link" v-animate-to-on-scroll:left/>
        <h2 class="news__title"
        >
          <span class="news__title-part-1" v-animate-to-on-scroll:right>Новости</span>
          <span class="news__title-part-2" v-animate-to-on-scroll:right="100">технопарка</span>
        </h2>
      </div>
      <Slider class="news__slider"/>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator';
import Link from "@/js/views/Home/Link.vue";
import BigHeader from "@/js/components/BigHeader.vue";
import Slider from "./Slider.vue";
import bus from "@/js/common/bus";
import {ScrollTo} from "@/js/mixins/common";

@Component({
  components: {Slider, BigHeader, Link},
})
export default class News extends Mixins(ScrollTo) {
  created(): void {
    bus.$on('scroll-to-news', () => {
      this.scrollTo(this.$refs['news'] as HTMLElement, -100)
    })
  }

  beforeDestroy(): void {
    bus.$off('scroll-to-news')
  }
}
</script>

<style lang="stylus" scoped>
.news
  overflow hidden
  &__title
    font-size 106px
    display flex
    flex-direction column


    @media (max-width 1100px)
      margin-bottom 25px

    @media (max-width 860px)
      font-size 80px

    @media (max-width 650px)
      font-size 70px
      text-align center

    &-part-1
      font-size 1em
      line-height .8em

    &-part-2
      font-size .6em
      line-height .8em
      text-align right

  &__flex-wrapper
    margin-bottom 80px

    @media (max-width 860px)
      flex-direction column
    @media (max-width 675px)
      margin-bottom 35px


  &__link
    @media (max-width 1100px)
      width 75%

    @media (max-width 860px)
      font-size 30px
      overflow hidden
      order 1
      align-self flex-start

    @media (max-width 650px)
      font-size 20px
      width 100%

  &__slider
    margin-bottom 90px
</style>
