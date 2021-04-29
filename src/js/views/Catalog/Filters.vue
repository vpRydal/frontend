<template>
    <div class="filters" ref="wrapper">
        <div class="filters__container" ref="container">
            <form action="" class="filters__form form">
                <h3 class="filters__title">Что вы ищете?</h3>
                <div class="filters__section">
                    <h4 class="filters__section-title">Хозяйственное назначение</h4>
                    <div v-for="(type, index ) in realtyTypes"
                         class="form__group"
                         :key="`realty-type-${index}`">
                        <input type="checkbox" class="form__control" :id="`realty-type-${index}`" :value="type.id"
                               v-model="realtyTypesModel"/>
                        <label :for="`realty-type-${index}`" class="filters__form-label form__label flex-wrapper">
                          <span class="form__control-indicator"></span>
                          {{ type.name }}
                        </label>
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
                               class="filters__form-label form__label flex-wrapper">
                          <span class="form__control-indicator"></span>
                          {{ eq.name }}
                          </label>
                    </div>
                </div>
            </form>
            <div class="filters__section">
                <h4 class="filters__section-title">Площадь, кв. м.</h4>
                <div class="filters__range-container">
                    <Range
                        v-if="realtyMinMaxInfo"
                        class="filters__range"
                        :min="realtyMinMaxInfo.areaMin"
                        :max="realtyMinMaxInfo.areaMax"
                        ref="rangeArea"
                        v-model="areaModel"
                    >
                        <template v-slot:info="{ currentMin, currentMax }">
                            {{ Math.floor(currentMin) }} | {{ Math .ceil(currentMax) }}
                        </template>
                    </Range>
                </div>
            </div>
            <div class="filters__section">
                <h4 class="filters__section-title">Цена руб. / кв. м.</h4>
                <div class="filters__range-container">
                    <Range
                        v-if="realtyMinMaxInfo"
                        class="filters__range"
                        :min="realtyMinMaxInfo.pricePerMetrMin"
                        :max="realtyMinMaxInfo.pricePerMetrMax"
                        ref="rangePricePerMetr"
                        v-model="perPriceModel"
                    >
                        <template v-slot:info="{currentMin, currentMax}">
                            {{ Math.floor(currentMin) }}| {{ Math .ceil(currentMax) }}
                        </template>
                    </Range>
                </div>
            </div>
            <div class="filters__section">
                <h4 class="filters__section-title">Цена, руб.</h4>
                <div class="filters__range-container">
                    <Range
                        v-if="realtyMinMaxInfo"
                        class="filters__range"
                        ref="rangePrice"
                        :min="realtyMinMaxInfo.priceMin"
                        :max="realtyMinMaxInfo.priceMax"
                        v-model="priceModel"
                    >
                        <template v-slot:info="{currentMin, currentMax}">
                            {{ Math.floor(currentMin) }} | {{ Math .ceil(currentMax)}}
                        </template>
                    </Range>
                </div>
            </div>
            <div class="flex-wrapper flex-wrapper_J-C">
                <button class="btn btn_primary btn_sm" @click="onFilter">Найти</button>
                <button class="btn btn_secondary btn_sm" @click="onClear">Сбросить</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Emit, Ref, Vue, Watch} from "vue-property-decorator";
import Range from "@/js/components/ui/Range.vue";
import Select from "@/js/components/ui/Select.vue";
import RealtyType from "@/js/models/RealtyType";
import Realty from "@/js/models/Realty";
import {mapGetters, mapMutations} from "vuex";
import bus from "@/js/common/bus";
import {minMax, objectWIthAnyProperties, realtyMinMaxInfo} from "@/js/common/types";
import Equipment from "@/js/models/Equipment";


@Component({
    components: {Select, Range},
    computed: {
        ...mapGetters('common', {
            $windowWidth: 'windowWidth'
        }),
        ...mapGetters('queryParams', {
            $queryParams: 'params',
            $startedQueryParams: 'startedParams'
        })
    },
    methods: {
        ...mapMutations('queryParams', {
            $addParam: '_addParam',
            $setQueryParams: 'setQueryParams',
            $saveFiltersInUrl: 'saveInUrl',
        })
    }
})
export default class Filters extends Vue {
    realtyTypes: Array<RealtyType> = []
    realtyMinMaxInfo?: realtyMinMaxInfo = {
        pricePerMetrMax: -1,
        priceMin: -1,
        priceMax: -1,
        areaMin: -1,
        areaMax: -1,
        pricePerMetrMin: -1
    }
    equipment: Array<Equipment> = []
    realtyTypesModel: Array<number> = []
    realtyEquipmentModel: Array<Equipment> = []
    sticky = false
    $windowWidth!: number
    $queryParams!: objectWIthAnyProperties
    $startedQueryParams!: objectWIthAnyProperties
    priceModel = {min: 0, max: 0}
    areaModel = {min: 0, max: 0}
    perPriceModel = {min: 0, max: 0}
    $addParam!: (payload: { name: string, value: string | Array<number | string> | minMax | number | objectWIthAnyProperties }) => void
    $setQueryParams!: (params: objectWIthAnyProperties) => void
    @Ref('rangePricePerMetr') refRangePricePerMetr!: Range
    @Ref('rangePrice') refRangePrice!: Range
    @Ref('rangeArea') refRangeArea!: Range
    @Ref('container') refContainer!: HTMLElement

    $saveFiltersInUrl!: () => void

    @Emit('filter')
    onFilter(): void {
        bus.$emit('filters::filter')
        this.$emit('close')
    }
    @Emit('clear')
    onClear(): void {
        this.$setQueryParams({})
        this.$saveFiltersInUrl()

        if (this.realtyMinMaxInfo) {
            this.perPriceModel = {
                max: this.realtyMinMaxInfo.pricePerMetrMax,
                min: this.realtyMinMaxInfo.pricePerMetrMin
            }
            this.areaModel = { max: this.realtyMinMaxInfo.areaMax, min: this.realtyMinMaxInfo.areaMin }
            this.priceModel = { max: this.realtyMinMaxInfo.priceMax, min: this.realtyMinMaxInfo.priceMin }

            this.refRangePricePerMetr.setValue(this.perPriceModel, true);
            this.refRangePrice.setValue(this.priceModel, true);
            this.refRangeArea.setValue(this.areaModel, true);
        }
        this.realtyTypesModel = []
        this.realtyEquipmentModel = []

        bus.$emit('filters::clear')
        this.$emit('close')
    }
    onResize(): void {
        this.resize()
    }
    rangeModelIsValid(model: minMax): boolean {
      return model.max !== -1 && model.min !== -1
    }

    resize(): void {
        this.refRangePricePerMetr.onResize()
        this.refRangePrice.onResize()
        this.refRangeArea.onResize()
    }

    created(): void {
        RealtyType.getList().then(({data}) => {
            this.realtyTypes = data
        })

        Realty.getMinMax().then(res => {
            this.realtyMinMaxInfo = res.data

            this.$nextTick(() => {
                if (this.realtyMinMaxInfo) {

                    if (this.$startedQueryParams.pricePerMetrMax && this.$startedQueryParams.pricePerMetrMin) {
                        this.perPriceModel = {
                            max: this.$startedQueryParams.pricePerMetrMax as number,
                            min: this.$startedQueryParams.pricePerMetrMin as number
                        }
                    } else {
                        this.perPriceModel = {
                            max: this.realtyMinMaxInfo.pricePerMetrMax,
                            min: this.realtyMinMaxInfo.pricePerMetrMin
                        }
                    }

                    if (this.$startedQueryParams.areaMax && this.$startedQueryParams.areaMin) {
                        this.areaModel = {max: this.$startedQueryParams.areaMax as number, min: this.$startedQueryParams.areaMin as number}
                    } else {
                        this.areaModel = {max: this.realtyMinMaxInfo.areaMax, min: this.realtyMinMaxInfo.areaMin}
                    }

                    if (this.$startedQueryParams.priceMax && this.$startedQueryParams.priceMin) {
                        this.priceModel = {
                            max: this.$startedQueryParams.priceMax as number,
                            min: this.$startedQueryParams.priceMin as number
                        }
                    } else {
                        this.priceModel = {max: this.realtyMinMaxInfo.priceMax, min: this.realtyMinMaxInfo.priceMin}
                    }

                    this.refRangePricePerMetr.setValue(this.perPriceModel, true);
                    this.refRangePrice.setValue(this.priceModel, true);
                    this.refRangeArea.setValue(this.areaModel, true);
                }
            })
        })

      Equipment.getList().then(response => {
        this.equipment = response.data
      })

        addEventListener('resize', this.onResize)
    }

    beforeDestroy(): void {
        removeEventListener('resize', this.onResize)
    }

    @Watch('$startedQueryParams', { immediate: true })
    watchStartedParams (): void {
      this.realtyEquipmentModel = this.$startedQueryParams.equipments as Array <Equipment> || []
      this.realtyTypesModel = this.$startedQueryParams.types as Array <number> || []
    }

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
      if (this.rangeModelIsValid(payload)) {
        this.$addParam({ name: 'priceMax', value: payload.max })
        this.$addParam({ name: 'priceMin', value: payload.min })
      }
    }

    @Watch('areaModel')
    watchAreaModel(payload: minMax): void {
      if (this.rangeModelIsValid(payload)) {
        this.$addParam({ name: 'areaMax', value: payload.max })
        this.$addParam({ name: 'areaMin', value: payload.min })
      }
    }

    @Watch('perPriceModel')
    watchPerPriceModel(payload: minMax): void {
      if (this.rangeModelIsValid(payload)) {
        this.$addParam({ name: 'pricePerMetrMax', value: payload.max })
        this.$addParam({ name: 'pricePerMetrMin', value: payload.min })
      }
    }
}
</script>

<style scoped lang="stylus">
@import "~@/stylus/colors.styl"
.btn
    &:first-child
        margin-right 5px

.filters
    &__section
        margin-bottom 25px

        &:last-child
            margin-bottom 0

    &__container
        position relative
        width 100%

    &__title
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

</style>

