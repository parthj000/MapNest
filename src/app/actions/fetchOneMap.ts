'use server'
import { clientPromise } from "@/lib/dbConnect";
import MapModel from "@/models/Map";





export const fetchOneMap = async(mapid:any)=>{
    
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