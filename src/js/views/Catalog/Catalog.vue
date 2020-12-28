<template>
    <div class="catalog">
        <div class="container">
            <div class="catalog__titles text-center">
                <h1 class="catalog__title">Аренда офисов в Севастополе от собственника Технопарк "Маяк"</h1>
                <h2 class="catalog__subtitle text-main-color">При условии внесения предоплаты предоставляется
                    дополнительная скидка!</h2>
                <p>Настройте параметры поиска по желаемым результатам и изучайте каталог предложений с фотографиями.
                    Меняйте стоимость, метраж, планировку, назначение и другие параметры – находите самое лучшее
                    помещение!
                    Кроме того, вы можете воспользоваться услугой «онлайн-консультант» или позвонить по телефону:
                    +7(978)734-58-55</p>
            </div>
            <div class="catalog__objects">
                <Object area="32.5" title="Нежилое помещение" price="550" :img-path="imgTown"/>
                <Object area="32.5" title="Нежилое помещение" price="550" :img-path="imgTown"/>
                <Object area="32.5" title="Нежилое помещение" price="550" :img-path="imgTown"/>
                <Object area="32.5" title="Нежилое помещение" price="550" :img-path="imgTown"/>
                <Object area="32.5" title="Нежилое помещение" price="550" :img-path="imgTown"/>
                <Object area="32.5" title="Нежилое помещение" price="550" :img-path="imgTown"/>
                <Object area="32.5" title="Нежилое помещение" price="550" :img-path="imgTown"/>
            </div>
            <Pagination class="catalog__paginate"/>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Object from "@/js/components/Object.vue";
import imgTown from "@/assets/img/town.png";
import Pagination from "@/js/components/widgets/Paginate.vue";

@Component({
    components: {Pagination, Object},
    data: () => ({
        imgTown
    }),
    metaInfo: {
        title: 'Аренда помещений Севастополь',
    }
})
export default class Catalog extends Vue {

}
</script>

<style scoped lang="stylus">
.catalog
    margin-top 40px
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

    &__objects
        display grid
        grid-template-columns 1fr 1fr 1fr
        margin-bottom 60px
        @media (max-width 1320px)
            grid-template-columns 1fr 1fr
        @media (max-width 860px)
            grid-template-columns 1fr

        & .object
            margin 15px auto
            width 350px
            & .object__img
                padding 0 0 54% 0
            @media (max-width 500px)
                width 100%

    &__paginate
        margin-bottom 70px
</style>
