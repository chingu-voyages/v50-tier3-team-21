import PrimaryButton from "../ui/button.tsx";


export const Popup = ({imageUrl, name, country, id}) => {
   return(
       <div>
           <div>
               <img  src={imageUrl} alt='restaurant image'/>
           </div>
           <h3>{ name }</h3>
           <div>
               <span className="icon-[solar--map-point-wave-bold-duotone]"/>
               <p>{ country }</p>
           </div>
           <div>
               <span className="icon-[lets-icons:flag-duotone]"/>
               <p>{ country }</p>
           </div>
           <div className="flex justify-start items-center">
               <PrimaryButton variant={"outline"}>
                   CLOSE
               </PrimaryButton>
               <PrimaryButton >
                   VIEW MENU ITEMS
               </PrimaryButton>
           </div>
       </div>
   )
}
