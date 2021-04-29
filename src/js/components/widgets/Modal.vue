<template>
    <transition name="modal">
        <div v-if="show" class="modal-wrapper" @click="$emit('close')">
            <div class="modal" @click.stop>
                <slot name="full-modal">
                    <slot name="full-header">
                        <div class="modal__header header">
                            <slot name="header"></slot>
                            <button class="modal__close cross cross_sm" @click="$emit('close')"></button>
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
                                <slot name="btn-ok">
                                    <button class="footer__btn btn btn_secondary btn_sm" @click="$emit('close')">Ок</button>
                                </slot>
                                <slot name="btn-close">
                                    <button class="footer__btn btn btn_secondary btn_bordered btn_sm" @click="$emit('close')">Закрыть</button>
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


contentPaddingX = 60
contentPaddingY = 35

.modal
    background-color white
    margin 0 auto
    max-width 600px
    @media (max-width 600px)
        width 100%

    &__close
        margin-left  30px

    &-wrapper
        position fixed
        top 0
        left 0
        height 100%
        width 100%
        background-color rgba(0, 0, 0, .4)
        z-index 3
        display flex
        align-items center

    &-leave-active
        transition opacity linear .5s

        & .modal
            transition transform linear .3s

    &-enter-active
        transition opacity ease-in .5s

        & .modal
            transition transform ease-in .3s

    &-enter-to, &-leave
        opacity 1

        & .modal
            transform unset


    &-enter, &-leave-to
        opacity 0
        & .modal
            transform scale(0)


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
    display flex
    justify-content flex-end

    &__btn
        margin 0 10px
        &:first-child
            margin-left 0
        &:last-child
            margin-right 0

</style>

