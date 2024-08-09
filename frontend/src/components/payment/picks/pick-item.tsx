import {useMemo} from "react";

export const PickItem = ({amount, onClick, currentPick, total}) => {
    const isCurrentPick = useMemo(() => {
        return currentPick === amount
    },[currentPick, amount])
    return(
        <li
            onClick={() => onClick(amount)}
            className={`flex-1 flex flex-col justify-center items-center gap-2 cursor-pointer p-2 md:py-6 md:px-4 bg-gray-100 border-2 ${isCurrentPick ? "border-secondary border-2": ""} rounded-lg hover:border-secondary hover:border-2 duration-75 transition-all ease-in-out`}
        >
            <h3 className="font-medium text-lg ">{ amount }$</h3>
            <p className="text-secondary text-xs md:text-sm text-wrap"> Tot: { total + amount}$</p>
        </li>
    )
}
