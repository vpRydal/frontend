import {AxiosResponse} from "axios";
import api from "./myApi.json";
import {paginatorFromResponse} from "@/js/common/types";

export default class Realty {
    id?: number
    img_path?: string
    name?: string
    description?: string
    price?: number
    area?: number
    images?: Array<string>

    paginator?: paginatorFromResponse

    /* eslint-disable */
    static getList(options?: any): Promise<AxiosResponse<Realty[]>> {
        return new Promise<AxiosResponse<Realty[]>>((resolve) => {
            resolve({data: api.realty} as AxiosResponse<Realty[]>)
        })
    }

    /* eslint-disable */
    static get(options?: any): Promise<AxiosResponse<Realty>> {
        return new Promise<AxiosResponse<Realty>>((resolve) => {
            resolve({data: api.realty[0]} as AxiosResponse<Realty>)
        })
    }
}
