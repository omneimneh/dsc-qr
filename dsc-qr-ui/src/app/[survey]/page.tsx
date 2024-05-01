import React from "react";
import Survey from "@/app/[survey]/Survey";

export default function Page({params}: { params: { survey: string } }) {
    return <Survey id={params.survey}/>
}