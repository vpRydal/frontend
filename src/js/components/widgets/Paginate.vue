<template>
    <div class="paginate">
        <button class="paginate__item paginate__item_prev">Предыдущая</button>
        <button class="paginate__item">1</button>
        <button class="paginate__item paginate__item_selected">2</button>
        <button class="paginate__item">3</button>
        <button class="paginate__item paginate__item_next">Следующая</button>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component({
})
export default class Paginate extends Vue {

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
                &:hover
                    transform none
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

</style>