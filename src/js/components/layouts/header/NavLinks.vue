<template>
    <ul >
        <li
            v-for="(link, index) in links"
            :key="index"
            @click="onClickNavLink(link.id)"
        >
            <slot name="link" :link="link">
                <router-link v-if="link.isLink" :to="{name: link.routeName}">
                    {{ link.displayName }}
                </router-link>
                <span v-else class="cursor-pointer">{{ link.displayName }}</span>
            </slot>
        </li>
    </ul>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {mixinNavLinks} from "@/js/mixins/navLinks";
import bus from "@/js/common/bus";
import {Route} from "vue-router";

@Component({
    mixins: [mixinNavLinks],
})
export default class NavLinks extends Vue {
    onClickNavLink(linkId: number):void {
        const routeIsHome = this.$route.name === 'home'

        if (linkId === 3) {
            if (!routeIsHome) {
                this.goToHome().then(() => {
                    this.$nextTick(() => {
                        bus.$emit('scroll-to-news')
                    })
                })
            } else {
                bus.$emit('scroll-to-news')
            }
        } else if (linkId === 1) {
            if (!routeIsHome) {
                this.goToHome()
            } else {
                bus.$emit('scroll-to-info')
            }
        } else if (linkId === 4) {
            if (!routeIsHome) {
                this.goToHome().then(() => {
                    this.$nextTick(() => {
                        bus.$emit('scroll-to-contacts')
                    })
                })
            } else {
                bus.$emit('scroll-to-contacts')
            }
        }
    }

    goToHome(): Promise <Route> {
        return this.$router.push({name: 'home'})
    }
}
</script>

<style scoped>

</style>
