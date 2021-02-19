import {AxiosResponse} from "axios";
import api from "../common/myApi.json";

export default class RealtyType {
    id?: number
    name?: string

    /* eslint-disable */
    static getList(options?: any): Promise<AxiosResponse<RealtyType[]>> {
        return new Promise<AxiosResponse<RealtyType[]>>((resolve) => {
            resolve({data: api.realtyType} as AxiosResponse<RealtyType[]>)
        })
    }
}
