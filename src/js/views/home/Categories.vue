<template>
    <div class="categories">
        <div class="container">
            <Link text="Смотреть все предложения" class="categories__link-wrapper"/>
            <div class="flex-wrapper flex-wrapper_column">
                <div class="categories__row">
                    <div class="categories__col">
                        <div class="category">
                            <div class="category__name-wrapper">
                                <h3 class="category__name">Склады</h3>
                            </div>
                            <ibg class="category__img" :src="townImages[0]" alt="" style="width: 452px; height: 363px"/>
                        </div>
                    </div>
                    <div class="categories__col">
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
                            <ibg class="category__img" :src="townImages[3]" alt="" style="width: 400px; height: 292px"/>
                        </div>
                    </div>
                </div>
                <div class="categories__row categories__row_3">
                    <div class="categories__col">
                        <div class="category">
                            <div class="category__name-wrapper category__name-wrapper_name-right">
                                <h3 class="category__name">Офисы</h3>
                            </div>
                            <ibg class="category__img category__img_align-left" :src="townImages[2]" alt=""
                                 style="width: 517px; height: 382px"/>
                        </div>
                    </div>
                    <div class="categories__col">
                    </div>
                </div>
                <Link text="Узнать больше" class="link-wrapper_right"/>
                <div class="categories__row categories__row_center">
                    <div class="categories__col">
                        <div class="category">
                            <div class="category__name-wrapper category__name-wrapper_name-right category__name-wrapper_default-padding">
                                <h3 class="category__name">Офисные блоки</h3>
                            </div>
                            <ibg class="category__img category__img_align-left" :src="townImages[1]" alt=""
                                 style="width: 531px; height: 300px"/>
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

        scroll() {
            console.log(123)
        }
    }
</script>

<style scoped lang="stylus">
    @import "../../../stylus/colors.styl"
    .categories
        overflow hidden
        margin-bottom 150px

        &__row
            display flex

            &_center
                width 700px
                margin-left 300px

            &_2
                transform translateY(-30px)

            &_3
                transform translateY(-105px)

        &__col
            flex 1 1 50%

        &__link-wrapper
            margin-bottom 120px

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

            &_name-right
                justify-content flex-end
                padding-right 139px
                padding-left 0
                right -150px

            &_default-padding
                width 85%
                padding 30px
                padding-right 70px

            &_name-top
                align-items flex-start

        &__img
            position relative
            display block
            margin-left auto
            z-index 2

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
