export type option = {
    value: string | number;
    label: string
}

export type catalogQueryParams = {}

export type paginatorFromResponse = {
    meta: {};
    links: {}
}

export type minMax = {
    min: number
    max: number
}

export type paginator = {}

export type equipment = {
    id: number;
    title: string
}

export type objectWIthAnyProperties = { [key: string]: string | Array<number> | minMax}