<template>
    <div class="section-map" ref="map-container">
        <yandex-map
            v-if="$onlyMap"
            class="catalog__map"
            :coords="[44.616495, 33.525126]"
            zoom="13"
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
                         :img-path="realtyItem.img_path"
                         :name="realtyItem.name"
                         :price="realtyItem.price"
                         :id="realtyItem.id"
                ></Balloon>

            </ymap-marker>
        </yandex-map>
        <div v-else
             class="map-placeholder"
        >
            <div class="map-placeholder__bg">

            </div>
        </div>
        <button class="btn btn_primary map-placeholder__btn" @click="onChangeCatalogState">{{
                $onlyMap ? 'Обычный просмотр ' : 'Показать объявления на карте'
            }}</button>
    </div>

</template>

<script lang="ts">
// @ts-ignore
import {yandexMap, ymapMarker} from "vue-yandex-maps";
import {Component, Ref, Vue} from "vue-property-decorator";
import {mapGetters} from "vuex";
import Balloon from "@/js/components/widgets/Balloon.vue";
import RealtyModel from "@/js/models/Realty";
import {getModule} from "vuex-module-decorators";
import CatalogModule from "@/js/store/modules/catalog";
import $ from 'jquery'
import bus from '@/js/common/bus'


@Component({
    components: {Balloon, yandexMap, ymapMarker},
    data: () => ({
        bus
    }),
    computed: {
        ...mapGetters('catalog', {
            $realty: 'realty',
            $onlyMap: 'onlyMap',
        })
    }
})
export default class Map extends Vue {
    get mapHeight (): number { return window.innerHeight -165 }
    $realty!: Array <RealtyModel>
    $onlyMap!: boolean
    @Ref('map-container') refMapContainer!: HTMLElement

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    onMapInit(map: any): void {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
        map.events.add('boundschange', function (e: any) {
            let newZoom = e.get('newZoom')
            let oldZoom = e.get('oldZoom')

            if (newZoom != oldZoom) {
                console.log(e.get('newBounds'))
            }
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    onMapClick(e: any): void {
        console.log(e)
    }
    onChangeCatalogState (): void {
        getModule(CatalogModule, this.$store)._setOnlyMap(!this.$onlyMap)
        $('body').css('overflow', this.$onlyMap ? 'hidden' : '')

        if (this.$onlyMap) {
            $("html, body").stop().animate({ scrollTop: $(this.refMapContainer).offset()?.top as number - 110 }, 500, 'swing');
        }
    }
}
</script>

<style scoped lang="stylus">
.map-placeholder
    &__bg
        filter blur(1px)
        background-image url("/img/map-placeholder.png")
        background-position center
        background-size cover
        height 200px
        width 100%
        box-shadow: 0 0 13px 1px rgba(0, 0, 0, .2) inset;

    &__btn
        width 100%
</style>
