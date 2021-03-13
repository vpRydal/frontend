<template>
    <div class="footer" ref="footer">
        <div class="footer__container container">
            <div class="footer__flex-wrapper flex-wrapper">
                <div class="footer__col footer__col_first">

                    <p class="footer__address"><a class="link link_white" href="https://yandex.ru/maps/959/sevastopol/?ll=33.482039%2C44.582682&mode=search&oid=243991293869&ol=biz&z=17.92" target="_blank">г. Севастополь, ул. Фиолентовское шоссе, 1/2</a></p>
                    <ul class="contacts-list">
                        <li class="contacts-list__item" v-for="(contact, index) of contacts" :key="index">
                            <span class="contacts-list__name">{{ contact.header }}</span><span class="contacts-list__dote">:</span>
                            <a class="contacts-list__value link link_white"
                               :href="contact.content.includes('@') ? `mail-to:${contact.content}`: `tel:${contact.content}`"
                            >{{ contact.content }}</a>
                        </li>
                        <li
                            v-if="emails.length"
                            class="contacts-list__item"
                        >
                            <span class="contacts-list__name">e-mail</span><span class="contacts-list__dote">:</span>
                            <a
                                v-for="(email, index) in emails"
                                :key="index"
                                class="contacts-list__value link link_white contacts-list__value_email"
                                :href="`mail-to:${email}`"
                                ref="emails"
                            >{{ email }}</a>
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
                            <li
                                v-for="(contacts, index) in rentDepartContacts"
                                :key="index"
                                class="departments__item"
                            >
                                <a
                                    v-for="(contact, index) in contacts"
                                    :key="index"
                                    class="link link_white" :href="`tel:${contact.content}`">{{ contact.content }}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Mixins, Ref, Watch} from 'vue-property-decorator';
import vkImg from '@/assets/img/vk.png'
import fImg from '@/assets/img/f.png'
import {ScrollTo} from "@/js/mixins/common";
import bus from "@/js/common/bus";
import Contact from "@/js/models/Contact";
import $ from "jquery";


@Component({
    data: () => ({
        vkImg,
        fImg
    })
})
export default class Footer extends Mixins(ScrollTo) {
    @Ref('emails')
    refEmails!: Array<HTMLElement>
    responseData: Array<Contact> = []

    created():void {
        bus.$on('scroll-to-contacts', () => {
            this.scrollTo(this.$refs['footer'] as HTMLElement)
        })

        Contact.getList().then((response) => {
            this.responseData = response.data
        })
    }

    @Watch('emails')
    watchEmails(): void {
        this.$nextTick(() => {
            $(this.refEmails.slice(0, this.refEmails.length - 1))
                .after($('<span>', {text: ','}).css('margin-right', 5))
        })
    }

    get emails(): Array<string> {
        return this.responseData
            .filter(contact => contact.type === Contact.EMAIL)
            .map(contact => contact.content as string)
    }

    get contacts(): Array<Contact> {
        return this.responseData
            .filter(contact => contact.type !== Contact.EMAIL && !contact.is_rent_depart)
    }

    get rentDepartContacts(): Array<Array<Contact>> {
        const res: Array<Array<Contact>> = []
        let counter = 0
        let tempList: Array<Contact> = []

        this.responseData.forEach(contact => {
            if (contact.is_rent_depart) {
                tempList.push(contact)

                if (++counter == 2) {
                    counter = 0
                    res.push(tempList)
                    tempList = []
                }
            }
        })

        return res
    }

    beforeDestroy(): void {
        bus.$off('scroll-to-contacts')
    }
}
</script>

<style scoped lang="stylus">
@import "../../../stylus/colors.styl"
.footer
    position relative
    font-size .7rem
    background-color: mainColor
    z-index 1

    &__container
        padding 45px 0
        position: relative
        @media (max-width 1200px)
            padding 45px 20px

    &__flex-wrapper
        @media (max-width: 1200px)
            flex-direction column

    &__col
        flex 1 1 25%

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
        font-size 1em
        color white
        font-family Inter-Regular
        margin-bottom 20px

        @media (max-width: 1200px)
          margin-bottom: 25px

        @media (max-width: 500px)
          margin-bottom: 15px

.contacts-list, .departments
    color white
    font-size 1em

    &__item
        display flex
        margin-bottom 10px
        flex-wrap wrap

        &:last-child
            margin-bottom 0

.contacts-list
    &__dote, &__comma
        margin-right 5px

.social-link
    position relative
    width 60px
    height 60px
    margin 0 auto


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
            a
                margin-bottom 5px

</style>
