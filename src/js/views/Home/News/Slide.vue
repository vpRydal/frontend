<template>
    <div class="slide">
        <div class="slide__flex-wrapper flex-wrapper">
            <ibg :src="imageBasePath + photo" class="slide__img"/>
            <div class="slide__body">
                <h3 class="slide__title">{{ header }}</h3>
                <p class="slide__text" v-html="content"></p>
            </div>
        </div>
      <router-link class="slide__link" :to="{ name: 'news.view', params: { id } }"/>
    </div>
</template>

<script lang="ts">
import {Component, Inject, Vue} from 'vue-property-decorator';

    @Component({
        props: {
            id: {
                type: Number,
                required: true
            },
            content: {
                type: String,
                required: true
            },
            photo: {
                type: String,
                required: true
            },
            header: {
                type: String,
                required: true
            }
        }
    })
    export default class Slide extends Vue {
      @Inject('imageBasePath') imageBasePath!: string
    }
</script>

<style scoped lang="stylus">
    @import "../../../../stylus/colors.styl"
    .slide
        position relative
        font-size 1rem
        @media (max-width 500px)
            font-size .9rem
        @media (max-width 320px)
            font-size .8rem

        &__link
          position: absolute;
          top 0
          left 0
          height 100%
          width 100%

        &__flex-wrapper
            margin 0 45px
            @media (max-width 1100px)
                flex-direction column
                align-items  center
            @media (max-width 700px)
                margin 0 20px
            @media (max-width 400px)
                margin 0 10px
            @media (max-width 300px)
                margin 0
        &__body
            width 600px
            font-size 1em
            @media (max-width 1100px)
                max-width 800px
                width 100%
                margin 0 auto
        &__img
            max-width 550px
            max-height 450px
            width 100%
            margin-right 90px
            @media (max-width 1300px)
                margin-right 40px
                margin-left 0
            @media (max-width 1100px)
                padding 0 0 40% 20%
                margin-right 0
                margin-bottom 30px
        &__title
            color mainColor
            margin-bottom 40px
            font-size 1.7em
</style>
