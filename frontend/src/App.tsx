import {
    BrowserRouter ,
    Navigate ,
    Route ,
    Routes
} from "react-router-dom";

import { AuthLayout } from "./layouts";
import {
    LoginPage ,
    NotFoundPage ,
    SignupPage
} from "./pages";
import {AppProvider} from "./provider/app.provider.tsx";
import {MainLayout} from "./layouts/main.layout.tsx";
import {ResetPasswordEmailPage} from "./pages/reset-password-email.page.tsx";
import {SuccessResetEmailPage} from "./pages/success-reset-email.page.tsx";
import {ChangePasswordPage} from "./pages/change-password.page.tsx";

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
