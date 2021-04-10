import {Action, Module, Mutation, VuexModule} from 'vuex-module-decorators'
import {minMax, objectWIthAnyProperties} from "@/js/common/types";
import {Vue} from "vue-property-decorator";
import router from "@/js/router";


@Module({ name: 'queryParams', namespaced: true })
export default class CatalogQueryParams extends VuexModule {
    _params: objectWIthAnyProperties = {}
    _startedParams: objectWIthAnyProperties = {}
    exceptedProperties= ['zoom', 'bounds', 'center']

    get params (): objectWIthAnyProperties {
        return this._params
    }
    get startedParams (): objectWIthAnyProperties {
        return this._startedParams
    }
    get getString (): string {
        return JSON.stringify(this._params)
    }
    get filtersForMap (): objectWIthAnyProperties {
        return Object.keys(this.preparedFilters).reduce( (acc, key) => {
            if (!this.exceptedProperties.includes(key)) {
                acc[key] = this.preparedFilters[key]
            }
            return acc
        }, {} as objectWIthAnyProperties )
    }
    get filtersForDefault (): objectWIthAnyProperties {
        return Object.keys(this.preparedFilters).reduce( (acc, key) => {
            if (!this.exceptedProperties.includes(key)) {
                acc[key] = this.preparedFilters[key]
            }
            return acc
        }, {} as objectWIthAnyProperties )
    }

    get preparedFilters(): objectWIthAnyProperties {
        return this._params as objectWIthAnyProperties
    }

    @Mutation
    setQueryParams(params: objectWIthAnyProperties): void {
        this._params = params
    }
    @Mutation
    init(): void {
        try {
            this._params = JSON.parse(router.currentRoute.query.filters as string)
            this._startedParams = JSON.parse(router.currentRoute.query.filters as string)
        } catch (ex) {
            this._params = {}
            this._startedParams = {}
        }
    }
    @Mutation
    saveInUrl(): void {
        router.push({ name: router.currentRoute.name as string, query: { filters: JSON.stringify(this._params) } }).catch(() => {
            return
        })
    }

    @Mutation
    _addParam({name, value}: { name: string, value: string | objectWIthAnyProperties | number | Array<number | string> | minMax }): void {
        Vue.set(this._params, name, value)
    }

    @Action({ commit: '_addParam' })
    addParam(payload: { name: string, value: string | number | Array<number | string> | minMax | objectWIthAnyProperties }): { name: string, value: objectWIthAnyProperties | string | number | Array<number | string> | minMax } {
        return payload
    }
}
