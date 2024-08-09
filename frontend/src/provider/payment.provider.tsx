import React , {createContext , useEffect , useMemo , useState} from "react";
import {Account} from "../services/api/payment/interface.ts";
import {useGetAccount} from "../services/api/payment/queries.ts";
import {useGetOrder} from "../services/api/orders/queries.ts";
import {calculateTotalPrice} from "../utils";




export interface OrderInfo {
    deliveryAddress?: string;
    deliveryFee: number;
    price?: number;
    tip: number;
    orderId: number
}

export interface PaymentContextType {
    account: Account | undefined;
    orderInfo: OrderInfo;
    isFetchingAccount: boolean;
    isFetchingOrder: boolean;
    total: number
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
        orderId: orderId
    });

    const { data: accountData, isLoading: isFetchingAccount } = useGetAccount();
    const { data: orderData, isLoading: isFetchingOrder } = useGetOrder(orderId);

    useEffect(() => {
        if (accountData) {
            setAccount(accountData.data);
        }
    }, [accountData]);

    useEffect(() => {
        if (orderData && orderData.data && orderData.data.data) {
            setOrderInfo({
                deliveryAddress: orderData.data.data.deliveryAddress,
                deliveryFee: 20,
                price: calculateTotalPrice(orderData.data.data),
                tip: orderData.data.data.tip != null ? orderData.data.data.tip : 0,
                orderId: orderData.data.data.orderId
            });
        }
    }, [orderData]);

    const total = useMemo(() => {
        if(orderInfo?.price && orderInfo.tip){
            return orderInfo.price + orderInfo.deliveryFee + orderInfo.tip
        }
        if(orderInfo.price){
            return orderInfo.price + orderInfo.deliveryFee
        }

    }, [orderInfo.price, orderInfo.deliveryFee, orderInfo.tip])

    const updateOrderInfo = <K extends keyof OrderInfo>(
        key: K,
        value: OrderInfo[K] = 0
    ) => {
        setOrderInfo((prevOrderInfo) => {
            if (!prevOrderInfo) return prevOrderInfo;
            return {
                ...prevOrderInfo,
                [key]: value,
            };
        });
    };

    return (
        <PaymentContext.Provider
            value={{
                account,
                orderInfo,
                isFetchingAccount,
                isFetchingOrder,
                updateOrderInfo,
                total
            }}
        >
            {children}
        </PaymentContext.Provider>
    );
};
