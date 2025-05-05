import { clientPromise } from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";



export const fetchProfile = async()=>{
    const session:any = await getServerSession();
        if(!session){
            redirect("/signup");
            
        }
    try {

        
        await clientPromise();

        const user = await UserModel.findOne({gmail:session.user.email});
        

        
        return {...session,provider:user.provider,credits:user.credits};

        
    } catch (error) {
        console.log(error);
        return [];
        
    }
}