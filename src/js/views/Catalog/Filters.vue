<template>
    <transition name="filters">
        <div
            v-if="open || $windowWidth >= 800"
            class="filters" :class="{'filters_open': open, 'filters_sticky': false}" ref="filters">

            <div class="filters__container" @click.stop ref="container">
                <form action="" class="filters__form form">
                    <h3 class="filters__title">Что вы ищете?</h3>

                    <h4 class="filters__section-title">Хозяйственное назначание</h4>
                    <div v-for="(type, index ) in realtyTypes"
                         class="form__group"
                         :key="`realty-type-${index}`">
                        <input type="checkbox" class="form__control" :id="`realty-type-${index}`" :value="type.id" v-model="realtyTypesModel"/>
                        <label :for="`realty-type-${index}`" class="filters__form-label form__label flex-wrapper">{{ type.name }}</label>
                    </div>

                    <h4 class="filters__section-title">Оснащение</h4>
                        <div v-for="(eq, index ) in equipment"
                         class="form__group"
                         :key="`equipment-type-${index}`">
                        <input type="checkbox" class="form__control" :id="`equipment-type-${index}`" :value="eq.id" v-model="realtyEquipmentModel"/>
                        <label :for="`equipment-type-${index}`" class="filters__form-label form__label flex-wrapper">{{ eq.title }}</label>
                    </div>
                </form>
                <h4 class="filters__section-title">Площадь, кв. м.</h4>
                <div class="filters__range-container">
                    <Range
                        class="filters__range"
                        :min="17"
                        :max="315"
                        ref="rangeArea"
                    >
                        <template v-slot:info="{currentMin, currentMax}">
                            {{ currentMin }}кв. м. | {{ currentMax }}кв. м.
                        </template>
                    </Range>
                </div>
                <h4 class="filters__section-title">Цена, руб.</h4>
                <div class="filters__range-container">
                    <Range
                        class="filters__range"
                        :min="380"
                        :max="950"
                        ref="rangePrice"
                    >
                        <template v-slot:info="{currentMin, currentMax}">
                            {{ currentMin }}Р | {{ currentMax }}Р
                        </template>
                    </Range>
                </div>
                <div class="flex-wrapper flex-wrapper_J-C">
                    <button class="btn btn_primary btn_sm">Найти</button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import {Component, Prop, Ref, Vue, Watch} from "vue-property-decorator";
import Range from "@/js/components/ui/Range.vue";
import Select from "@/js/components/ui/Select.vue";
import RealtyType from "@/js/api/RealtyType";
import $ from "jquery";
import JQuery from "jquery";
import {mapGetters} from "vuex";
import bus from "@/js/common/bus";
import {equipment} from "@/js/common/types";


@Component({
    components: {Select, Range},
    computed: {
        ...mapGetters('common', {
            $windowWidth: 'windowWidth'
        })
    }
})
export default class Filters extends Vue {
    realtyTypes: Array<RealtyType> = []
    equipment: Array<equipment> = [
        {
            id: 1,
            title: 'Евроремонт'
        },
        {
            id: 2,
            title: 'Отопление'
        },
        {
            id: 3,
            title: 'Кондиционер'
        },
        {
            id: 4,
            title: 'Отдельный санузел'
        },
        {
            id: 5,
            title: 'Индивидуальный узел учёта электроэнергии'
        },
        {
            id: 6,
            title: 'Круглосуточный доступ'
        },
        {
            id: 7,
            title: 'Мебелью укомплектован'
        }
    ]
    realtyTypesModel: Array<number> = []
    realtyEquipmentModel: Array<number> = []
    sticky = false
    $refFilters!: JQuery<HTMLElement>
    $parentEl!: JQuery<HTMLElement>
    $refContainer!: JQuery<HTMLElement>

    @Ref('filters')
    refFilters!: HTMLElement
    @Ref('container')
    refContainer!: HTMLElement
    @Ref('rangePrice')
    refRangePrice!: Vue
    @Ref('rangeArea')
    refRangeArea!: Vue

    @Prop({
        required: true,
        type: Boolean
    })
    inRequestState!: boolean
    @Prop({
        required: true,
        type: Boolean
    })
    open!: boolean


    @Watch('realtyTypesModel')
    watchRealtyTypesModel(model: Array<number>): void {
        console.log(model)
    }
    @Watch('open')
    watchOpen(val: boolean): void {
        if (val) {
            $('body').css('overflow', 'hidden')
            setTimeout(() => {
                this.$nextTick(() => {
                    bus.$emit('update-range')
                    this.onResize()
                })
            }, 500)
        } else {
            $('body').css('overflow', '')
        }
    }

    onClick(): void {
        this.$emit('close')
    }
    onScroll(): void {
        if (this.inRequestState) {
            this.sticky = false
            return
        }

        const topParent = this.$parentEl.offset()?.top as number - 110
        const topWindow = window.scrollY

        this.sticky = topWindow > topParent
    }
    onResize(): void {
        if (this.open) {
            $(this.refContainer).height(`${window.innerHeight - 120}`)
        }
    }
    mounted(): void {
        this.$nextTick(() => {
            this.$refFilters = $(this.refFilters)
            this.$parentEl = this.$refFilters.parent()
            this.$refContainer = $(this.refContainer)
        })
    }
    created(): void {
        RealtyType.getList().then(({data}) => {
            this.realtyTypes = data
        })

        addEventListener('click', this.onClick)
        addEventListener('resize', this.onResize)
        addEventListener('scroll', this.onScroll)
    }
    beforeDestroy(): void {
        removeEventListener('click', this.onClick)
        removeEventListener('resize', this.onResize)
        removeEventListener('scroll', this.onScroll)
    }
}
</script>

<style scoped lang="stylus">
@import "~@/stylus/colors.styl"

.filters
    top 0
    position absolute
    transition transform ease-out .5s, background-color ease-out .1s
    padding-right 25px
    height 100%
    margin-left -10px

    @media (max-width 800px)
        transform translateX(-100%)
        padding-top 110px

    &_open
        position fixed
        width 98%
        background-color rgba(0, 0, 0, .5)
        z-index 2
        transform unset

    &_sticky
        position fixed
        padding-top 110px



    &__container
        position relative
        width 225px
        background-color white
        padding-right 10px
        overflow-y auto
        padding-bottom 19px
        padding-left 10px

    &__title
        padding-top 15px
        font-size 1.2rem
        margin-bottom 30px
        text-align center

    &__section-title
        font-size .8rem
        margin-bottom 20px

    &__range
        max-width 92%
        &-container
            padding-top 40px
            margin-bottom 30px

    &__form
        font-size .7rem
        margin-bottom 30px

        &-label
            padding-top 3px

.filters
    &-enter-active, &-leave-active
        transition transform ease-out .5s, opacity ease-out .5s

    &-enter, &-leave-to
        opacity 0
        transform translateX(-100%)

    &-enter-to, &-leave
        opacity 1
        transform unset


</style>

