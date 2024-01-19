'use client'

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faChartLine, faFileLines } from '@fortawesome/free-solid-svg-icons';
import LogoutButton from '@/components/buttons/LogoutButton';
import { usePathname } from 'next/navigation';



export default function AppSideBar(){
    const path = usePathname();
    console.log(path)
    return (
        <nav className='inline-flex mx-auto flex-col text-center mt-8 gap-6  text-gray-500 '>
            <Link 
                href={'/account'} 
                className={'flex gap-4 ' + (path === '/account' ? 'text-blue-500 font-bold':'')} 
            >
                <FontAwesomeIcon 
                    icon={faFileLines}
                    fixedWidth={true}
                    className={'w-6 h-6'}
                />
                <span>My Page</span>
            </Link>
            <Link href={'/analytics'} 
                className={'flex gap-3 '  + (path === '/analytics' ? 'text-blue-500 font-bold':'')}
            >
                <FontAwesomeIcon 
                    icon={faChartLine}
                    fixedWidth={true}
                    className={'w-6 h-6'}
                />
                <span>Analytics</span>
            </Link>
            <LogoutButton 
                className='flex gap-4 items-center text-gray-500' 
                iconLeft={true}
                iconClasses={'w-6 h-6'}
            />

            <Link href={'/'} className='flex items-center gap-2 text-xs text-gray-500 border-t pt-4 '>
                <FontAwesomeIcon icon={faArrowLeft}
                    fixedWidth={true}
                    className={'w-4 h-4'}
                />
                <span>Back to Website</span>
            </Link>
        </nav>
)
}