'use client'

import { faImage, faPalette, faSave } from "@fortawesome/free-solid-svg-icons";
import RadioTogglers from "../formItems/RadioTogglers";
import Image from "next/image";
import SubmitButton from "../buttons/SubmitButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { savePageSettings } from "@/actions/pageAction";


export default function PageSettingsForm({page,user}){

    async function saveBaseSettings(formData){
        const result = await savePageSettings(formData);
        console.log(result)
    }

    return (
        <div className="-m-4">

            <form action={saveBaseSettings}>

                <div className="bg-gray-300 py-20 flex justify-center items-center">
                    <RadioTogglers 
                        options={[
                            {value:'color',icon: faPalette,label:"Color"},
                            {value:'image',icon: faImage,label:"Image"},
                        ]} 
                        onChange={()=>{}}
                />
                </div>

                <div className="flex justify-center -mb-12">
                    <Image 
                        className="rounded-full relative -top-8 border-4 border-white shadow shadow-black/50"
                        src={user?.image} 
                        alt="avatar" 
                        width={128} 
                        height={128}
                    />
                </div>

                <div className="p-4">
                    <label className="input-label" htmlFor="nameIn">Display Name</label>
                    <input 
                        type="text" 
                        id="nameIn" 
                        placeholder="Alex Chriss"
                        name="displayName"
                        defaultValue={page.displayName}
                    />
                    <label className="input-label" htmlFor="locationIn">Location</label>
                    <input 
                        type="text"
                        placeholder="New York"
                        id="locationIn"
                        name="location"
                        defaultValue={page.location}
                    />
                    <label className="input-label" htmlFor="bioIn">Bio</label>
                    <textarea 
                        placeholder="Your bio goes here... " 
                        id="bioIn"
                        name="bio"
                        defaultValue={page.bio}
                    />
                    <div className="max-w-[200px] mx-auto">
                        <SubmitButton className="rounded">
                            <FontAwesomeIcon icon={faSave}/>
                            <span>Save</span>
                        </SubmitButton>
                    </div>
                </div>


            </form>
        </div>
    )
}