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
            <label :for="`realty-type-${index}`" class="filters__form-label form__label flex-wrapper">{{
                type.name
              }}</label>
          </div>
        </div>
        <div class="filters__section">
          <h4 class="filters__section-title">Оснащение</h4>
          <div v-for="(eq, index ) in equipment"
               class="form__group"
               :key="`equipment-type-${index}`">
            <input type="checkbox" class="form__control" :id="`equipment-type-${index}`" :value="eq.value"
                   v-model="realtyEquipmentModel"/>
            <label :for="`equipment-type-${index}`"
                   class="filters__form-label form__label flex-wrapper">{{ eq.label }}</label>
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
            <template v-slot:info="{currentMin, currentMax}">
              {{ currentMin }}кв. м. | {{ currentMax }}кв. м.
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
              ref="rangeArea"
              v-model="perPriceModel"
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
              v-if="realtyMinMaxInfo"
              class="filters__range"
              ref="rangePrice"
              :min="realtyMinMaxInfo.priceMin"
              :max="realtyMinMaxInfo.priceMax"
              v-model="priceModel"
          >
            <template v-slot:info="{currentMin, currentMax}">
              {{ currentMin }}Р | {{ currentMax }}Р
            </template>
          </Range>
        </div>
      </div>
      <div class="flex-wrapper flex-wrapper_J-C">
        <button class="btn btn_primary btn_sm" @click="$emit('filter')">Найти</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue, Watch } from "vue-property-decorator";
import Range from "@/js/components/ui/Range.vue";
import Select from "@/js/components/ui/Select.vue";
import RealtyType from "@/js/models/RealtyType";
import Realty from "@/js/models/Realty";
import $ from "jquery";
import { mapGetters, mapMutations } from "vuex";
import bus from "@/js/common/bus";
import { minMax, objectWIthAnyProperties, realtyMinMaxInfo } from "@/js/common/types";


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
    realtyMinMaxInfo?: realtyMinMaxInfo = { pricePerMetrMax: 0, priceMin: 0, priceMax: 0, areaMin: 0, areaMax: 0, pricePerMetrMin: 0 }
  equipment: Array<{ value: string; label: string }> = [
    {
      value: 'heating',
      label: 'Отопление'
    },
    {
      value: 'restroom',
      label: 'Отдельный санузел'
    },
    {
      value: 'energy',
      label: 'Индивидуальный узел учёта электроэнергии'
    },
    {
      value: 'access',
      label: 'Круглосуточный доступ'
    },
    {
      value: 'furniture',
      label: 'Мебелью укомплектован'
    }
  ]
  realtyTypesModel: Array<number> = []
  realtyEquipmentModel: Array<number> = []
  sticky = false
  $windowWidth!: number
  $queryParams!: objectWIthAnyProperties
  priceModel = {min: 0, max: 0}
  areaModel = {min: 0, max: 0}
    perPriceModel = {min: 0, max: 0}
  $addParam!: (payload: { name: string, value: string | Array<number> | minMax | number }) => void

  @Ref('container')
  refContainer!: HTMLElement

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
    this.$addParam({ name: 'priceMax', value: payload.max })
    this.$addParam({ name: 'priceMin', value: payload.min })
  }

  @Watch('areaModel')
  watchAreaModel(payload: minMax): void {
      this.$addParam({ name: 'areaMax', value: payload.max })
      this.$addParam({ name: 'areaMin', value: payload.min })
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
    this.resize()
  }

  resize (force=false): void {
    if (this.open || force) {
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

      Realty.getMinMax().then(res => {
          this.realtyMinMaxInfo = res.data

          this.$nextTick(() => {
              if (this.realtyMinMaxInfo) {
                  this.priceModel = { max: this.realtyMinMaxInfo.priceMax, min: this.realtyMinMaxInfo.priceMin }
                  this.areaModel = { max: this.realtyMinMaxInfo.areaMax, min: this.realtyMinMaxInfo.areaMin }
                  this.perPriceModel = { max: this.realtyMinMaxInfo.pricePerMetrMax, min: this.realtyMinMaxInfo.pricePerMetrMin }
              }
          })
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

