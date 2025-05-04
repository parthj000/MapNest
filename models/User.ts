import { model, Schema, Document,models } from "mongoose";

type provider = "github" | "google";

interface IUser extends Document {
  name: string;
  provider: provider;
  gmail: string;
  profileImage:string;
  credits:number;
}

const user: any = new Schema<IUser>({
  name: String,
  provider: String,
  gmail: {
    type: String,
    unique: true,
    required: true,
  },
  profileImage:String,
  credits:{
    type:Number,
    default:10,
  }
});

const UserModel = models.Users || model<IUser>("Users", user);

export default UserModel;
