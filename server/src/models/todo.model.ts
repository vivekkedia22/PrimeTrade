import mongoose, { Model, Schema, Document } from "mongoose";
import { TODO_STATUS } from "../constants/todoStatus.js";

interface Todo {
  title: string;
  description: string;
  ownerId: string;
  status: TODO_STATUS;
}

export interface TodoDocument extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  ownerId: mongoose.Types.ObjectId;
  status: TODO_STATUS;
  createdAt: Date;
  updatedAt: Date;
}

interface TodoModel extends Model<TodoDocument> {}

const todoSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: TODO_STATUS, default: TODO_STATUS.open },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret: any) {
        delete ret.__v;
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    },
  }
);

const Todo = mongoose.model<TodoDocument, TodoModel>("Todo", todoSchema);
export { Todo };
