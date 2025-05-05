// models/Map.ts
import { Document, model, models, Schema } from "mongoose";

interface IMap extends Document {
  mapJson: object;
  userGmail: string;
  prompt: string;
}

const MapSchema = new Schema<IMap>({
  mapJson: Object,
  userGmail: String,
  prompt: String,
});

const MapModel = models.Maps || model<any>("Maps", MapSchema);
export default MapModel; 