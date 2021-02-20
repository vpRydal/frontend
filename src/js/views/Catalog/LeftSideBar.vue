<template>
    <transition name="sidebar" >
        <div class="sidebar" v-if="open || $windowWidth >= 800">
            <div class="sidebar__wrapper" :style="{ height: (height === false ? 'auto' : `${height}px`) }" @click.stop>
                <div v-if="$onlyMap" class="sidebar__nav">
                    <button class="btn btn_sm btn_secondary btn_bordered" @click="showRealty = !showRealty">{{ showRealty ? 'Фильтры' : 'Недвижимость' }}</button>
                </div>
                <transition name="type" mode="out-in">
                    <SidebarRealty v-if="showRealty"/>
                    <Filters v-else :open="false" class="filters" />
                </transition>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue, Watch} from "vue-property-decorator";
import Filters from "./Filters.vue";
import SidebarRealty from "@/js/views/Catalog/SidebarRealty.vue";
import {mapGetters} from "vuex";
import $ from "jquery";

@Component({
    components: {SidebarRealty, Filters},
    computed: {
        ...mapGetters('catalog', {
            $onlyMap: 'onlyMap',
        }),
        ...mapGetters('common', {
            $windowWidth: 'windowWidth'
        }),
    }
})
export default class LeftSideBar extends Vue {
    showRealty = false
    @Prop({ default: false }) height!: number | boolean
    @Prop({ required: true }) open!: boolean

    @Emit('close')
    emitClose (): void {
        return
    }

    created (): void {
        addEventListener('click', this.emitClose)
    }

    beforeDestroy (): void {
        removeEventListener('click', this.emitClose)
    }

    @Watch('open')
    watchOpen(val: boolean): void {
        $('body').css('overflow', val ? 'hidden' : '')
    }
}
</script>

<style scoped lang="stylus">
.sidebar
    &__wrapper
        position sticky
        top 110px
        overflow-y scroll
        margin-right 5px
        padding-right 10px
        max-width  300px
        width 100%
        background-color white

    @media (max-width 800px)
        position fixed
        top 0
        left 0
        width 100%
        height 100%
        background-color rgba(0, 0, 0, .5)
        z-index 2
        padding-bottom 15px

        ^[0]__wrapper
            position relative
            padding 0 10px
            padding-bottom 15px

    &__nav
        display flex
        justify-content center
        margin-bottom 25px

.type
    &-leave-active, &-enter-active
        transition transform ease-out .5s, opacity ease-out .5s

    &-enter, &-leave-to
        transform translateX(-100%)
        opacity 0

    &-enter-to, &-leave
        transform unset
        opacity 1

.sidebar
    &-leave-active, &-enter-active
        transition background-color ease-out .5s

        .sidebar__wrapper
            transition transform ease-out .5s

    &-enter, &-leave-to
        background-color rgba(0, 0, 0, 0)

        .sidebar__wrapper
            transform translateX(-100%)

    &-enter-to, &-leave
        background-color rgba(0, 0, 0, .4)

        .sidebar__wrapper
            transform unset

</style>