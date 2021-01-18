<template>
    <div class="catalog">
        <transition name="btn">
            <button v-if="!isOpenedFilters" class="catalog__btn-open-filters" @click.stop="onOpenFilters"></button>
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
            <div class="catalog__main-content">
                <Filters class="catalog__filters"
                         :in-request-state="inRequestState"
                         :open="isOpenedFilters"
                         @close="isOpenedFilters = false"
                />
                <div class="catalog__realty-wrapper" ref="realty">
                    <transition-group v-if="!inRequestState" class="catalog__objects" tag="div" name="realty"
                                      :css="false"
                                      @before-enter="beforeEnter" @enter="onEnter" @leave="onLeave">
                        <Realty
                            class="realty"
                            v-if="realty.length"
                            v-for="(object, index) in realty"
                            :key="index + object.id"
                            :area="object.area"
                            :title="object.name"
                            :price="object.price"
                            :img-path="object.img_path"
                            :data-index="index"
                        />
                    </transition-group>
                    <div v-else class="catalog__loader">
                        <Preloader lg/>
                    </div>
                    <Pagination class="catalog__paginate"
                                :current-page="paginatorData.currentPage"
                                :items-on-page="paginatorData.itemsOnPage"
                                :total-items="paginatorData.totalItems"
                                :total-pages="paginatorData.totalPages"
                                @onChangePage="onChangePage"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Ref} from 'vue-property-decorator';
import Realty from "@/js/components/Realty.vue";
import Realty_ from "@/js/api/Realty";
import imgTown from "@/assets/img/town.png";
import Pagination from "@/js/components/widgets/Paginator.vue";
import Select from "@/js/components/ui/Select.vue";
import $ from "jquery";
import Range from "@/js/components/ui/Range.vue";
import Preloader from "@/js/components/widgets/Preloader.vue";
import Filters from "@/js/views/Catalog/Filters.vue";
import {mapGetters} from "vuex";
import {ScrollTo} from "@/js/mixins/common";

@Component({
    components: {Filters, Range, Select, Pagination, Realty, Preloader},
    data: () => ({
        imgTown
    }),
    metaInfo: {
        title: 'Аренда помещений Севастополь',
    },
    computed: {
        ...mapGetters('common', {
            $windowWidth: 'windowWidth'
        })
    }
})
export default class Catalog extends ScrollTo {
    realty: Array<Realty_> = []
    realtyLength = 0
    inRequestState = false
    isOpenedFilters = false
    paginatorData = {
        currentPage: 1,
        itemsOnPage: 10,
        totalItems: 100,
        totalPages: 9
    }

    @Ref('realty')
    refRealty!: HTMLElement

    created(): void {
        this.$store.commit('queryParams/setQueryParams', this.$route.query)

        Realty_.getList().then(({data}) => {
            this.realty = data
            this.realtyLength = this.realty.length
        })
    }

    beforeEnter(el: HTMLElement): void {
        $(el).css('opacity', 0)
    }

    onOpenFilters(): void {
        this.isOpenedFilters = true;
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
            let delay = (this.realtyLength - index) * 150

            setTimeout(() => {
                $(el).animate({
                    opacity: 0
                }, {
                    duration: 'fast',
                    complete: () => {
                        if ((this.realtyLength - 1) === index) {
                            console.log(5431)
                            this.$nextTick(() => {
                                this.inRequestState = true
                            })
                        }
                        done();
                    }
                })
            }, delay)
        }
    }

    onAfterLeave(): void {
        this.$nextTick(() => {
            this.inRequestState = true
        })
    }

    onChangePage(page: number): void {
        let tempRealty = this.realty
        this.realty = []
        this.paginatorData.currentPage = page
        this.scrollTo(this.refRealty, -120)

        setTimeout(() => {
            this.inRequestState = false
            this.$nextTick(() => {
                this.realty = tempRealty

            })
        }, 1000)
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
        margin-left 260px
        width 100%
        transition margin ease-out .5s

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


    &__paginate
        margin-bottom 70px

    &__main-content
        position relative
        display flex

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
