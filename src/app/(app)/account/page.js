import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import UsernameForm from "@/components/forms/UsernameForm";
import { Page } from "@/models/Page";
import mongoose from "mongoose";
import PageSettingsForm from "@/components/forms/PageSettingsForm";

export default async function AccountPage({searchParams}){
    const session = await getServerSession(authOptions);
    const desiredUsername = searchParams?.desiredUsername;

    mongoose.connect(process.env.MONGO_URI);
    if(!session){
        return redirect("/")
    }

    const page = await Page.findOne({owner: session?.user?.email});


    if(page){
        return (
            <PageSettingsForm page={page} user={session?.user} />
        )
    }

    return (
        <div>
            <UsernameForm desiredUsername={desiredUsername}/>
        </div>
    )
}