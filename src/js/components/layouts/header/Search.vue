<template>
    <div class="search">
        <input type="text"
               id="search"
               class="search__input input_null"
               ref="input"
               :style="{width: this.alwaysOpen? fullSize? '85%' : '200px' : 0}"
               @blur="showInput = false"

        >
        <span class="search__placeholder cursor-pointer" @click="showInput = true" ref="placeholder"
              :style="{width: this.alwaysOpen? 0: '60px'}"
        >Поиск</span>
        <ibg class="search__icon cursor-pointer" :src="searchPng"/>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import searchPng from "@/assets/img/search.png";
import $ from "jquery";

@Component({
    data: () => ({
        searchPng
    })
})
export default class Search extends Vue {
    showInput = false


    @Prop({
        type: Boolean,
        default: () => false
    })
    alwaysOpen!: boolean

    @Prop({
        type: Boolean,
        default: () => false
    })
    fullSize!: boolean

    @Watch('showInput')
    watchShowInput(val: boolean): void {
        if (this.alwaysOpen) return

        const $input = $(this.$refs['input'])
        const $label = $(this.$refs['placeholder'])

        if (val) {
            $label.animate({
                width: 0
            }, {
                duration: 'fast',
                complete() {
                    $input.animate({
                        width: 200
                    }, {
                        duration: 'fast',
                        done() {
                            $input.trigger('focus')
                        }
                    })
                }
            })

        } else {
            $input.animate({
                width: 0
            }, {
                duration: 'fast',
                complete: () => {
                    $label.animate({
                        width: 60
                    })
                }
            })
        }
    }
}
</script>

<style scoped lang="stylus">
@import "~@/stylus/colors.styl"

.search
    display flex
    align-items center
    color mainColor

    &__placeholder
        overflow hidden

    &__icon
        width 25px
        height 25px
        margin-left 7px


    &__input
        font-size 17px
        border-bottom mainColor solid 1px
        color mainColor
        text-decoration none
        border-radius unset

        &:after
            content ''
            display block
            height 1px
            background-color mainColor
            width 100%


</style>
