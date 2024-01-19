'use client'


import { faBookmark, faPlus, faLink,faTrash, faGripLines,faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SubmitButton from "../buttons/SubmitButton";
import { ReactSortable } from "react-sortablejs";
import SectionBox from "../Layout/SectionBox";
import { savePageLinks } from "@/actions/pageAction";
import {upload} from "@/libs/upload";
import toast from "react-hot-toast";
import { useState } from "react";
import Image from "next/image";

export default function PageLinksForm({page,user}){

    const [links , setLinks] = useState(page.links || []);


    async function save() {
        const res = await savePageLinks(links);
        console.log(res);
        toast.success('Links Saved!');
    }


    function addNewLink(){
        setLinks(prev =>{
            return [...prev,{
                key:Date.now().toString(),
                title:'',
                subtitle:'',
                icon:'',
                url:''
            }]
        })
    }

    function handleUpload(ev, linkKeyForUpload) {
        upload(ev, uploadedImageUrl => {
            setLinks(prevLinks => {
            const newLinks = [...prevLinks];
            newLinks.forEach((link,index) => {
                if (link.key === linkKeyForUpload) {
                link.icon = uploadedImageUrl;
                }
            });
            return newLinks;
            });
        });
    }
    
    function handleLinkChange(keyOfLinkToChange, prop, ev) {
        setLinks(prev => {
            const newLinks = [...prev];
            newLinks.forEach((link) => {
            if (link.key === keyOfLinkToChange) {
                link[prop] = ev.target.value;
            }
            });
            return [...prev];
        })
    }

    function removeLink(linkKeyToRemove) {
        setLinks(prevLinks =>
            [...prevLinks].filter(l => l.key !== linkKeyToRemove)
        );
    }

    return (
        <SectionBox>
            <form action={save}>

                <h2 className="text-2xl font-bold mb-4">Links</h2>

                <button type="button" className="text-blue-500 text-lg flex gap-2 items-center cursor-pointer" onClick={addNewLink}>
                    <FontAwesomeIcon icon={faPlus} className="bg-blue-500 text-white p-1 rounded-full aspect-square"/>
                    <span>Add new</span>
                </button>

                <div>
                    <ReactSortable handle={'.handle'} list={links} setList={setLinks}>

                    {links.map(l => (
                        <div key={l.key} className="mt-8 md:flex gap-6 items-center shadow shadow-black/10 rounded">

                            <div className="handle">
                                <div>
                                    <FontAwesomeIcon className="text-gray-500 mr-2 cursor-pointer" icon={faGripLines} />
                                </div>
                            </div>

                            <div className="text-center">
                                <div className="bg-gray-300 relative aspect-square overflow-hidden cursor-pointer w-16 h-16 inline-flex justify-center items-center">
                                    {l.icon && (
                                    <Image
                                        className="w-full h-full object-cover"
                                        src={l.icon}
                                        alt={'icon'}
                                        width={64} height={64} />
                                    )}
                                    {!l.icon && (<div><FontAwesomeIcon size="xl" icon={faLink} /></div>)}
                                </div>
                                <div>
                                    <input onChange={ev => handleUpload(ev,l.key)} id={'icon'+l.key} type="file" className="hidden"/>
                                    <label htmlFor={'icon'+l.key} className="border mt-2 p-2 flex items-center gap-1 text-gray-600 cursor-pointer mb-2 justify-center">
                                        <div>
                                            <FontAwesomeIcon icon={faCloudArrowUp} />
                                        </div>
                                        <span>Change icon</span>
                                    </label>
                                    <button
                                    onClick={() => removeLink(l.key)}
                                    type="button" className="w-full bg-gray-300 py-2 px-3 mb-2 h-full flex gap-2 items-center justify-center">
                                        <div>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </div>
                                        <span>Remove this link</span>
                                    </button>
                                </div>
                            </div>

                            <div className="grow">
                                <label className="input-label">Title:</label>
                                <input
                                    value={l.title}
                                    onChange={ev => handleLinkChange(l.key, 'title', ev)}
                                    type="text" placeholder="title"/>
                                <label className="input-label">Subtitle:</label>
                                <input
                                    value={l.subtitle}
                                    onChange={ev => handleLinkChange(l.key, 'subtitle', ev)}
                                    type="text" placeholder="subtitle (optional)"/>
                                <label className="input-label">URL:</label>
                                <input
                                    value={l.url}
                                    onChange={ev => handleLinkChange(l.key, 'url', ev)}
                                    type="text" placeholder="url"/>
                            </div>

                        </div>
                    ))}
                    </ReactSortable>

                </div>

                <div className="border-t pt-4 mt-4">
                    <SubmitButton className="rounded max-w-[200px] mx-auto">
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