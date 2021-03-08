<template>
    <div class="object object_op" @mouseenter="isHovered = true" @mouseleave="isHovered = false" ref="object">
        <ibg class="object__img" :src="imgPath"/>
        <div class="object__info">
            <div class="object__title text-right">
                <h3 class="">{{ isHovered ? title : titleValue }}</h3>
            </div>
            <div class="object__flex-wrapper">
                <div class="object__bg"></div>
                <div class="object__col">
                    <div class="object__price-wrapper fw-600">
                        <span class="object__price"><span class="p">&#8381;</span>{{ price }}<span class="m2">М2</span></span>
                    </div>
                </div>
                <div class="object__col flex-wrapper flex-wrapper_J-C">
                    <span class="object__area fw-600">Площадь: {{ area }} <span class="m2">М2</span></span>
                </div>
            </div>
        </div>
        <router-link class="stretched-link"
                     :to="{name: 'viewRealty', params: {category: 'category-name', 'id': this.id}}">
        </router-link>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import $ from 'jquery'

@Component({
    components: {},
    props: {
        area: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        imgPath: {
            type: String,
            required: true
        },
        id: {
            type: Number,
            required: true
        }
    }
})
export default class Item extends Vue {
    isHovered = false
    defaultHeight: undefined | number;
    defaultBgWidth: undefined | number;
    @Prop({ required: true }) title!: string

    get titleValue (): string {
      return this.title.length > 20 ? this.title.slice(0, 20) + '...' : this.title
    }

    mounted(): void {
        this.defaultHeight = $(this.$refs['object']).find('.object__info').height()
        this.defaultBgWidth = $(this.$refs['object']).find('.object__bg').width()
    }

    @Watch('isHovered')
    watchIsHovered(val: boolean): void {
        const $target = $(this.$refs['object'])
        const $targetTitle = $(this.$refs['object']).find('.object__title')
        const $targetImage = $target.find('.ibg')
        const $targetBG= $target.find('.object__bg')

        if (val) {
            $targetTitle.stop()
                .animate({
                    opacity: '0',
                }, 3, () => {
                    $targetTitle.animate({
                        'font-size': 25
                    }, {
                        start() {
                            $targetTitle.removeClass('text-right').addClass('text-center')
                            $target.css('color', 'white')
                            $targetBG.animate({
                                width: '100%'
                            })
                        },
                        complete: () => {
                            $targetTitle.animate({
                                opacity: '1',
                            }, 1)
                        }
                    })
                })

            $target.find('.object__info').stop().animate({
                height: '100%',
            }, {
                start() {
                    $target.addClass('object_opacity')
                    $targetImage.css('transform', 'scale(1.1)')
                }
            })
        } else {
            $targetTitle.stop().animate({
                opacity: '0',
            }, 3, () => {
                $targetTitle.animate({
                    'font-size': 17
                }, {
                    start() {
                        $targetTitle.removeClass('text-center').addClass('text-right')
                        $target.css('color', '')
                    },
                    complete: () => {
                        $targetTitle.animate({
                            opacity: '1',
                        }, 1)
                    }
                })
            })

            $target.find('.object__info').stop().animate({
                height: this.defaultHeight
            }, {
                start: () => {
                    $target.removeClass('object_opacity')
                    $targetImage.css('transform', 'none')
                    $targetBG.animate({
                        width: this.defaultBgWidth
                    })
                }
            })
        }
    }
}
</script>

<style scoped lang="stylus">
@import "~@/stylus/colors.styl"
@import "~@/stylus/mixins.styl"
@import "~@/stylus/common.styl";

.object
    position relative
    width 400px
    min-height  250px
    display flex
    overflow hidden
    font-size 16px

    &__img
        width 100%
        transition transform ease-out .5s

    &__title
        color white
        margin-right 5px
        margin-top 10px
        flex 1 1 100%
        display flex
        align-items center
        font-size 1em
        & h3
            width 100%

    &__info
        width 100%
        background-color mainColor
        position absolute
        bottom 0
        display flex
        font-size 1em
        flex-direction column
        transition background-color linear .5s
        justify-content center

        ^[0]_opacity &
            background-color getColorWithOpacity(mainColor, .8)

    &__flex-wrapper
        display flex
        justify-content space-between
        position: relative
    &__bg
        position absolute
        overflow visible !important
        left 0
        top 0
        width 80px
        height 100%
        background-color mainColorDark
        &:after
            content ''
            display block
            position absolute
            right -15px
            top 0
            transition border linear .47s
            border-top: 0 solid transparent;
            border-left: 15px solid mainColorDark;
            border-bottom: 25px solid mainColor;
            ^[0]_opacity &
                border-bottom: 25px solid getColorWithOpacity(mainColor, 0);


    &__col
        display flex
        flex-direction column

        &:last-child
            margin-right 5px
    &__area
        margin-left auto
        display block
        font-size .9em
        position relative
        align-self flex-end
        padding-right 15px
        transition color linear .2s

    &__price-wrapper
        height 25px
        width 75px
        position relative
        margin-top auto
        padding-left 15px
        color white
        display flex
        justify-content center
        align-items center

    &__price
        position relative
        padding-right 13px
        padding-left 10px
        margin-right 10px
</style>
