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
            <div class="catalog__types types">
                <span class="types__item">Офисы от собственника</span>
                <span class="types__item">От 10 до 500 кв. м.</span>
                <span class="types__item">От 650 руб. за кв. м.</span>
                <span class="types__item">Свежий ремонт</span>
                <span class="types__item">Кондиционер</span>
                <span class="types__item">Круглосуточный доступ</span>
                <span class="types__item">Развитая инфраструктура</span>
                <span class="types__item">Охраняемая территория, видеонаблюдение</span>
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
            <div class="catalog__bottom-text">
                <h2 class="text-center text-main-color">Аренда помещения под офис</h2>
                <p class="text-center">Выбор помещения под офис достаточно трудоемкий и сложный процесс, который может занять долгое время.
                    Чтобы сократить процедуру поиска, пользователь должен четко сформулировать перед собой основные цели
                    и задачи. Для этого необходимо обозначить сумму, которую необходимо будет ежемесячно выделять на
                    аренду помещений. Скрупулезно подсчитав предстоящие расходы, можно будет сделать вывод о
                    целесообразности заключения договора аренды тех или иных нежилых помещений. После того, как
                    предстоящие расходы будут подсчитаны и одобрены, необходимо перейти к выбору офиса или иного
                    помещения для бизнеса.</p>
                <p class="text-center">При выборе объекта необходимо понять критерии, которые будут основополагающими. Как правило,
                    пользователи обращают внимание на инфраструктуру, транспортную и иную доступность объекта. Имеет
                    большое значение безопасность территории и возможность бесплатной парковки. Ассоциация «Технопарк
                    «Маяк» обладает обширной базой офисов и административных зданий. Пользователь может самостоятельно
                    выбрать подходящее помещение.</p>
            </div>
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

    &__types
        margin-bottom 76px

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

    &__bottom-text
        & h2
            margin-bottom 25px
        & p
            margin-bottom 20px
            &:last-child
                margin-bottom 0
.types
    display flex
    flex-wrap wrap
    justify-content center


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
