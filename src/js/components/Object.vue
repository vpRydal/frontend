<template>
    <div class="object">
        <ibg class="object__img" :src="imgPath"/>
        <div class="object__info">
            <h3 class="object__title text-right">{{ title }}</h3>
            <div class="flex-wrapper flex-wrapper_J-SB">
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
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
    components: {},
    props: {
        area: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        imgPath: {
            type: String,
            required: true
        }
    }
})
export default class Item extends Vue {
}
</script>

<style scoped lang="stylus">
@import "~@/stylus/colors.styl"
.object
    position relative
    width 400px
    height 250px
    display flex

    &__img
        width 100%
        margin-bottom 55px

    &__title
        color white
        margin-right 5px
        margin-top 10px
        font-size 17px

    &__info
        width 100%
        background-color mainColor
        position absolute
        bottom 0
        display flex
        justify-content space-between
        font-size 17px
        flex-direction column

    &__col
        display flex
        flex-direction column

        &:last-child
            margin-right 5px

    &__area
        margin-left auto
        display block
        font-size 10px
        position relative
        align-self flex-end
        padding-right 15px

    &__price-wrapper
        height 25px
        width 100px
        position relative
        margin-top auto
        background-color #071a3c
        color white
        display flex
        justify-content center
        align-items center

        &:after
            content ''
            display block
            position absolute
            right 0
            top 0
            border-top: 0 solid transparent;
            border-left: 15px solid transparent;
            border-bottom: 25px solid mainColor;

    &__price
        position relative
        padding-right 13px
        padding-left 10px
        margin-right 10px
.m2, .p
    font-size 9px
    position absolute
    top 0
    right 0
.p
    left 0
    font-size 12px
    right auto
</style>
