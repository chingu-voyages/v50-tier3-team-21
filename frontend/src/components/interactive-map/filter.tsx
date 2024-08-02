import PrimaryButton from "../ui/button.tsx";
import {useAppMapContext} from "../../provider/map.provider.tsx";



export const FilterSection = () => {
    const { restaurants, handleOnOpenModal } = useAppMapContext();
   return(
       <section className="w-full flex justify-between items-center px-12 py-4">
           <PrimaryButton variant={'ghost'} onClick={handleOnOpenModal}>
               <div className="flex justify-start items-center gap-2">
                   <span className="text-lg capitalize font-light">Filter</span>
                   <span  className="icon-[mage--filter]"/>
               </div>
           </PrimaryButton>
           <p>{ restaurants ? restaurants.length : 0} restaurants</p>
       </section>
   )
}
