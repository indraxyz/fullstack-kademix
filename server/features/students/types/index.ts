import type { Student } from "@prisma/client";

export type StudentDocument = Student;

export interface StudentParent {
  _id?: string | { toString: () => string };
  id?: string;
  name?: string;
  email?: string;
  age?: number;
  address?: string;
  photo?: string;
  dateOfBirth?: Date | string;
  phoneNumber?: string;
  latestEducation?: string;
  gender?: string;
  notes?: string;
  classMode?: string;
  studyProgram?: string;
  codingTrack?: string;
  studyPrograms?: string[] | unknown;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface NewStudentInput {
  name?: string | null;
  email?: string | null;
  age?: number | null;
  address?: string | null;
  photo?: string | null;
  dateOfBirth?: string | null;
  phoneNumber?: string | null;
  latestEducation?: string | null;
  gender?: string | null;
  notes?: string | null;
  classMode?: string | null;
  studyProgram?: string | null;
  codingTrack?: string | null;
  studyPrograms?: string[] | null;
}

export interface SearchStudentInput {
  searchTerm?: string | null;
  sortBy?: string | null;
  sortOrder?: string | null;
  limit?: number | null;
  offset?: number | null;
  ageMin?: number | null;
  ageMax?: number | null;
}

export interface QueryArgs {
  input?: SearchStudentInput | null;
}

export interface StudentQueryArgs {
  id: string;
}

export interface CreateStudentArgs {
  input: NewStudentInput;
}

export interface UpdateStudentArgs {
  id: string;
  input: NewStudentInput;
}

export interface DeleteStudentArgs {
  id: string;
}

export interface DeleteStudentsArgs {
  ids: string[];
}
