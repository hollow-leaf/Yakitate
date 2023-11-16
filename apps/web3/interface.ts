export type asset = {
    amount: number,
    "asset-id": number,
    "is-frozen": boolean
}

export type food = {
    amount: number,
    id: number,
    name: string,
    provider: string,
    total: number,
    url: string
}

export type wallet = {
    address: string,
    login: boolean
}