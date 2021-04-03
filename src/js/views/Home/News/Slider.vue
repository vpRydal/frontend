<template>
  <div class="slider">
    <Slick v-if="slides.length" :options="slickOptions" @beforeChange="handleBeforeChange" ref="slick" class="slider__slick-slider">
      <Slide v-for="(news, index) in slides"
             :key="index + 123"
             :header="news.header"
             :content="news.content"
             :photo="news.photo"
      />
    </Slick>
    <SliderNav
        v-if="slides.length"
        class="slider__nav nav_center"
        :current-slide-index="currentSlideIndex"
        :countSlides="slides.length"
        :nav-item-height="7"
        @next="handleNextSlide"
        @prev="handlePrevSlide"
    />
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Slide from "./Slide.vue";
import Slick from "vue-slick";
import SliderNav from "@/js/components/SliderNav.vue";
import News from "@/js/models/News";

@Component({
  components: {SliderNav, Slide, Slick},
})
export default class Slider extends Vue {
  currentSlideIndex = 0;
  slickOptions = {
    slidesToShow: 1,
    autoplay: true,
    delay: 5000,
    arrows: false
  };
  slides: Array<News> = [];

  mounted(): void {
    News.getList().then(({data}) => {
      this.slides = data.data
    })
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

  /* eslint-disable */
  handleBeforeChange(event: Event, slick: any, currentSlide: number, nextSlide: number) {
    this.currentSlideIndex = nextSlide;
  }
}
</script>

<style scoped lang="stylus">
.slider
  &__slick-slider
    margin-bottom 90px
</style>
