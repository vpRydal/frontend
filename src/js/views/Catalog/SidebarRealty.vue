<template>
    <div class="sidebar-realty">
        <RealtyCard2 v-for="(realty, idx) in $realty"
                     :key="idx"
                     :id="realty.id"
                     :price="realty.price"
                     :area="realty.area"
                     :description="realty.description" :name="realty.name" :img-path="imageBasePath + realty.img_path"
                     class="sidebar-realty__realty"
        />
    </div>
</template>

<script lang="ts">
import {Component, Inject, Vue} from "vue-property-decorator";
import {mapGetters} from "vuex";
import RealtyCard2 from "@/js/components/RealtyCard2.vue";

@Component({
    components: {RealtyCard2},
    data: () => ({

    }),
    computed: {
        ...mapGetters('catalog', {
            $realty: 'realty'
        })
    }
})
export default class SidebarRealty extends Vue {
  @Inject('imageBasePath') imageBasePath!: string

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
