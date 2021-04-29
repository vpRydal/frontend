<template>
  <div class="section-map" ref="map-container">
    <yandex-map
        v-if="$onlyMap"
        class="catalog__map"
        :coords="center"
        :zoom="zoom"
        style="width: 100%"
        :style="{height: `${mapHeight}px`}"
        :behaviors="['drag', 'scrollZoom', 'multiTouch']"
        :controls="['zoomControl']"
        map-type="map"
        @options-change="onMapClick"
        @map-was-initialized="onMapInit"
        ref="map"
    >
      <ymap-marker
          v-for="(realtyItem, idx) in $realty"
          :key="idx"
          :marker-id="idx"
          :coords="[realtyItem.latitude, realtyItem.longitude]"
          :balloon="{header: 'header', body: 'body', footer: 'footer'}"
          :icon="{layout: 'islands#32a1d0HomeIcon'}"
          cluster-name="1"
          @balloonopen="bus.$emit('yandex-map::open-balloon-' + realtyItem.id)"
          @balloonclose="bus.$emit('yandex-map::close-balloon-' + realtyItem.id)"
      >
        <Balloon slot="balloon"
                 :area="realtyItem.area"
                 :description="realtyItem.description"
                 :img-path="imageBasePath + realtyItem.img_path"
                 :name="realtyItem.name"
                 :price="realtyItem.price"
                 :id="realtyItem.id"
        ></Balloon>

      </ymap-marker>
    </yandex-map>
    <div v-else
         class="map-placeholder"
         @click="onChangeCatalogState"
    >
      <div class="map-placeholder__bg">

      </div>
    </div>
    <button class="btn btn_primary map-placeholder__btn" @click.prevent="onChangeCatalogState">{{
        $onlyMap ? 'Обычный просмотр ' : 'Показать объявления на карте'
      }}
    </button>
  </div>

</template>

<script lang="ts">
// @ts-ignore
import {yandexMap, ymapMarker} from "vue-yandex-maps";
import {Component, Inject, Ref, Vue} from "vue-property-decorator";
import {mapGetters, mapMutations} from "vuex";
import Balloon from "@/js/components/widgets/Balloon.vue";
import RealtyModel from "@/js/models/Realty";
import {getModule} from "vuex-module-decorators";
import CatalogModule from "@/js/store/modules/catalog";
import $ from 'jquery'
import bus from '@/js/common/bus'
import {AxiosResponse} from "axios";
import {minMax, objectWIthAnyProperties} from "@/js/common/types";


@Component({
  components: {Balloon, yandexMap, ymapMarker},
  data: () => ({
    bus
  }),
  computed: {
    ...mapGetters('catalog', {
      $realty: 'realty',
      $onlyMap: 'onlyMap',
    }),
    ...mapGetters('queryParams', {
      $queryParams: 'params',
      $filtersForMap: 'filtersForMap',
      $startedQueryParams: 'startedParams'
    }),
  },
  methods: {
    ...mapMutations('queryParams', {
      $addParam: '_addParam',
      $saveFiltersInUrl: 'saveInUrl',

    })
  }
})
export default class Map extends Vue {
  get mapHeight(): number {
    return window.innerHeight - 165
  }

  $realty!: Array<RealtyModel>
  $onlyMap!: boolean
  $queryParams!: objectWIthAnyProperties
  $filtersForMap!: objectWIthAnyProperties
  $startedQueryParams!: objectWIthAnyProperties
  $addParam!: (payload: { name: string, value: string | Array<number | string> | minMax | number | objectWIthAnyProperties }) => void
  @Inject('imageBasePath') imageBasePath!: string
  @Ref('map-container') refMapContainer!: HTMLElement
  center = [44.583460, 33.482296]
  zoom = 19
  maxBounds = {
    latitudeMax: 0,
    longitudeMax: 10000000,
    latitudeMin: 10000000,
    longitudeMin: 0,
  }

  $saveFiltersInUrl!: () => void

  get exceptedId(): Array<number> {
    return this.$realty.reduce((acc, realty) => {
      acc.push(realty.id as number)

      return acc
    }, [] as Array<number>)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  onMapInit(map: any): void {
    const bounds = map.getBounds()

    this.maxBounds = {
      latitudeMax: bounds[1][0],
      longitudeMax: bounds[0][1],
      latitudeMin: bounds[0][0],
      longitudeMin: bounds[1][1]
    }

    this.$nextTick(() => {
      this.onFilter()
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    map.events.add('actionend', () => {
      const bounds = map.getBounds()
      this.$addParam({name: 'center', value: map.getCenter()})
      this.$addParam({name: 'zoom', value: map.getZoom()})

      if (this.maxBounds.latitudeMax < bounds[1][0] || this.maxBounds.longitudeMax > bounds[1][1] || this.maxBounds.latitudeMin > bounds[0][0] || this.maxBounds.longitudeMin < bounds[0][1]) {
        if (this.maxBounds.latitudeMax < bounds[1][0]) {
          this.maxBounds.latitudeMax = bounds[1][0]
        }
        if (this.maxBounds.longitudeMax > bounds[0][1]) {
          this.maxBounds.longitudeMax = bounds[0][1]
        }

        if (this.maxBounds.latitudeMin > bounds[0][0]) {
          this.maxBounds.latitudeMin = bounds[0][0]
        }
        if (this.maxBounds.longitudeMin < bounds[1][1]) {
          this.maxBounds.longitudeMin = bounds[1][1]
        }
        this.getRealty({exceptedId: this.exceptedId})
      }

      this.$addParam({name: 'bounds', value: {
          latitudeMax: bounds[1][0],
          longitudeMax: bounds[0][1],
          latitudeMin: bounds[0][0],
          longitudeMin: bounds[1][1]
        }})

      this.$saveFiltersInUrl()
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  onMapClick(e: any): void {
    console.log(e)
  }

  onChangeCatalogState(): void {
    getModule(CatalogModule, this.$store)._setOnlyMap(!this.$onlyMap)
    $('body').css('overflow', this.$onlyMap ? 'hidden' : '')

    if (this.$onlyMap) {
      $("html, body").stop().animate({scrollTop: $(this.refMapContainer).offset()?.top as number - 110}, 500, 'swing');
    }
  }

  onFilter(): void {
    if (!this.$onlyMap) return

    getModule(CatalogModule, this.$store)._setRealty([])
    this.$nextTick(() => {
      this.getRealty({ exceptedId: [] })
    })
  }

  getRealty(options: { exceptedId: Array<number> }): Promise<AxiosResponse<Array<RealtyModel>>> {
    return RealtyModel.getListMap({...this.$filtersForMap, ...this.maxBounds, ...options}).then((response) => {
      const realties = response.data

      getModule(CatalogModule, this.$store).setRealty([...realties, ...this.$realty])
      return response
    })
  }


  created(): void {
    bus.$on('filters::filter', this.onFilter)


    if (this.$startedQueryParams) {
      // @ts-ignore

      if (this.$startedQueryParams.bounds && this.$startedQueryParams.bounds.latitudeMin as number && this.$startedQueryParams.bounds.longitudeMax && this.$startedQueryParams.bounds.longitudeMin && this.$startedQueryParams.bounds.latitudeMax) {
        // @ts-ignore
        this.maxBounds = this.$startedQueryParams.bounds as objectWIthAnyProperties
      }
      if (this.$startedQueryParams.center && this.$startedQueryParams.center && (this.$startedQueryParams.center as Array<number>)[0] && (this.$startedQueryParams.center as Array<number>)[1]) {
        this.center = this.$startedQueryParams.center as Array<number>
      }
      if (this.$startedQueryParams.zoom) {
        this.zoom = this.$startedQueryParams.zoom as number
        this.$nextTick(() => {
          this.onChangeCatalogState()
        })
      }
    }
  }

  beforeDestroy(): void {
    bus.$off('filters::filter', this.onFilter)
  }
}
</script>

<style scoped lang="stylus">
.map-placeholder
  cursor pointer
  &__bg
    filter blur(1px)
    background-image url("/frontend/img/map-placeholder.png")
    background-position center
    background-size cover
    height 200px
    width 100%
    box-shadow: 0 0 13px 1px rgba(0, 0, 0, .2) inset;

  &__btn
    width 100%
</style>
