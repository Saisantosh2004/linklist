import { Inter, Lato } from 'next/font/google'
import '../globals.css'
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { headers } from '../../../next.config';

import AppSideBar from '@/components/Layout/AppSideBar';
// import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })
const lato = Lato({subsets:['latin'],weight:['100','300','400','700','900']})

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function AppLayout({ children }) {

    // const headersList = headers();
    // const url=headersList.get('next-url');
    const session = await getServerSession(authOptions);


    if(!session){
        return redirect("/");
    }

    return (
        <html lang="en">
        <body className={lato.className}>
            <main className='flex min-h-screen'>
            {/* <Header/> */}

            <aside className='bg-white shawdow w-52 p-4'>
                
                <div className='rounded-full overflow-hidden aspect-square w-24 mx-auto'>
                    <Image src={session?.user?.image} alt={'avatar'} width={256} height={256}/>
                </div>

                <div className='text-center'>
                    <AppSideBar/>
                </div>
            
            </aside>

            <div className='grow'>
                <div className='bg-white m-8 p-4 shadow '>
                    {children}
                </div>
            </div>
                
            </main>
        </body>
        </html>
    )
}
