import React from "react";
import SurveyWidget from "@/app/[survey]/Survey";

export default function Page({params}: { params: { survey: string, lang: "en" | "ar" } }) {
    return <SurveyWidget id={params.survey} locale={params.lang}/>
}