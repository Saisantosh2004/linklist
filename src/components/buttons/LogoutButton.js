'use client';

import { signOut } from "next-auth/react";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LogoutButton({className='flex items-center gap-2 border p-2 px-4 shadow'},iconLeft='false',iconClasses=''){
    return (
        <button onClick={()=>{signOut()}} className={className}>
            {iconLeft && (
                <FontAwesomeIcon icon={faRightFromBracket} className={'w-6 h-6'}/>
            )}
            <span>Logout</span>
            {!iconLeft && (
                <FontAwesomeIcon icon={faRightFromBracket} className={iconClasses} />
            )}
        </button>
    )
}