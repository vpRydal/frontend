export type option = {
    value: string | number;
    label: string
}

export type minMax = {
    min: number
    max: number
}
export type paginatorLinks = {
    first: string | null;
    last: string | null;
    next: string | null;
    prev: string | null;
}

export type paginatorMeta = {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export type paginatorData = {
    currentPage: number;
    itemsOnPage: number;
    totalItems: number;
    totalPages: number;
}

export type realtyMinMaxInfo = {
    pricePerMetrMin: number;
    pricePerMetrMax: number;
    priceMin: number;
    priceMax: number;
    areaMin: number;
    areaMax: number;
}

export type equipment = {
    id: number;
    title: string
}

export type objectWIthAnyProperties = { [key: string]: string | Array<number> | minMax}
