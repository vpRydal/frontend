import {AxiosResponse} from "axios";
import api from "../common/myApi.json";
import http from "@/js/common/http";
import Paginator from "@/js/common/helpers/Paginator";

class News {
    photo?: string;
    header?: string;
    content?: string;
    id?: number;

    static getList(options: { page: number, count?: number } = { page: 1 }): Promise<AxiosResponse<Paginator<News>>> {
        if (process.env.VUE_APP_USE_LOCAL_API === 'false') {
            return http.get<Paginator<News>>('news', { params: options })
        } else {
            return new Promise<AxiosResponse<Paginator<News>>>((resolve) => {
                resolve({ data: { data: api.news } }as AxiosResponse<Paginator<News>>)
            })
        }

    }

    static get(params: { id: number; [key: string]: string | number }): Promise<AxiosResponse<News>> {
        if (process.env.VUE_APP_USE_LOCAL_API === 'false') {
            return http.get<News>('news/' + params.id, { params: params })
        } else {
            return new Promise<AxiosResponse<News>>((resolve) => {
                resolve({ data: api.news[0] } as AxiosResponse<News>)
            })
        }
    }

}

export default News
