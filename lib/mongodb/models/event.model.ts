import mongoose, { Document, model, models, Schema } from "mongoose";


export interface IEvent extends Document {
    _id: string;
    title: string;
    description?: string;
    location?: string;
    createdAt: Date;
    imageUrl: string;
    startDateTime: Date;
    endDateTime: Date;
    price: string;
    url: string;
    isFree: boolean;
    category: { _id: string, name: string }
    organizer: { _id: string, firstName: string, lastName: string }
  }

const eventSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    location: {type: String},
    imageUrl: {type: String},
    createdAt : {type: Date, default: Date.now},
    startDateTime: {type: Date, default: Date.now},
    endDateTime: {type: Date, default: Date.now},
    price: {type: String},
    url: {type: String},
    isFree: {type: Boolean, default: false},
    organizer: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    category: {type: mongoose.Schema.Types.ObjectId, ref: "Category"},
})

const Event = models.Event || model("Event", eventSchema);

export default Event;