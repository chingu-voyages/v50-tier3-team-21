import {useCallback , useState} from "react";


export const useModal = () => {
    const [modal, setModal] = useState<boolean>(false);
    const handleOnCloseModal = useCallback((() => {
        setModal(false);
    }),[])
    const handleOnOpenModal = useCallback((() => {
        setModal(true)
    }),[])
    const toggleModal = () => {
        setModal(prevState => !prevState)
    }

    return { modal , handleOnCloseModal, handleOnOpenModal , toggleModal}
}
