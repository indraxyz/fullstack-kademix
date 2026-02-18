import useSWRMutation from "swr/mutation";
import type { StudentFormData } from "../types/student";
import type { Student } from "../types/student";
import {
  graphqlFetchOrThrow,
  GraphQLRequestError,
} from "@/app/src/shared/lib/graphqlFetch";

const CREATE_STUDENT_MUTATION = `
  mutation CreateStudent($input: NewStudentInput!) {
    createStudent(input: $input) {
      id
      name
      email
      age
      address
      photo
      dateOfBirth
      phoneNumber
      latestEducation
      gender
      notes
      classMode
      studyProgram
      codingTrack
      createdAt
      updatedAt
    }
  }
`;

interface CreateStudentResponse {
  createStudent: Student;
}

export function useCreateStudentSWR() {
  const { trigger, isMutating, error } = useSWRMutation<
    CreateStudentResponse,
    GraphQLRequestError,
    string,
    StudentFormData
  >(
    "createStudent",
    async (_key, { arg }: { arg: StudentFormData }) => {
      const data = await graphqlFetchOrThrow<CreateStudentResponse>(
        CREATE_STUDENT_MUTATION,
        { input: arg }
      );
      return data;
    }
  );

  const createStudent = async (
    input: StudentFormData
  ): Promise<Student> => {
    const data = await trigger(input);
    if (!data?.createStudent) {
      throw new Error("Failed to create student: No data returned");
    }
    return data.createStudent;
  };

  return {
    createStudent,
    isMutating,
    error,
  };
}
