import {Module, VuexModule, Mutation } from 'vuex-module-decorators'
import {catalogQueryParams} from "@/js/common/types";

@Module({name: 'QueryParams', namespaced: true})
export default class CatalogQueryParams extends VuexModule {
    _queryParams: catalogQueryParams = {}

    get queryParams(): catalogQueryParams {
        return this._queryParams
    }


    @Mutation
    setQueryParams(params: catalogQueryParams): void {
        this._queryParams = params
    }
}
