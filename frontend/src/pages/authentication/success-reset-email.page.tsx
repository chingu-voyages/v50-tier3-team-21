import {AuthHeader} from "./signup.page.tsx";
import {useLocation , useNavigate} from "react-router-dom";
import PrimaryButton from "../../components/ui/button.tsx";
export const SuccessResetEmailPage = () => {
    const { state} = useLocation();
    const { email } = state
    const navigate = useNavigate();
    return(
        <div className="w-full md:h-full md:px-6 md:py-24 flex justify-center items-center ">
            <aside className="w-full flex  flex-col gap-10 md:max-w-lg bg-white md:shadow-md px-6 py-12 md:rounded-3xl">
                <AuthHeader
                    title="Email Successfully Sent"
                    description= {`Reset instruction is successfully sent at ${email}`}
                />
                <PrimaryButton  variant={"outline"}  onClick={() => navigate(-1)}>
                    Back
                </PrimaryButton>
            </aside>
        </div>
    )
}
