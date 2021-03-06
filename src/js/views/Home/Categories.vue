<template>
  <div class="categories" ref="categories">
    <div class="container">
      <div class="categories__header" >
        <Link text="Смотреть все предложения" class="categories__link" v-animate-to-on-scroll:left/>
        <h1 class="categories__title" >
          <span class="categories__title-part-1" v-animate-to-on-scroll:top>Аренда</span>
          <span class="categories__title-part-2" v-animate-to-on-scroll:right="100">площадей и помещений</span>
        </h1>
      </div>
      <div v-if="categories.length"
          class="categories__slider-wrapper">
        <Slick class="categories__slider"
               :options="slickOptions"
               @beforeChange="handleBeforeChange"
               ref="slick"
        >
          <Category v-for="(category, idx) in categories"
                    :key="idx"
                    :id="category.id"
                    :img-path="imageBasePath + category.img_path"
                    :name="category.name"
                    @click="onClickCategory(category)"
          />
        </Slick>
        <div class="categories__slider-nav-wrapper">
          <SliderNav class="categories__slider-nav"
                     :count-slides="categories.length"
                     :current-slide-index="currentSlideIdx"
                     :nav-item-height="7"
                     @next="handleNextSlide"
                     @prev="handlePrevSlide"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Slick from "vue-slick";
import {Component, Inject, Vue} from 'vue-property-decorator';
import Link from "@/js/views/Home/Link.vue";
import BigHeader from "@/js/components/BigHeader.vue";
import Category from "@/js/components/Category.vue";
import SliderNav from "@/js/components/SliderNav.vue";
import RealtyType from "@/js/models/RealtyType";


@Component({
  components: {SliderNav, Category, BigHeader, Link, Slick},
})
export default class Categories extends Vue {
  slickOptions = {
    slidesToShow: 3,
    autoplay: true,
    delay: 5000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        }
      }
    ]
  }
  categories = [] as Array<RealtyType>;
  currentSlideIdx = 0
  @Inject('imageBasePath') imageBasePath!: string

  /* eslint-disable */
  handleBeforeChange(event: Event, slick: any, currentSlide: number, nextSlide: number) {
    this.currentSlideIdx = nextSlide;
  }

  handleNextSlide():void {
    /* eslint-disable */
    //@ts-ignore
    this.$refs['slick'].next()
  }

  handlePrevSlide() {
    /* eslint-disable */
    //@ts-ignore
    this.$refs['slick'].prev()
  }

  onClickCategory(category: RealtyType): void {
    this.$router.replace({ name: 'catalog', query: { filters: JSON.stringify({ types: [ category.id ] }) } })
        .then(() => {
      this.$store.commit('queryParams/init')
    })
  }

  created (): void {
    RealtyType.getList().then(response => {
      this.categories = response.data
      })
  }
}
</script>

<style scoped lang="stylus">
.categories
  overflow hidden

  &__slider-wrapper
    margin-bottom 150px

    @media (max-width 1400px)
      margin-bottom 100px

    @media (max-width 600px)
      margin-bottom 70px

  &__slider
    margin-bottom 50px

  &__slider-nav-wrapper
    display flex
    justify-content center

  &__header
    position relative
    margin-bottom 100px
    display flex
    flex-direction column

  &__link
    position absolute

    @media (max-width 1100px)
      position relative
      order 1
      width 75%

    @media (max-width 860px)
      font-size 30px
      overflow hidden

    @media (max-width 650px)
      font-size 20px
      width 100%

  &__title
    display flex
    flex-direction column
    font-size 75px
    text-align right

    @media (max-width 1100px)
      position relative
      margin-bottom 25px

    @media (max-width 860px)
      font-size 80px

    @media (max-width 650px)
      font-size 70px
      text-align center

    &-part-1
      font-size 1em
      line-height .7em

    &-part-2
      font-size .6em

</style>
