<template>
    <div class="sidebar-realty">
        <RealtyCard2 v-for="(realty, idx) in $realty"
                :key="idx"
                :id="realty.id"
                :price="realty.price"
                :area="realty.area"
                class="sidebar-realty__realty"
         :description="realty.description" :name="realty.name" :img-path="realty.img_path"/>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {mapGetters} from "vuex";
import RealtyCard2 from "@/js/components/RealtyCard2.vue";

@Component({
    components: {RealtyCard2},
    computed: {
        ...mapGetters('catalog', {
            $realty: 'realty'
        })
    }
})
export default class SidebarRealty extends Vue {

}
</script>

<style scoped lang="stylus">
.sidebar-realty
    display flex
    flex-direction column
    justify-content center

    &__realty
        max-width: 100%;
        min-height: 150px;
        margin-bottom: 15px;
        box-shadow: -7px 6px 9px 1px rgba(0, 0, 0, .2);

        &:last-child
            margin-bottom 0
</style>
