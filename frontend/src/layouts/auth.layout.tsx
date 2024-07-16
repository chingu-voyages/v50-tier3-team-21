import {Outlet} from "react-router-dom";

export const AuthLayout = () => {
   return(
       <main className='w-full h-screen'>
           <div className="w-full h-screen flex items-center">
               <div className="hidden md:flex w-1/2 items-center justify-center -z-10 ">
                   <div className="absolute inset-0 bg-hippo bg-cover bg-no-repeat   bg-center "></div>
               </div>
               <div className="w-full h-full  md:w-1/3 z-50 ">
                   <Outlet />
               </div>
           </div>

       </main>
   )
}
