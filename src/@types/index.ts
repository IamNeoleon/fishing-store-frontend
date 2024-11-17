export type TLoginResponse = {
    access: string,
    refresh: string,
    username: string,
    email: string,
    is_staff: boolean
}

export type TProduct = {
    id: number,
    name: string,
    description: string,
    price: number,
    stock: number,
    available: boolean,
    created_at: string,
    updated_at: string,
    image: string,
    category: number,
    brand: number,
    brand_name: string
}

export type TCategory = {
    id: number,
    name: string,
    description: string,
    parent: null | number,
    subcategories: number[]
}

export type TBrand = {
    id: number,
    name: string
}

export type TCartItemReq = {
    product_id: number,
    quantity: number
}

export interface ICartItem {
    id: number,
    product: {
        id: number,
        name: string,
        price: number,
        image: string
    }
    quantity: number
}