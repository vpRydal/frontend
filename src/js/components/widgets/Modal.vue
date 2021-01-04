<template>
    <transition name="modal">
        <div v-if="show" class="modal-wrapper" @click="$emit('close')">
            <div class="modal" @click.stop>
                <slot name="full-modal">
                    <slot name="full-header">
                        <div class="modal__header header">
                            <slot name="header"></slot>
                            <button class="modal__close" @click="$emit('close')">x</button>
                        </div>
                    </slot>
                    <slot name="full-content">
                        <div class="content">
                            <div class="content__wrapper">
                                <slot name="content"></slot>
                            </div>
                        </div>
                  </slot>
                    <slot name="full-footer">
                        <div class="footer">
                            <slot name="footer">
                                <slot name="btn-close">
                                    <button class="btn btn_secondary btn_sm" @click="$emit('close')">Закрыть</button>
                                </slot>
                            </slot>
                        </div>
                    </slot>
                </slot>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import $ from 'jquery'


@Component({})
export default class Modal extends Vue {
    @Prop({
        required: true,
        default: () => false
    })
    show!: boolean

    @Watch('show')
    watchShow(val: boolean): void {
        const $body = $('body')

        if (val) {
            $body.css('overflow', 'hidden')
        } else {
            $body.css('overflow', 'unset')
        }
    }
}
</script>

<style scoped lang="stylus">
@import "~@/stylus/colors.styl"
@import "~@/stylus/mixins.styl"


contentPaddingX = 20
contentPaddingY = 15

.modal
    background-color white
    margin 0 auto
    width 600px

    &__close
        position relative
        color black
        padding 10px 15px
        font-weight 600
        display block
        margin-left  30px

        &, &:after
            transition background-color ease-in .3s

        &:after
            z-index -1
            content ''
            position absolute
            width 100%
            height 100%
            top 0
            left 0


        &:hover
            background-color mainColor
            &:after
                background-color mainColor

    &-wrapper
        position fixed
        top 0
        left 0
        width 100%
        height 100%
        background-color rgba(0, 0, 0, .4)
        z-index 3
        display flex
        align-items center


    &-leave-active
        transition transform linear .3s, opacity linear .5s

    &-enter-active
        transition transform ease-in .3s, opacity ease-in .5s

    &-enter-to, &-leave
        transform unset
        opacity 1


    &-enter, &-leave-to
        transform translateY(-100%)
        opacity 0


.header
    padding (contentPaddingY)px (contentPaddingX)px
    display flex
    justify-content space-between
    align-items center
    border-bottom getColorWithOpacity(mainColor, .6) solid 1px

.content
    padding (contentPaddingY)px (contentPaddingX)px

    &__wrapper
        max-height 600px
.footer
    padding (contentPaddingY)px (contentPaddingX)px

</style>

