import React from "react";
import PrimaryButton from "./button.tsx";
import {useAppMapContext} from "../../provider/map.provider.tsx";

interface ModalProps {
    children: React.ReactNode,
}
export default function Modal(props: ModalProps){
    const {children} = props;
    const {handleOnCloseModal , isFilterModalOpen} = useAppMapContext()
    return(
        <React.Fragment>
            {
                isFilterModalOpen &&
                <div className="md:max-w-md  bg-white  inset-0 absolute transition-all ">
                    <div

                        className="flex justify-center items-center z-50 absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 p-6  min-h-40 rounded-lg min-w-40 dark:bg-background"
                    >
                        <PrimaryButton onClick={handleOnCloseModal}  variant={"ghost"} className="absolute top-1 left-1 hover:bg-opacity-5 ">
                            close
                        </PrimaryButton>
                        { children }
                    </div>
                </div>
            }
        </React.Fragment>

    )
}
