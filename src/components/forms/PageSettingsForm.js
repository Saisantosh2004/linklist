'use client'

import {  faCloudArrowUp, faImage, faPalette } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { savePageSettings } from "@/actions/pageAction";
import RadioTogglers from "../formItems/RadioTogglers";
import SubmitButton from "../buttons/SubmitButton";
import SectionBox from "../Layout/SectionBox";
import { upload } from "@/libs/upload"; 
import toast from "react-hot-toast";
import { useState } from "react";
import Image from "next/image";

export default function PageSettingsForm({page,user}){

    const [bgType,setBgType] = useState(page.bgType);
    const [bgColor,setBgColor] = useState(page.bgColor);
    const [bgImage,setBgImage] = useState(page.bgImage);
    const [avatar,setAvatar] = useState(user?.image);

    async function saveBaseSettings(formData){
        const result = await savePageSettings(formData);

        if(result){
            toast.success('Saved')
        }
    }


    async function handleCoverImageChange(ev){

        await upload(ev, link =>{
            setBgImage(link);
        })
        
    }

    async function handleAvatarImageChange(ev){
        
        await upload(ev,link=>{
            setAvatar(link)
        })
    }

    return (
        <div className="">
            <SectionBox>
                <form action={saveBaseSettings}>

                    <div className=" py-4 -m-4 min-h-[300px] flex justify-center items-center bg-cover bg-center "
                        style={
                            bgType === 'color' ? {backgroundColor:bgColor} : {backgroundImage:`url(${bgImage})`}
                        }
                    >
                        <div className="">
                            <RadioTogglers 
                                defaultValue = {page.bgType}
                                options={[
                                    {value:'color',icon: faPalette,label:"Color"},
                                    {value:'image',icon: faImage,label:"Image"},
                                ]} 
                                onChange={(v)=>{setBgType(v)}}
                            />
                            

                                {
                                    bgType ==='color' && (
                                        <div className="bg-gray-200 shadow mt-2  text-gray-700 p-2 ">
                                            <div className="flex justify-center">
                                                <span>Background color:</span>
                                                <input 
                                                    type="color" 
                                                    name="bgColor" 
                                                    onChange={(ev)=>setBgColor(ev.target.value)}
                                                    defaultValue={page.bgColor}
                                                />
                                            </div>
                                        </div>
                                    )
                                }   


                            {
                                bgType ==='image' && (
                                    <div className="flex justify-center">
                                        <label
                                            className="bg-white shadow px-4 py-2 mt-2"
                                        >
                                            <input type="hidden" value={bgImage} name="bgImage"/>
                                            <input 
                                                type="file" 
                                                onChange={handleCoverImageChange}  //
                                                className="hidden"

                                            />
                                            <div className="flex gap-2 items-center cursor-pointer">
                                                <span> <FontAwesomeIcon icon={faCloudArrowUp} className="text-gray-507 "/> </span>
                                                <span>Change image</span>
                                            </div>
                                        </label>
                                    </div>
                                )
                            }    
                            
                        </div>
                    </div>

                    <div className="flex justify-center -mb-12">
                        <div className="relative -top-8 w-[128px] h-[128px]">
                            <div className="rounded-full border-4 border-white shadow shadow-black/50 overflow-hidden h-full">
                                <Image 
                                    className="w-full h-full object-cover"
                                    src={avatar} 
                                    alt="avatar" 
                                    width={128} 
                                    height={128}

                                />
                            </div>
                            <label htmlFor="avatarIn" className="absolute bottom-0 -right-2 bg-white p-2 rounded-full shadow shadow-black/50 aspect-square flex items-center">
                                <FontAwesomeIcon icon={faCloudArrowUp} size="xl"/>
                            </label>
                            <input type="file" id="avatarIn" className="hidden" onChange={handleAvatarImageChange}/>
                            <input type="hidden" value={avatar} name="avatar"/>
                        </div>
                    </div>


                    <div className="p-0">
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
                                <div>
                                    <FontAwesomeIcon icon={faBookmark}/>
                                </div>
                                <span>Save</span>
                            </SubmitButton>
                        </div>
                    </div>


                </form>
            </SectionBox>
        </div>
    )
}