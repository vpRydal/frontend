<template>
    <div class="paginate">
        <button class="paginate__item paginate__item_prev" :disabled="!allowPrevPage" @click="changePage(prevPage)">Предыдущая</button>
        <transition name="btn">
            <button v-if="allowPrevPage" class="paginate__item" @click="changePage(prevPage)">{{ prevPage + 1}}</button>
        </transition>
        <button class="paginate__item paginate__item_selected">{{ currentPage + 1 }}</button>
        <transition name="btn">
            <button v-if="allowNextPage" class="paginate__item" @click="changePage(nextPage)">{{ nextPage + 1}}</button>
        </transition>
        <button class="paginate__item paginate__item_next" :disabled="!allowNextPage" @click="changePage(nextPage)">Следующая</button>
    </div>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue, Watch} from "vue-property-decorator";

@Component({
})
export default class Paginate extends Vue {
    prevPage = 0
    nextPage = 0
    allowPrevPage = false
    allowNextPage = true

    @Prop({
        required: true,
        type: Number
    })
    totalPages!: number
    @Prop({
        required: true,
        type: Number
    })
    totalItems!: number
    @Prop({
        required: true,
        type: Number
    })
    itemsOnPage!: number
    @Prop({
        required: true,
        type: Number
    })
    currentPage!: number

    @Watch('totalItems', {immediate: true})
    @Watch('itemsOnPage', {immediate: true})
    @Watch('currentPage', {immediate: true})
    @Watch('totalPages', {immediate: true})
    watchProps(): void {
        this.prevPage = this.currentPage - 1;
        this.nextPage = this.currentPage + 1;

        this.allowPrevPage = this.prevPage >= 0
        this.allowNextPage = this.nextPage <= this.totalPages
    }

    @Emit('onChangePage')
    changePage(page: number): number {
        return page
    }
}
</script>

<style scoped lang="stylus">
    @import "~@/stylus/colors.styl"

    .paginate
        display flex
        justify-content center
        align-items center

        &__item
            background-color mainColor
            font-weight 600
            font-size 23px
            width 50px
            height 50px
            color white
            transition transform ease-out .5s
            margin 0 5px
            &:hover
                transform translateY(-5px)

            &_next, &_prev, &_selected
                background-color white
                font-size 14px
                color mainColorDark
                transition color ease-out .5s
                &:hover
                    transform none
                    color mainColor

                &[disabled]
                    &, &:hover
                        cursor not-allowed
                        color gray

            &_next, &_prev
                margin 0
                width auto

            &_next
                margin-left 15px
            &_prev
                margin-right 15px

            &_selected
                font-size 23px
                padding-top 15px
                &:hover
                    color inherit


    .btn
        &-leave-active, &-enter-active
            transition transform ease-out .8s, opacity linear .4s

        &-enter, &-leave-to
            transform translateY(100%) !important
            opacity 0

        &-enter-to, &-leave
            transform unset
            opacity 1
</style>
