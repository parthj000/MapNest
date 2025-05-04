import { Document, models } from "mongoose";
import { model, Schema } from "mongoose";

interface IMap extends Document{
    mapJson:object;
    userGmail:string;
    prompt:string;

}


const MapSchema = new Schema<IMap>({
    mapJson:Object,
    userGmail:String,
    prompt:String,


})


const MapModel = models.Maps || model("Maps",MapSchema);

export {MapModel};