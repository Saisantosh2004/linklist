'use client'


import GrabUserName from "@/actions/GrabUserName";
import UsernameFormResult from "@/components/formResults/UsernameFormResult";
import { useState } from "react";
import { redirect } from "next/navigation";
import SubmitButton from "../buttons/SubmitButton";
import RightIcon from "../icons/RightIcon";

export default function UsernameForm({desiredUsername}) {

    const [taken, setTaken] = useState(false);

    async function handleAction(formData){
        const result = await GrabUserName(formData);
        setTaken(result === false);
        if(result){
            redirect("/account?created="+formData.get('username'));
        }
    }

    return (
            <form action={handleAction}>
                <h1 className="text-center text-4xl font-bold mb-2">Grab Your Username</h1>
                <p className="text-center mb-6 text-gray-500">
                        Choose you username
                </p>

                <div className="max-w-sm mx-auto">
                    <input 
                        name="username"
                        type="text" 
                        placeholder="username"
                        className="block p-2 mx-auto border mb-2 w-full text-center"
                        defaultValue={desiredUsername}
                    /> 
                    {
                        taken && (
                            <div className="bg-red-200 border border-red-500 p-2 mb-2 text-center">
                                Taken Username
                            </div>
                        )   
                    }
                    <SubmitButton>
                        Claim Username
                        <RightIcon/>
                    </SubmitButton>
                    
                </div>
            </form>
    );
}