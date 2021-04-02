<template>
  <div class="catalog">
    <transition name="btn">
      <button v-if="!isOpenedSidebar" class="catalog__btn-open-filters" @click.stop="onOpenFilters"></button>
    </transition>

    <div class="container">
      <div class="catalog__titles text-center">
        <h1 class="catalog__title">Аренда офисов в Севастополе от собственника Технопарк "Маяк"</h1>
        <h2 class="catalog__subtitle text-main-color">При условии внесения предоплаты предоставляется
          дополнительная скидка!</h2>
        <p>Настройте параметры поиска по желаемым результатам и изучайте каталог предложений с фотографиями.
          Меняйте стоимость, метраж, планировку, назначение и другие параметры – находите самое лучшее
          помещение!
          Кроме того, вы можете воспользоваться услугой «онлайн-консультант» или позвонить по телефону:
          <a href="tel:+7(978)734-58-55" class="link">+7(978)734-58-55</a>
        </p>
      </div>
      <div class="catalog__types types text-center">
        <span class="types__item">Офисы от собственника</span>
        <span class="types__item">От 10 до 500 кв. м.</span>
        <span class="types__item">От 650 руб. за кв. м.</span>
        <span class="types__item">Свежий ремонт</span>
        <span class="types__item">Кондиционер</span>
        <span class="types__item">Круглосуточный доступ</span>
        <span class="types__item">Развитая инфраструктура</span>
        <span class="types__item">Охраняемая территория, видеонаблюдение</span>
      </div>
      <div class="catalog__main-content" :class="{ 'catalog__main-content_with-realty':  !$onlyMap}">
          <LeftSideBar class="catalog__sidebar" :height="mapHeight" :open="isOpenedSidebar"
                       @close="isOpenedSidebar = false" @filter="onFilter"/>
          <Map class="catalog__map"/>
        <div v-if="!$onlyMap"
             class="catalog__realty-wrapper" ref="realty">
          <transition-group class="catalog__objects" tag="div" name="realty"
                            :css="false"
                            @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave">
            <Realty
                class="realty"
                v-if="$realty.length"
                v-for="(object, index) in $realty"
                :key="index + object.id"
                :area="object.area"
                :title="object.name"
                :price="object.price_per_metr"
                :img-path="object.img_path"
                :data-index="index"
                :id="object.id"
            />
          </transition-group>
          <div v-if="inRequestState" class="catalog__loader">
            <Preloader lg/>
          </div>
          <Pagination class="catalog__paginate"
                      :value="paginator.currentPage"
                      :items-on-page="paginator.itemsOnPage"
                      :total-items="paginator.totalItems"
                      :total-pages="paginator.totalPages"
                      @input="onSelectedPage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Inject, Ref, Watch} from 'vue-property-decorator';
import {getModule} from "vuex-module-decorators";
import {mapGetters, mapMutations} from "vuex";
import $ from "jquery";
import Realty from "@/js/components/RealtyCard.vue";
import RealtyModel from "@/js/models/Realty";
import imgTown from "@/assets/img/town.png";
import Pagination from "@/js/components/widgets/Paginator.vue";
import Select from "@/js/components/ui/Select.vue";
import Range from "@/js/components/ui/Range.vue";
import Preloader from "@/js/components/widgets/Preloader.vue";
import Filters from "@/js/views/Catalog/Filters.vue";
import CatalogModule from "@/js/store/modules/catalog";
import {ScrollTo} from "@/js/mixins/common";
import {objectWIthAnyProperties} from "@/js/common/types";
import bus from "@/js/common/bus";
import Balloon from "@/js/components/widgets/Balloon.vue";
import LeftSideBar from "@/js/views/Catalog/LeftSideBar.vue";
import Map from "@/js/views/Catalog/Map.vue";
import {AxiosResponse} from "axios";
import Paginator from "@/js/common/helpers/Paginator";


@Component({
  components: { Map, LeftSideBar, Balloon, Filters, Range, Select, Pagination, Realty, Preloader },
  data: () => ({
    imgTown,
    bus
  }),
  metaInfo: {
    title: 'Аренда помещений Севастополь',
  },
  computed: {
    ...mapGetters('common', {
      $windowWidth: 'windowWidth'
    }),
    ...mapGetters('queryParams', {
      $queryParams: 'params',
      $filtersForDefault: 'filtersForDefault'
    }),
    ...mapGetters('catalog', {
      $realty: 'realty',
      $onlyMap: 'onlyMap',
    })
  },
  methods: {
    ...mapMutations('queryParams', {
      $saveFiltersInUrl: 'saveInUrl',
    }),
  }
})
export default class Catalog extends ScrollTo {
  realtyLength = 0
  inRequestState = false
  isOpenedSidebar = false
  $queryParams!: objectWIthAnyProperties
  $filtersForDefault!: objectWIthAnyProperties
  $realty!: Array<RealtyModel>
  $onlyMap!: boolean
  catalogModule: CatalogModule
  paginator = new Paginator
  @Ref('realty') refRealty!: HTMLElement

  get mapHeight(): number {
    return window.innerHeight - 120
  }

  @Inject('imageBasePath') imageBasePath!: string

  constructor() {
    super();

    this.catalogModule = getModule(CatalogModule, this.$store)
  }

  $saveFiltersInUrl!: () => void

  onBeforeEnter(el: HTMLElement): void {
    $(el).css('opacity', 0)
  }

  onEnter(el: HTMLElement, done: () => void): void {
    if (el) {
      let delay = Number(el.dataset.index) * 150

      setTimeout(() => {
        $(el).animate({
          opacity: 1
        }, "fast", done)
      }, delay)
    }
  }

  onLeave(el: HTMLElement, done: () => void): void {
    if (el) {
      let index = Number(el.dataset.index)
      let delay = (this.realtyLength - index) * 100

      setTimeout(() => {
        $(el).animate({
          opacity: 0
        }, {
          duration: 'fast',
          complete: () => {
            if (index === 0) {
              this.$nextTick(() => {
                this.getRealty({page: this.paginator.currentPage})
                    .finally(() => {
                      this.scrollTo(this.refRealty, -200)
                    })
              })
            }
            done();
          }
        })
      }, delay)
    }
  }

  onOpenFilters(): void {
    this.isOpenedSidebar = true
  }

  onSelectedPage(page: number): void {
    this.paginator.currentPage = page
    this.catalogModule._setRealty([])

  }

  onFilter(): void {
    this.isOpenedSidebar = false

    if (!this.$onlyMap) {
      this.paginator.currentPage = 1
      this.catalogModule._setRealty([])
    }
  }

  onFilterClear(): void {
    this.isOpenedSidebar = false
  }

  getRealty(options: { page?: number } = {}): Promise<AxiosResponse<Paginator<RealtyModel>>> {
    this.inRequestState = true

    return RealtyModel.getList({...this.$filtersForDefault, ...options, count: 12}).then((response) => {
      const paginator = response.data
      Paginator.initPaginator(paginator)

      this.realtyLength = paginator.data.length
      this.paginator = paginator

      this.$saveFiltersInUrl()

      getModule(CatalogModule, this.$store).setRealty(paginator.data)
      this.inRequestState = false

      return response
    })
  }

  created(): void {
    bus.$on('filters::clear', this.onFilterClear)

    this.getRealty()
  }

  @Watch('$onlyMap')
  watchOnlyMap(val: boolean): void {
    if (!val) {
      this.paginator.currentPage = 1
      this.catalogModule._setRealty([])
      delete this.$queryParams.bounds
      delete this.$queryParams.zoom
      delete this.$queryParams.center
      delete this.$queryParams.latitudeMin
      delete this.$queryParams.latitudeMax
      delete this.$queryParams.longitudeMin
      delete this.$queryParams.longitudeMax

      this.getRealty().finally(() => {
        this.scrollTo(this.refRealty, -200)
      })
    }
  }
}
</script>

<style scoped lang="stylus">
@import "~@/stylus/colors.styl"
.btn
  &-enter-active, &-leave-active
    transition transform ease-out .5s, opacity ease-out .5s

  &-enter, &-leave-to
    opacity 0
    transform translateX(-100%)

  &-enter-to, &-leave
    opacity 1
    transform unset

.catalog
  margin-top 40px
  margin-bottom 75px

  &__btn-open-filters
    position fixed
    display none
    width 50px
    height 50px
    border-radius 50%
    background-color mainColor
    left -20px
    top 50%
    z-index 3
    box-shadow 0 2px 5px 0 rgba(0, 0, 0, .5)

    &:after, &:before
      content ''
      width 20px
      height 3px
      background-color white
      position absolute
      right 7px
      top 17px
      transform rotate(45deg)

    &:before
      bottom 17px
      top auto
      transform rotate(-45deg)


    @media (max-width 800px)
      display block

  &__loader
    display flex
    justify-content center
    align-items center
    margin-bottom 75px
    flex 1 1 100%

  &__titles
    margin-bottom 57px

  &__title
    font-size 28px
    margin-bottom 12px

  &__subtitle
    font-size 19px
    margin-bottom 18px

  &__text
    font-size 19px

  &__realty-wrapper
    width 100%
    transition margin ease-out .5s
    display flex
    flex-direction column
    grid-area realty

    @media (max-width 800px)
      margin-left 0


  &__objects
    width 100%
    display grid
    grid-template-columns 1fr 1fr 1fr
    margin-bottom 60px
    grid-gap 22px

    @media (max-width 1100px)
      grid-template-columns 1fr 1fr
    @media (max-width 800px)
      grid-template-columns 1fr 1fr
    @media (max-width 600px)
      grid-template-columns 1fr

    & .object
      margin 15px auto
      width 100%
      min-height 200px
      font-size 15px


  &__map
    grid-area map
    margin-bottom 25px

  &__main-content
    position relative
    display grid
    grid-template-columns 320px 1fr 1fr
    grid-template-areas: "sidebar map map"

    &_with-realty
      grid-template-areas: "sidebar map map" "sidebar realty realty"

    @media (max-width 800px)
      grid-template-columns 1fr 1fr
      grid-template-areas: "map map" "realty realty"


  &__sidebar
    grid-area sidebar


.realty
  &-enter-active, &-leave-active
    transition opacity linear .5s

  &-enter-to, &-leave
    opacity 1

  &-enter, &-leave-to
    opacity 0


.types
  display flex
  flex-wrap wrap
  justify-content center
  margin-bottom 60px
  font-weight 600

  &__item
    padding-left 10px
    position relative
    margin 0 30px

    &:last-child
      margin-right 0

    &:first-child
      margin-left 0

    &:before
      content ''
      position absolute
      display inline-block
      left 3px
      top 10px
      width 3px
      height 3px
      border-radius 50%
      background-color black
</style>
