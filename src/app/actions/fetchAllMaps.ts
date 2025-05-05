'use server'

import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";
import { clientPromise } from "@/lib/dbConnect";
import MapModel from "@/models/Map";




export const fetchAllMaps = async()=>{
    const session:any = await getServerSession();
        if(!session){
            redirect("/signup");
        }
    try {
        
        await clientPromise();

        const allMaps = await MapModel.find({userGmail:session.user.email});
        

        
        return allMaps.map(({mapJson,prompt,userGmail,_id})=>({mapJson,prompt,_id:_id.toString()}))

        
    } catch (error) {
        console.log(error);
        return [];
        
    }
}