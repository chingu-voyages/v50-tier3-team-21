import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AuthLayout } from "./layouts";
import {
    LoginPage ,
    NotFoundPage ,
    SignupPage
} from "./pages";
import {AppProvider} from "./provider/app.provider.tsx";

//Todo: define routes in separate file
export default function App() {
    return (
        <AppProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<div> Hello world from Hungry hippo </div>}/>
                    <Route  element={<AuthLayout />} >
                        <Route path='/auth/signup' element={<SignupPage />} />
                        <Route path="/auth/signin" element={<LoginPage />} />
                    </Route>
                    <Route path='/404' element={<NotFoundPage />} />
                    <Route path='*' element={<Navigate to="/404" replace />} />
                </Routes>
            </BrowserRouter>
        </AppProvider>
    )
}
