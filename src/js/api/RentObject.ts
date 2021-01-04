import {AxiosResponse} from "axios";
import api from "./myApi.json";

export default class RentObject {
    id?: number
    img_path?: string
    name?: string
    description?: string
    price?: number
    area?: number
    images?: Array<string>

    /* eslint-disable */
    static getList(options?: any): Promise<AxiosResponse<RentObject[]>> {
        return new Promise<AxiosResponse<RentObject[]>>((resolve) => {
            resolve({data: api.objects} as AxiosResponse<RentObject[]>)
        })
    }

    /* eslint-disable */
    static get(options?: any): Promise<AxiosResponse<RentObject>> {
        return new Promise<AxiosResponse<RentObject>>((resolve) => {
            resolve({data: api.objects[0]} as AxiosResponse<RentObject>)
        })
    }
}
