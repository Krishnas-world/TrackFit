"use client";
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { LoginLink, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from './ui/button';

const logout = () => {
    sessionStorage.clear();
};

function Header({ user }) {
    console.log(user);
    const Menu = [
        { id: 1, name: "Home", path: '/' },
        { id: 2, name: "Workouts", path: '/explore' },
        { id: 3, name: "Contact Us", path: '/contact' },
    ];

    return (
        <div className='flex items-center justify-between p-4 shadow-sm bg-transparent'>
            <div className='flex items-center gap-10'>
                <Link href={'/'}>
                    <Image className='pl-4' src='/logo.svg' alt='Logo' width={60} height={60} />
                </Link>
                <div className='flex-grow flex justify-center'>
                    <ul className='md:flex gap-8 hidden'>
                        {Menu.map((item) => (
                            <Link key={item.id} href={item.path}>
                                <li className='hover:text-blue-600 font-semibold cursor-pointer transition-all ease-in-out'>{item.name}</li>
                            </Link>
                        ))}
                    </ul>
                </div>
            </div>
            {
                user ?
                    <Popover>
                        <PopoverTrigger><Image src={user.picture} alt='User' width={40} height={40} className='rounded-full' /></PopoverTrigger>
                        <PopoverContent className='w-44'>
                            <ul className='flex flex-col gap-2 items-center'>
                                <Link href={'/dashboard'}><li className='cursor-pointer hover:bg-slate-200 p-2 rounded-md'>Profile</li></Link>
                                <Link href={'/my-bookings'}><li className='cursor-pointer hover:bg-slate-200 p-2 rounded-md'>My Workouts</li></Link>
                                <LogoutLink><li className='cursor-pointer hover:bg-slate-200 p-2 rounded-md' onClick={logout}>Logout</li></LogoutLink>
                            </ul>
                        </PopoverContent>
                    </Popover>
                    :
                    <LoginLink><Button>Get Started</Button></LoginLink>
            }
        </div>
    );
}

export default Header;
