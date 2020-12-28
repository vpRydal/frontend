<template>
    <div class="slider">
        <div class="slider__bg-rectangle">
        </div>
        <transition
            :enter-class="enterClass" enter-active-class="anim-active-enter" :enter-to-class="enterToClass"
            :leave-class="leaveClass" leave-active-class="anim-active-leave" :leave-to-class="leaveToClass"
            mode="out-in"
            v-if="images.length"
        >
            <ibg v-for="(img, index) in images" :key="index" v-if="index === currentImageIndex" class="slider__img"
                 :src="img"></ibg>
        </transition>
        <div class="slider__nav nav">
            <ul class="nav__list" v-if="images.length">
                <li v-for="(img, index) in images"
                    :key="index"
                    class="nav__item"
                    :class="{'nav__item_current': index === currentImageIndex}"
                    @click="changeCurrentSlide(index)"
                ></li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import imgTown from '@/assets/img/town.png'
import {Component, Vue, Watch} from "vue-property-decorator";

@Component({
    data: () => ({
        imgTown
    })
})
export default class Slider extends Vue {
    enterClass = 'anim-enter-from-left'
    enterToClass = 'anim-enter-from-left-to'
    leaveClass = ''
    leaveToClass = ''
    intervalId = 0
    isMouseClicked = false

    currentImageIndex = 0
    images = new Array<string>(imgTown, imgTown, imgTown, imgTown)

    mounted(): void {
        this.startAutoplay()
    }

    changeCurrentSlide(newSlideIndex: number): void {
        this.isMouseClicked = true
        this.currentImageIndex = newSlideIndex

        if (this.intervalId) {
            clearInterval(this.intervalId)
            this.startAutoplay()
        }
    }

    startAutoplay(): void {
        this.intervalId = setInterval(() => {
            this.nextSlide()
        }, 5000)
    }

    nextSlide(): void{
        if (this.currentImageIndex === this.images.length - 1) {
            this.currentImageIndex = 0
        } else {
            this.currentImageIndex++
        }
    }

    @Watch('currentImageIndex')
    watchCurrentImageIndex(val: number, oldVal: number):void {
        if (val > oldVal || (oldVal === this.images.length - 1 && val < oldVal && !this.isMouseClicked)) {
            this.enterClass = 'anim-enter-left'
            this.enterToClass = 'anim-enter-left-to'
            this.leaveClass = 'anim-leave-right'
            this.leaveToClass = 'anim-leave-right-to'
        } else {
            this.enterClass = 'anim-enter-right'
            this.enterToClass = 'anim-enter-right-to'
            this.leaveClass = 'anim-leave-left'
            this.leaveToClass = 'anim-leave-left-to'
        }

        this.isMouseClicked = false
    }
}
</script>

<style scoped lang="stylus">
@import "~@/stylus/colors.styl"

.slider
    position relative
    height 100%
    width 100%
    display flex
    align-items center
    @media (max-width 1000px)
        flex-direction column

    &__bg-rectangle
        position absolute
        height 100%
        background-color mainColor
        width 40%
        @media (max-width 1000px)
            display none

    &__img
        position relative
        z-index 1
        width 66%
        margin 0 auto
        padding 0 0 67% 0
        @media (max-width 600px)
            width 90%
        @media (max-width 1000px)
            margin-bottom 20px

    &__nav
        position absolute
        bottom 1%
        right 25%
        @media (max-width 1000px)
            position unset

.nav
    &__list
        display flex

    &__item
        background-color mainColor
        width 17px
        height 17px
        margin 7.5px
        transition background-color linear .5s
        cursor pointer

        &_current
            background-color mainColorDark


.anim
    &-enter-left
        transform translateX(-100%)
        opacity 0
        &-to
            transform none
            opacity 1
    &-enter-right
        transform translateX(100%)
        opacity 0
        &-to
            transform none
            opacity 1
    &-leave-left
        transform none
        opacity 1
        &-to
            transform translateX(-100%)
            opacity 0

    &-leave-right
        transform none
        opacity 1
        &-to
            transform translateX(100%)
            opacity 0
    &-active
        &-leave, &-enter
            transition transform linear .3s, opacity linear .3s


</style>
