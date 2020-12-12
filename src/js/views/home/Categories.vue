<template>
    <div class="categories">
        <div class="container">
            <Link text="Смотреть все предложения" class="categories__link-wrapper"/>
            <div class="flex-wrapper flex-wrapper_column">
                <div class="categories__row categories__row_1">
                    <div class="categories__col ">
                        <div class="category">
                            <div class="category__name-wrapper">
                                <h3 class="category__name">Склады</h3>
                            </div>
                            <ibg class="category__img category__img_1" :src="townImages[0]" alt=""/>
                        </div>
                    </div>
                    <div class="categories__col categories__col_title">
                        <BigHeader class="categories__title" :texts="['Аренда', 'площадей', 'и помещений']" tag="h1"/>
                    </div>
                </div>
                <div class="categories__row categories__row_2">
                    <div class="categories__col">
                    </div>
                    <div class="categories__col categories__row_2">
                        <div class="category">
                            <div class="category__name-wrapper category__name-wrapper_name-top">
                                <h3 class="category__name">Ангары</h3>
                            </div>
                            <ibg class="category__img category__img_2" :src="townImages[3]" alt=""/>
                        </div>
                    </div>
                </div>
                <div class="categories__row categories__row_3">
                    <div class="categories__col">
                        <div class="category">
                            <div class="category__name-wrapper category__name-wrapper_name-right">
                                <h3 class="category__name">Офисы</h3>
                            </div>
                            <ibg class="category__img category__img_align-left category__img_3" :src="townImages[2]" alt=""/>
                        </div>
                    </div>
                    <div class="categories__col">
                    </div>
                </div>
                <Link text="Узнать больше" class="link-wrapper_right categories__link-wrapper_more"/>
                <div class="categories__row categories__row_center">
                    <div class="categories__col">
                        <div class="category">
                            <div
                                class="category__name-wrapper category__name-wrapper_name-right category__name-wrapper_default-padding">
                                <h3 class="category__name">Офисные блоки</h3>
                            </div>
                            <ibg class="category__img category__img_align-left category__img_4" :src="townImages[1]" alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Link from "@/js/views/home/Link.vue";
import BigHeader from "@/js/components/BigHeader.vue";
import town1 from '@/assets/img/town1.png';
import town2 from '@/assets/img/town2.png';
import town3 from '@/assets/img/town3.png';
import town4 from '@/assets/img/town4.png';


@Component({
    components: {BigHeader, Link},
})
export default class Categories extends Vue {
    townImages = [
        town1,
        town2,
        town3,
        town4,
    ];

    mounted(): void {
        console.log(this.townImages)
    }

    scroll(): void {
        console.log(123)
    }
}
</script>

<style scoped lang="stylus">
@import "../../../stylus/colors.styl"
.categories
    overflow hidden
    margin-bottom 150px
    @media (max-width 600px)
        margin-bottom 70px

    &__link-wrapper_more
        @media (max-width 1400px)
            order 3
            margin-left 40%
        @media (max-width 500px)
            margin-left 10%
        @media (max-width 500px)
            font-size 25px

    &__title
        @media (max-width 1400px)
            text-align center !important
            margin-bottom 70px
        @media (max-width 1200px)
            font-size 110px
        @media (max-width 770px)
            font-size 80px
        @media (max-width 500px)
            font-size 60px

    &__row
        display flex
        @media (max-width 1400px)
            flex-direction column

        &_center
            width 700px
            margin-left 300px
            @media (max-width 1400px)
                margin-right auto
                margin-left 0
                margin-bottom 35px
                @media (max-width 860px)
                    width 69%
                @media (max-width 770px)
                    width 85%


        &_1
            @media (max-width 1400px)
                width 100%
                margin-bottom 35px

            & ^[0]__col:first-child
                @media (max-width 1400px)
                    margin-left auto
                    width 60%
                @media (max-width 1000px)
                    width 80%
                    margin-bottom 35px
                @media (max-width 610px)
                    width 95%


        &_2
            transform translateY(-30px)
            @media (max-width 1400px)
                transform none
                order 1
            @media (max-width 735px)
                margin-bottom 40px
            & ^[0]__col:last-child
                @media (max-width 1400px)
                    margin-left auto
                    width 50%
                    margin-bottom 35px
                @media (max-width 860px)
                    width 60%
                @media (max-width 610px)
                    width 95%



        &_3
            transform translateY(-105px)
            @media (max-width 1400px)
                order 2
                transform none

            & ^[0]__col:first-child
                @media (max-width 1400px)
                    margin-right auto
                    width 65%
                    margin-bottom 50px
                @media (max-width 860px)
                    width 60%
                @media (max-width 610px)
                    width 85%


    &__col
        flex 1 1 50%
        order 1
        @media (max-width 735px)
            margin-bottom 35px

        &_title
            @media (max-width 1400px)
                order 0

    &__link-wrapper
        margin-bottom 120px
        @media (max-width 1000px)
            margin-bottom 60px
        @media (max-width 500px)
            font-size 23px


.category
    position relative

    &__name-wrapper
        position absolute
        width 95%
        display flex
        align-items flex-end
        background-color mainColorLight
        height 50px
        padding 30px
        padding-right 0
        bottom 50px
        @media (max-width 860px)
            bottom 10%
        @media (max-width 735px)
            bottom -60px

        &_name-right
            justify-content flex-end
            padding-right 139px
            padding-left 0
            right -150px
            @media (max-width 1400px)
                padding-right 100px
            @media (max-width 1200px)
                padding-right 50px

        &_default-padding
            width 85%
            padding 30px
            padding-right 70px
            @media (max-width 860px)
                bottom 10px
            @media (max-width 735px)
                bottom -60px

        &_name-top
            align-items flex-start
            right 10%
            @media (max-width 1000px)
                width 100%

        @media (max-width 735px)
            padding 15px 25px
            left 18px
            width 100%
            align-items flex-end
            right auto


    &__img
        position relative
        display block
        margin-left auto
        z-index 2

        &_1
            width 452px
            height 363px
            @media (max-width 860px)
                width: 350px;
                height: 282px;

        &_2
            width 400px
            height 292px
            @media (max-width 860px)
                width: 330px;
                height: 240px;

        &_3
            width 517px
            height 382px
            @media (max-width 860px)
                width: 392px;
                height: 283px;
            @media (max-width 450px)
                width: 328px;
                height: 242px;

        &_4
            width 531px
            height 300px
            @media (max-width 860px)
                width: 350px;
                height: 197px;


        &_align-left
            margin-right auto
            margin-left 0

    &__name
        font-size 30px
        color white
        text-transform uppercase

.title
    display flex
    flex-direction column
    text-align right

    &__first-word
        line-height 107px

    &__second-word
        line-height 92px

    &__third-word
        line-height 43px

    &__first-word, &__second-word, &__third-word
        font-weight 800
        font-size 124px

    &__second-word, &__third-word
        font-size 74px
</style>
