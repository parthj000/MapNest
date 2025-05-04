'use server'

import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";
import { MapModel } from "../../../models/Map";
import { clientPromise } from "@/lib/dbConnect";
import toast from "react-hot-toast";




export const fetchOneMap = async(mapid:string)=>{
    
    try {
       
        
        await clientPromise();

        const allMaps = await MapModel.findOne({_id:mapid});

        if(!allMaps){
            throw new Error("404");
        }
        
        const {_id,prompt,mapJson} = allMaps;
        
        return {_id,prompt,mapJson};

        
    } catch (error:any) {
        console.log(error);
        return {error:"Map not found!"};
        
    }
}