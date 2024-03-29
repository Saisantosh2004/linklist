import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import Link from 'next/link'
import LogoutButton from './buttons/LogoutButton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { Page } from '@/models/Page';
import mongoose from 'mongoose';
import { redirect } from 'next/navigation';


export default async function Header(){
    const session = await getServerSession(authOptions);
    
    await mongoose.connect(process.env.MONGO_URI);

    // if(!session){
    //     return redirect('/')
    // }

    const page = await Page.findOne({owner:session?.user?.email});

    return (
        <header className='bg-white border-b py-4'>
            <div className='max-w-4xl flex justify-between mx-auto px-6'>
                <div className='flex gap-6 items-center'>
                    <Link href={'/'} className='flex items-center gap-2'>
                        <FontAwesomeIcon icon={faLink} className='text-blue-500'/>
                        <span className='text-blue-600 font-bold'>LinkList </span>
                    </Link>

                    <nav className='flex gap-4 text-gray-500 text-sm items-center'>
                        {/* <Link href={'/about'}>About</Link> */}
                        {/* <Link href={'/pricing'}>Pricing</Link>
                        <Link href={'/contact'}>Contact</Link> */}
                    </nav>
                </div>

                <nav className='flex items-center gap-4 text-sm text-slate-500'>
                    {!!session && (
                        <>
                            <Link href={'/account'}>{session?.user?.name} </Link>
                            <LogoutButton/>
                        </>
                    ) }
                    {!session && (
                        <>
                            <Link href={'/login'}>Sign in</Link>
                            {/* <Link href={'/register'}>Create Account</Link> */}
                        </>
                    )}
                    
                </nav>
            </div>
            

        </header>
    );
}