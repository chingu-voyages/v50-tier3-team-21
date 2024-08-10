

export interface Account {
    id: number,
    userId: number,
    balance: number,
    createdAt: string,
    updatedAt: string
}
export interface MakePaymentDto {
    amount: number,
    orderId: number
}
