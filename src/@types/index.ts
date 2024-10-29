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
}