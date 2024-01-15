
import LoginWithGoogle from "@/components/buttons/LoginWithGoogle";

export default function LoginPage(){
    return (
        <div>
            <div className="p-4 max-w-xs mx-auto">
                <h1 className="text-center text-4xl font-bold mb-6">Sign In</h1>
                <p className="text-center mb-6 text-gray-500">
                    Sign into your Account using one of the method below
                </p>
                <LoginWithGoogle/>
            </div>
            
        </div>
    )
}