<template>
    <transition name="filters">
        <div
                v-if="open || $windowWidth >= 800"
                class="filters" :class="{'filters_open': open, 'filters_sticky': sticky && $windowWidth >= 800}"
                ref="filters"
        >
            <div class="filters__bg" v-if="open" @click="open = false"></div>
            <div class="filters__wrapper" :class="{'filters__wrapper_sticky': sticky && $windowWidth >= 800}"
                 ref="wrapper">
                <div class="filters__container" @click.stop ref="container">
                    <form action="" class="filters__form form">
                        <h3 class="filters__title">Что вы ищете?</h3>
                        <div class="filters__section">
                            <h4 class="filters__section-title">Хозяйственное назначение</h4>
                            <div v-for="(type, index ) in realtyTypes"
                                 class="form__group"
                                 :key="`realty-type-${index}`">
                                <input type="checkbox" class="form__control" :id="`realty-type-${index}`" :value="type.id"
                                       v-model="realtyTypesModel"/>
                                <label :for="`realty-type-${index}`" class="filters__form-label form__label flex-wrapper">{{
                                        type.name }}</label>
                            </div>
                        </div>
                        <div class="filters__section">
                            <h4 class="filters__section-title">Оснащение</h4>
                            <div v-for="(eq, index ) in equipment"
                                 class="form__group"
                                 :key="`equipment-type-${index}`">
                                <input type="checkbox" class="form__control" :id="`equipment-type-${index}`" :value="eq.id"
                                       v-model="realtyEquipmentModel"/>
                                <label :for="`equipment-type-${index}`"
                                       class="filters__form-label form__label flex-wrapper">{{ eq.title }}</label>
                            </div>
                        </div>
                    </form>
                    <div class="filters__section">
                        <h4 class="filters__section-title">Площадь, кв. м.</h4>
                        <div class="filters__range-container">
                            <Range
                                    class="filters__range"
                                    :min="17"
                                    :max="315"
                                    ref="rangeArea"
                                    v-model="areaModel"
                            >
                                <template v-slot:info="{currentMin, currentMax}">
                                    {{ currentMin }}кв. м. | {{ currentMax }}кв. м.
                                </template>
                            </Range>
                        </div>
                    </div>
                    <div class="filters__section">
                        <h4 class="filters__section-title">Цена, руб.</h4>
                        <div class="filters__range-container">
                            <Range
                                class="filters__range"
                                ref="rangePrice"
                                :min="380" :max="950"
                                v-model="priceModel"
                            >
                                <template v-slot:info="{currentMin, currentMax}">
                                    {{ currentMin }}Р | {{ currentMax }}Р
                                </template>
                            </Range>
                        </div>
                    </div>
                    <div class="flex-wrapper flex-wrapper_J-C">
                        <button class="btn btn_primary btn_sm">Найти</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
    import {Component, Prop, Ref, Vue, Watch} from "vue-property-decorator";
    import Range from "@/js/components/ui/Range.vue";
    import Select from "@/js/components/ui/Select.vue";
    import RealtyType from "@/js/models/RealtyType";
    import $ from "jquery";
    import { mapGetters, mapMutations} from "vuex";
    import bus from "@/js/common/bus";
    import {equipment, minMax, objectWIthAnyProperties} from "@/js/common/types";


    @Component({
        components: {Select, Range},
        computed: {
            ...mapGetters('common', {
                $windowWidth: 'windowWidth'
            }),
            ...mapGetters('queryParams', {
                $queryParams: 'params'
            })
        },
        methods: {
            ...mapMutations('queryParams', {
                $addParam: '_addParam'
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
        $windowWidth!: number
        $queryParams!: objectWIthAnyProperties
        priceModel = {min: 0, max: 0}
        areaModel = {min: 0, max: 0}
        $addParam!: (payload: {name: string, value: string | Array<number> | minMax}) => void

        @Ref('container')
        refContainer!: HTMLElement

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
            this.$addParam({name: 'types', value: model})
        }
        @Watch('realtyEquipmentModel')
        watchRealtyEquipmentModel(model: Array<number>): void {
            this.$addParam({name: 'equipments', value: model})
        }
        @Watch('priceModel')
        watchPriceModel(payload: minMax): void {
            this.$addParam({name: 'price', value: payload})
        }
        @Watch('areaModel')
        watchAreaModel(payload: minMax): void {
            this.$addParam({name: 'area', value: payload})
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
            if (this.open) {
                this.$emit('close')
            }
        }

        onResize(): void {
            if (this.open) {
                $(this.refContainer).height(`${window.innerHeight - 120}`)
            }
        }

        created(): void {
            RealtyType.getList().then(({data}) => {
                this.realtyTypes = data

                this.realtyEquipmentModel = this.$queryParams.equipments as Array<number> || []
                this.realtyTypesModel = this.$queryParams.types as Array<number> || []
                this.priceModel = this.$queryParams.price as minMax || {min: 0, max: 0}
                this.areaModel = this.$queryParams.area as minMax || {min: 0, max: 0}
            })

            addEventListener('click', this.onClick)
            addEventListener('resize', this.onResize)
        }

        beforeDestroy(): void {
            removeEventListener('click', this.onClick)
            removeEventListener('resize', this.onResize)
        }
    }
</script>

<style scoped lang="stylus">
    @import "~@/stylus/colors.styl"

    .filters
        transition transform ease-out .5s, background-color ease-out .1s
        padding-right 25px
        margin-left -10px
        position relative

        @media (max-width 800px)
            transform translateX(-100%)
            padding-top 110px


        &_open
            position fixed
            width 98%
            z-index 2
            transform unset
            top 0
            padding-bottom 30px

            & ^[0]__container
                background-color white
                height 78%

            & ^[0]__wrapper
                height 100%

        &__section
            margin-bottom 25px
            &:last-child
                margin-bottom 0

        &__wrapper
            position relative
            z-index 2

            &_sticky
                position absolute
                top 0
                left 0
                padding-top 110px

        &_sticky
            padding-left 245px

        &__bg
            position absolute
            background-color rgba(0, 0, 0, .5)
            height 100%
            width 100%
            top 0
            left 0
            z-index 1

        &__container
            position relative
            width 225px
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
            margin-bottom 15px

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

        &-enter-active, &-leave-active
            & ^[0]__wrapper
                transition transform ease-out .5s
            & ^[0]__bg
                transition opacity ease-out .2s

        &-enter, &-leave-to
            & ^[0]__wrapper
                transform translateX(-100%)
            & ^[0]__bg
                opacity 0

        &-enter-to, &-leave
            & ^[0]__wrapper
                transform unset
            & ^[0]__bg
                opacity 1


</style>

