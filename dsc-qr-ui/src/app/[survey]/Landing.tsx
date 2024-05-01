'use client'

import {useState} from "react";
import SurveyWidget from "@/app/[survey]/Survey";

export default function Landing({id}: { id: string }) {
    const [locale, setLocale] = useState<'en' | 'ar'>();

    if (!locale)
        return (
            <div className='flex justify-center items-center min-h-screen'>
                <div className='flex flex-col gap-5 items-center text-center'>
                    <div>
                        <h2 className='text-3xl'>Welcome to Dubai Sports Council</h2>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='text-gray-500'>Please choose your language</p>
                        <div className='flex flex-row gap-5'>
                            <button className='flex-1 rounded bg-green-300 hover:opacity-75 min-w-52 px-5 py-2'
                                    onClick={() => setLocale('en')}>
                                English
                            </button>
                            <button className='flex-1 rounded bg-green-300 hover:opacity-75 min-w-52 px-5 py-2'
                                    onClick={() => setLocale('ar')}>
                                العربية
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )

    return <SurveyWidget id={id} locale={locale}/>
}