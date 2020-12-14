<template>
    <div class="footer">
        <div class="footer__container container container_big">
            <div class="footer__flex-wrapper flex-wrapper">
                <div class="footer__col footer__col_first">
                    <p class="footer__address">г. Севастополь, ул. Фиолентовское шоссе, 1/2</p>
                    <ul class="contacts-list">
                        <li class="contacts-list__item" v-for="(contact, index) of contacts" :key="index">
                            <span class="contacts-list__name">{{ contact.name }}</span>: <span class="contacts-list__value">{{ contact.value }}</span>
                        </li>
                    </ul>
                </div>
                <div class="footer__col footer__col_second">
                    <div class="social-link">
                        <ibg class="" :src="fImg"/>
                        <a href="" class="stretched-link"></a>
                    </div>
                    <div class="social-link">
                        <ibg :src="vkImg"/>
                        <a href="" class="stretched-link"></a>
                    </div>
                </div>
                <div class="footer__col footer__col_third">
                    <div class="departments">
                        <p class="footer__departments">Отдел аренды:</p>
                        <ul class="departments__list">
                            <li class="departments__item">
                                <span>+7 (978) 734-58-99</span><span>+7 (918) 473-08-39</span>
                            </li>
                            <li class="departments__item">
                                <span>+7 (978) 734-58-55</span><span>+7 (978) 268-72-55</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import vkImg from '@/assets/img/vk.png'
    import fImg from '@/assets/img/f.png'

    type Contact = {
        name: string;
        value: string;
    }

    @Component({
        data: () => ({
            vkImg,
            fImg
        })
    })
    export default class Footer extends Vue {
        contacts: Array<Contact> = [
            {name: 'Менеджер проекта', value: '+7(978) 801-43-83 '},
            {name: 'e-mail', value: 'elena@sferos.com, irina@sferos.com'},
        ]
    }
</script>

<style scoped lang="stylus">
    @import "../../../stylus/colors.styl"
    .footer
        &__container
            background-color: mainColor
            max-width 1520px
            padding 45px 200px
            @media (max-width: 1600px)
                max-width 1920px
                padding 45px 15px
        &__flex-wrapper
            @media (max-width: 1200px)
                flex-direction column
        &__col
            flex 1 1 40%
            &_first
                @media (max-width: 1200px)
                    margin-bottom: 25px
            &_second
                flex 1 1 10%
                display flex
                align-items center
                @media (max-width: 1200px)
                    margin-bottom: 25px
            &_third
                flex 1 1 30%
        &__address, &__departments
            font-size 30px
            color white
            font-family Raleway-Regular
            margin-bottom 40px
    .contacts-list, .departments
        color white
        font-size 24px
        &__item
            margin-bottom 15px

            &:last-child
                margin-bottom 0
    .social-link
        position relative
        width 80px
        height 80px
        margin 0 auto
        &:first-child
            margin-left: 0
        @media (max-width: 1200px)
            margin 0 10px
        & .ibg
            padding 0 0 100% 0

    .departments
        max-width 450px
        margin-left auto
        @media (max-width: 1200px)
            margin 0
        &__item
            display flex
            justify-content space-between
            @media (max-width: 430px)
                flex-direction column
                margin-bottom 0
                span
                    margin-bottom 15px

</style>