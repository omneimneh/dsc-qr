'use client'

import {useState} from "react";
import SurveyWidget from "@/app/[survey]/Survey";
import Link from "next/link";
import Image from "next/image";
import DSCLogo from '@/../public/dsc.svg';

export default function Landing({id}: { id: string }) {
    const [locale, setLocale] = useState<'en' | 'ar'>();

    if (!locale)
        return (
            <div className='!bg-cover !bg-center bg-no-repeat'
                 style={{background: "url('/bg.jpg')"}}>
                <div
                    className='backdrop-blur-sm text-white flex justify-center items-center min-h-screen w-full p-2 bg-black bg-opacity-70'>
                    <div className='flex flex-col gap-5 items-center text-center'>
                        <Image src={DSCLogo} width={250} alt='dsc logo'/>
                        <div className='max-w-[600px]'>
                            <h2 className='text-3xl font-bold mb-2'>أهلا بكم في مجلس دبي الرياضي</h2>
                            <h2 className='text-3xl font-bold'>Welcome to Dubai Sports Council</h2>
                            <br/>
                            <p className='text-[#BdAa88]'>ندعوك لمشاركة رأيك من خلال تخصيص بضع دقائق من وقتك
                                لتزويدنا بمعلومات تهمك، والمساهمة في سعينا نحو تحقيق الامتياز في الخدمة.
                            </p>
                            <br/>
                            <p className='text-[#BdAa88]'>
                                We invite you to share your opinion by dedicating a few minutes of your time to provide
                                us with information that matters to you and contribute to our pursuit of excellence in
                                service.
                            </p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <div className='text-white text-opacity-80'>Please choose your language - الرجاء اختيار
                                اللغة
                            </div>
                            <div className='flex flex-row gap-5'>
                                <Link className='flex-1 rounded bg-[#7d6a48] hover:opacity-75 min-w-20 px-5 py-2'
                                      href={`/${id}/en`}>
                                    English
                                </Link>
                                <Link className='flex-1 rounded bg-[#7d6a48] hover:opacity-75 min-w-20 px-5 py-2'
                                      href={`/${id}/ar`}>
                                    العربية
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    return <SurveyWidget id={id} locale={locale}/>
}