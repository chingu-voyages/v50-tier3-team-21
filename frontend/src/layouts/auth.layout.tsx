import {Outlet} from "react-router-dom";

export const AuthLayout = () => {
   return(
       <main className='w-full max-h-screen'>
           <div className="w-full h-full flex items-center">
               <div className="h-full flex md:w-1/2 items-center justify-center -z-10  ">
                   <div className="hidden md:block absolute inset-0 bg-hippo bg-cover bg-no-repeat   bg-center "></div>
               </div>
               <div className="w-full h-fit items-center  md:w-1/3 z-50 ">
                   <Outlet />
               </div>
           </div>

       </main>
   )
}
