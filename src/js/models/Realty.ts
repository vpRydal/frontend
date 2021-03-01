import {AxiosResponse} from "axios";
import api from "../common/myApi.json";
import http from "@/js/common/http";
import Paginator from "@/js/common/helpers/Paginator";
import BaseModel from "@/js/models/BaseModel";
import {realtyMinMaxInfo} from "@/js/common/types";

export default class Realty extends BaseModel{
    id?: number
    img_path?: string
    name?: string
    description?: string
    price?: number
    area?: number
    latitude?: number
    longitude?: number
    price_per_metr?: number
    images?: Array<string>

    static getMinMax() : Promise<AxiosResponse<realtyMinMaxInfo>> {
        if (process.env.VUE_APP_USE_LOCAL_API === 'false') {
            return http.get<realtyMinMaxInfo>('realties/minmax')
        } else {
            return new Promise<AxiosResponse<realtyMinMaxInfo>>((resolve) => {
                resolve({ data: api.realtyMinMax } as AxiosResponse<realtyMinMaxInfo>)
            })
        }
    }

    static getList(params: { [key: string]: number | string | undefined } = {}): Promise<AxiosResponse<Paginator<Realty>>> {
        if (process.env.VUE_APP_USE_LOCAL_API === 'false') {
            return http.get<Paginator<Realty>>('realties', { params: params })
        } else {
            return new Promise<AxiosResponse<Paginator<Realty>>>((resolve) => {
                resolve({ data: { data: api.realty } } as AxiosResponse<Paginator<Realty>>)
            })
        }
    }
    static getListMap(params: { [key: string]: number | string | undefined | Array<number> } = {}): Promise<AxiosResponse<Array<Realty>>> {
        if (process.env.VUE_APP_USE_LOCAL_API === 'false') {
            return http.get<Array<Realty>>('realties/map', { params: params })
        } else {
            return new Promise<AxiosResponse<Array<Realty>>>((resolve) => {
                resolve({ data: api.realty } as AxiosResponse<Array<Realty>>)
            })
        }
    }

    /* eslint-disable */
    static get(options?: any): Promise<AxiosResponse<Realty>> {
        return new Promise<AxiosResponse<Realty>>((resolve) => {
            resolve({data: api.realty[0]} as AxiosResponse<Realty>)
        })
    }
}
