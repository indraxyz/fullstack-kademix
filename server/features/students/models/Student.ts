import mongoose from "mongoose";
import type { Model } from "mongoose";
import {
  prop,
  getModelForClass,
  modelOptions,
  type DocumentType,
} from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    collection: "students",
    timestamps: true,
    versionKey: false,
  },
})
export class Student {
  @prop({
    required: [true, "Name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters"],
    maxlength: [100, "Name must be less than 100 characters"],
  })
  name!: string;

  @prop({
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email"],
  })
  email!: string;

  @prop({
    required: [true, "Age is required"],
    min: [1, "Age must be at least 1"],
    max: [120, "Age must be less than 120"],
  })
  age!: number;

  @prop({
    required: [true, "Address is required"],
    trim: true,
    minlength: [5, "Address must be at least 5 characters"],
    maxlength: [500, "Address must be less than 500 characters"],
  })
  address!: string;

  @prop({
    required: false,
    trim: true,
  })
  photo?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

type StudentModelType = Model<DocumentType<Student>>;
const existingModel = mongoose.models.Student as StudentModelType | undefined;
export const StudentModel = (existingModel ??
  getModelForClass(Student)) as StudentModelType;

export default StudentModel;
