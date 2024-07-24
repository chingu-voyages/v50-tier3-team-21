import {
    BrowserRouter ,
    Navigate ,
    Route ,
    Routes
} from "react-router-dom";

import { AuthLayout } from "./layouts";
import {
    ChangePasswordPage ,
    LoginPage ,
    NotFoundPage , ResetPasswordEmailPage ,
    SignupPage , SuccessResetEmailPage
} from "./pages";
import {AppProvider} from "./provider/app.provider.tsx";
import {MainLayout} from "./layouts/main.layout.tsx";

//Todo: define routes in separate file
export default function App() {
    return (
        <AppProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<div> Hello world from Hungry hippo </div>}/>
                    </Route>
                    <Route  element={<AuthLayout />} >
                        <Route path='/auth/signup' element={<SignupPage />} />
                        <Route path="/auth/signin" element={<LoginPage />} />
                        <Route  path="/auth/change-password" element={<ChangePasswordPage />}/>
                        <Route  path="/auth/reset-password/sent-link" element={<ResetPasswordEmailPage />}/>
                        <Route  path="/auth/reset-password/reset-sent" element={<SuccessResetEmailPage />}/>
                    </Route>
                    <Route path='/404' element={<NotFoundPage />} />
                    <Route path='*' element={<Navigate to="/404" replace />} />
                </Routes>
            </BrowserRouter>
        </AppProvider>
    )
}
