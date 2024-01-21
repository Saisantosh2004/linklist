'use client'

import {faDiscord,faFacebook,faGithub, faInstagram, faInstagramSquare, faTelegram,faTiktok,faWhatsapp,faYoutube} from "@fortawesome/free-brands-svg-icons";
import {faBookmark, faEnvelope, faGripLines, faMobile, faPlus, faSave, faTrash} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactSortable } from "react-sortablejs";
import { savePageButtons } from "@/actions/pageAction";
import SubmitButton from "../buttons/SubmitButton";
import SectionBox from "../Layout/SectionBox";
import toast from "react-hot-toast";
import { useState } from "react";

export const allButtons = [
    {key: 'email', 'label': 'e-mail', icon: faEnvelope, placeholder: 'test@example.com'},
    {key: 'mobile', 'label': 'mobile', icon: faMobile, placeholder: '+46 123 123 123'},
    {key: 'instagram', 'label': 'instagram', icon: faInstagram, placeholder: 'https://instagram.com/profile/...'},
    {key: 'facebook', 'label': 'facebook', icon: faFacebook,placeholder: 'https://facebook.com/profile/...'},
    {key: 'discord', 'label': 'discord', icon: faDiscord},
    {key: 'tiktok', 'label': 'tiktok', icon: faTiktok},
    {key: 'youtube', 'label': 'youtube', icon: faYoutube},
    {key: 'whatsapp', 'label': 'whatsapp', icon: faWhatsapp},
    {key: 'github', 'label': 'github', icon: faGithub},
    {key: 'telegram', 'label': 'telegram', icon: faTelegram},
]

function UpperFirst(str){
    return str.slice(0,1).toUpperCase() + str.slice(1)
}

export default function PageButtonsForm({user,page}){
    
    // console.log(page)
    // const b=page.buttons;
    // console.log(b)
    const pageSavedButtonKeys = Object.keys(page.buttons);
    const pageSavedButtonsInfo = pageSavedButtonKeys.map(k => allButtons.find(b => b.key === k));
    const [activeButtons,setActiveButtons] = useState(pageSavedButtonsInfo);

    const availableButtons = allButtons.filter(b1=>!activeButtons.find(b2 => b1.key === b2.key))

    function addButtonToProfile(button) {
        setActiveButtons(prevButtons => {
          return [...prevButtons, button];
        });
    }

    async function saveButtons(formData){
        await savePageButtons(formData);

        toast.success('Settings Saved')
    }

    function removeButton({key:keyToRemove}){
        setActiveButtons(prevButtons => {
            return prevButtons.filter(button => button.key !== keyToRemove)
        })
    }


    return (
        <SectionBox>
            <form action={saveButtons}>

                <h2 className="text-2xl font-bold mb-4">Social Media</h2>

                <ReactSortable list={activeButtons} setList={setActiveButtons}>
                {
                    activeButtons.map(b=>(
                        <div key={b.key}  className="mb-4 md:flex items-center" >
                            <div className="w-48 flex h-full p-2 gap-2 items-center bg-gray-100 text-gray-700">
                                <div>
                                    <FontAwesomeIcon icon={faGripLines} className="cursor-pointer text-gray-400"/>
                                </div>
                                <div>
                                    <FontAwesomeIcon fixedWidth icon={b.icon} />
                                </div>
                                <span>{UpperFirst(b.label)}</span>
                            </div>
                            <div className="flex grow">
                                <input 
                                    type="text" 
                                    name={b.key}
                                    style={{marginBottom:'0'}}
                                    placeholder={b.placeholder}
                                    defaultValue={page.buttons[b.key]}
                                />
                                <button 
                                    type="button" 
                                    className="p-2 text-red-500 bg-gray-300 py-2 px-4 cursor-pointer "
                                    onClick={()=>{removeButton(b)}}
                                >
                                    <FontAwesomeIcon icon={faTrash}/>
                                </button>
                            </div>
                        </div>
                    ))
                }
                </ReactSortable>

                <div className="flex flex-wrap gap-2 mt-4 border-t border-y py-4">

                    {availableButtons.map(b=>(
                        <button 
                            key={b.key}
                            type="button"
                            className="flex gap-2 p-2 bg-gray-200 items-center"
                            onClick={()=>{addButtonToProfile(b)}}
                            
                        >
                            <FontAwesomeIcon icon={b.icon}/>
                            <span className="">
                                {UpperFirst(b.label)}
                            </span>
                            <FontAwesomeIcon icon={faPlus}/>
                        </button>
                    ))}

                </div>
                <div className="max-w-[200px] mx-auto mt-2">
                    <SubmitButton className="rounded">
                        <div>
                            <FontAwesomeIcon icon={faBookmark}/>
                        </div>
                        <span>Save</span>
                    </SubmitButton>
                </div>
            </form>
        </SectionBox>
    )
}