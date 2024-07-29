import PrimaryButton from "../ui/button.tsx";
import {useAppMapContext} from "../../provider/map.provider.tsx";


export const FilterSection = () => {
    const { restaurants } = useAppMapContext();
   return(
       <section className="w-full flex justify-between items-center px-2 py-4 md:px-12 md:py-4">
           <PrimaryButton variant={'ghost'}>
               <div className="flex justify-center items-center gap-2">
                   <span className="text-lg capitalize font-light">Filter</span>
                   <span  className="icon-[mage--filter]"/>
               </div>
           </PrimaryButton>
           <p>{ restaurants ? restaurants.length : 0} restaurants</p>
       </section>

   )
}
