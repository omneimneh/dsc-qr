import React from "react";
import Landing from "@/app/[survey]/Landing";

export default function Page({params}: { params: { survey: string } }) {
    return <Landing id={params.survey}/>
}