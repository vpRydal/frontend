import {AxiosResponse} from "axios";
import api from "../common/myApi.json";
import http from "@/js/common/http";

class Equipment {
    id?: number;
    name?: string;
    display_name?: string;

    static getList(params: { [key: string]: number | string | undefined } = {}): Promise<AxiosResponse<Array<Equipment>>> {
        if (process.env.VUE_APP_USE_LOCAL_API === 'false') {
            return http.get<Array<Equipment>>('equipment', { params })
        } else {
            return new Promise<AxiosResponse<Array<Equipment>>>((resolve) => {
                resolve({ data: api.equipments }as AxiosResponse<Array<Equipment>>)
            })
        }

    }
}

export default Equipment
