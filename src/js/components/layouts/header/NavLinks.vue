<template>
    <ul >
        <li
            v-for="(link, index) in links"
            :key="index"
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
import {Component, Vue, Watch} from "vue-property-decorator";
import {mixinNavLinks} from "@/js/mixins/navLinks";
import bus from "@/js/common/bus";
import {Route} from "vue-router";

@Component({
    mixins: [mixinNavLinks],
})
export default class NavLinks extends Vue {
    goToHome(): Promise <Route> {
        return this.$router.push({name: 'home'})
    }

  @Watch('$route', { immediate: true, deep: true })
  watchRoute (route: Route): void {
    if (route) {
     this.$nextTick(() => {
       const routeIsHome = this.$route.name === 'home'
       if (route.hash === '#news') {
         if (!routeIsHome) {
           this.goToHome().then(() => {
             this.$nextTick(() => {
               bus.$emit('scroll-to-news')
             })
           })
         } else {
           bus.$emit('scroll-to-news')
         }
       } else if (route.hash === '#about') {
         if (!routeIsHome) {
           this.goToHome()
         } else {
           bus.$emit('scroll-to-info')
         }
       } else if (route.hash === '#contacts') {
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
     })
    }
  }
}
</script>

<style scoped>

</style>
