<template>
  <div class="category" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <div class="category__content-wrapper">
      <ibg :src="imgPath" class="category__img"/>
      <div class="category__name" ref="name">
        <div class="category__name-value" ref="name-value">
          <span>{{ name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Ref, Vue, Watch} from "vue-property-decorator";
import $ from 'jquery'

@Component({

})
export default class Category extends Vue {
  @Prop({ required: true }) name!: string
  @Prop({ required: true }) imgPath!: string
  @Prop({ required: false }) id!: number | string
  @Ref('name') refName!: HTMLElement
  @Ref('name-value') refNameValue!: HTMLElement
  isHovered = false
  oldHeight = 0

  @Watch('isHovered')
  watchIsHovered (val: boolean): void {
    if (val) {
      this.oldHeight = $(this.refName).height() as number

      $(this.refName).stop()
          .animate({
            height: '100%',
          }, {
            start() {
              $(this).css('background-color', 'rgba(50,161,208,0.6)')
                  .find('.category__name-value')
                  .animate({
                    opacity: 0
                  }, {
                    duration: 200,
                  })
            },
            done() {
              $(this)
                  .find('.category__name-value').height('100%')
                  .addClass('category__name-value_big').animate({ opacity: 1 }, 400)
            }
          })
    } else {
      $(this.refName).stop()
          .animate({
            height: this.oldHeight
          }, {
            start() {
              $(this).css('background-color', '#32a1d0')
                  .find('.category__name-value')
                  .animate({
                    opacity: 0
                  }, {
                    duration: 200,
                  })
            },
            done() {
             setTimeout(() => {
               $(this).find('.category__name-value')
                   .removeClass('category__name-value_big').animate({ opacity: 1 }, 200)
             }, 200)
            }
          })
    }
  }
}
</script>

<style scoped lang="stylus">
@import "~@/stylus/colors.styl"

.category
  font-size 1rem

  &__content-wrapper
    position relative
    margin  0 10px

  &__img
    padding 0 0 72% 0
    width 100%

  &__name
    display block
    position absolute
    bottom 0
    left 0
    width 91.5%
    padding 10px 15px
    color white
    background-color mainColor
    text-align right
    font-family Inter-Bold
    font-size 1.4em
    transition all linear .2s

    &-value
      transition all linear .1s
      display: flex;
      align-items  center
      justify-content flex-end

      &_big
        font-size 40px
        text-align center
        justify-content center

    @media (max-width 1200px)
      width 94%

    @media (max-width 800px)
      width 91%

    @media (max-width 700px)
      width 95.5%

    @media (max-width 600px)
      width 92%
</style>
