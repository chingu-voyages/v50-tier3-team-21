import React, { createContext, useEffect, useMemo, useState } from "react";
import { Account } from "../services/api/payment/interface.ts";
import { useGetAccount } from "../services/api/payment/queries.ts";
import { useGetOrder } from "../services/api/orders/queries.ts";
import { calculateTotalPrice } from "../utils";
import {OrderData} from "../services/api/orders/interface.ts";

export interface OrderInfo {
    deliveryAddress?: string;
    deliveryFee: number;
    price?: number;
    tip: number;
    orderId: number;
}

export interface PaymentContextType {
    account: Account | undefined;
    orderInfo: OrderInfo;
    isFetchingAccount: boolean;
    isFetchingOrder: boolean;
    total: number | undefined;
    updateOrderInfo: <K extends keyof OrderInfo>(
        key: K,
        value: OrderInfo[K]
    ) => void;
}

export const PaymentContext = createContext<PaymentContextType>({} as PaymentContextType);

interface PaymentProviderProps extends React.PropsWithChildren<{}> {
    orderId: number;
}

export const PaymentProvider = ({ children, orderId }: PaymentProviderProps) => {
    const [account, setAccount] = useState<Account | undefined>(undefined);
    const [orderInfo, setOrderInfo] = useState<PaymentContextType['orderInfo']>({
        deliveryAddress: undefined,
        deliveryFee: 20,
        price: undefined,
        tip: 0,
        orderId: orderId,
    });

    const { data: accountData, isLoading: isFetchingAccount } = useGetAccount();
    const { data: orderData, isLoading: isFetchingOrder } = useGetOrder(orderId);

    useEffect(() => {
        if (accountData?.data) {
            setAccount(accountData.data as Account);
        }
    }, [accountData]);

    useEffect(() => {
        if (orderData?.data) {
            const order = orderData.data.data as OrderData;
            setOrderInfo({
                deliveryAddress: order.deliveryAddress,
                deliveryFee: order.deliveryCost,
                price: calculateTotalPrice(order),
                tip: order.tip ?? 0,
                orderId: order.id,
            });
        }
    }, [orderData]);

    const total = useMemo(() => {
        if (orderInfo?.price && orderInfo.tip) {
            return orderInfo.price + orderInfo.deliveryFee + orderInfo.tip;
        }
        if (orderInfo.price) {
            return orderInfo.price + orderInfo.deliveryFee;
        }
    }, [orderInfo.price, orderInfo.deliveryFee, orderInfo.tip]);

    const updateOrderInfo = <K extends keyof OrderInfo>(
        key: K,
        value: OrderInfo[K]
    ) => {
        setOrderInfo((prevOrderInfo) => ({
            ...prevOrderInfo,
            [key]: value,
        }));
    };

    return (
        <PaymentContext.Provider
            value={{
                account,
                orderInfo,
                isFetchingAccount,
                isFetchingOrder,
                updateOrderInfo,
                total,
            }}
        >
            {children}
        </PaymentContext.Provider>
    );
};
