import {AxiosResponse} from "axios";
import api from './myApi.json'

class SlideOnMainPage {
    image_path?: string
    text?: string
    title?: string

    /* eslint-disable */
    static get(options?:any): Promise<AxiosResponse<SlideOnMainPage[]>> {
        return new Promise<AxiosResponse<SlideOnMainPage[]>>((resolve) => {
            resolve({ data: api.sliderSlides } as AxiosResponse<SlideOnMainPage[]>)
        })
    }
}

export default SlideOnMainPage
