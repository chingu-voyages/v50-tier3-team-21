import PrimaryButton from "../ui/button.tsx";
import {useAppMapContext} from "../../provider/map.provider.tsx";



export const FilterSection = () => {
    const { restaurants, handleOnOpenModal } = useAppMapContext();
   return(
       <section className="w-full flex justify-between items-center py-2     md:spacing-x">
           <PrimaryButton variant={'ghost'} onClick={handleOnOpenModal}>
               <div className="flex justify-start items-center gap-2">
                   <span className="text-lg font-bold capitalize ">Filter</span>
                   <span  className="icon-[mage--filter] text-secondary text-xl" />
               </div>
           </PrimaryButton>
           <p>{ restaurants? restaurants.length : 0} restaurants</p>
       </section>
   )
}
