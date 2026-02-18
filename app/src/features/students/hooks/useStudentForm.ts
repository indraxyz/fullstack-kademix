import { useEffect, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { StudentFormData, StudentFormErrors } from "../types/student";
import type { UseStudentFormProps } from "../types/student";
import { studentFormSchema } from "@/app/src/shared/validation/studentSchema";
import type { z } from "zod";

type StudentFormValues = z.infer<typeof studentFormSchema>;

const defaultValues: StudentFormValues = {
  name: "",
  email: "",
  age: 0,
  address: "",
  photo: undefined,
  dateOfBirth: "",
  phoneNumber: "",
  latestEducation: undefined,
  gender: undefined,
  notes: "",
  classMode: undefined,
  studyProgram: undefined,
  codingTrack: undefined,
};

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

export function useStudentForm({
  editingStudent,
  onSubmit,
  onReset,
}: UseStudentFormProps) {
  const form = useForm<StudentFormValues>({
    defaultValues,
    resolver: zodResolver(studentFormSchema),
    mode: "onTouched",
  });

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  useEffect(() => {
    if (editingStudent) {
      form.reset({
        name: editingStudent.name ?? "",
        email: editingStudent.email ?? "",
        age: editingStudent.age ?? 0,
        address: editingStudent.address ?? "",
        photo: editingStudent.photo ?? undefined,
        dateOfBirth: editingStudent.dateOfBirth ?? "",
        phoneNumber: editingStudent.phoneNumber ?? "",
        latestEducation: (editingStudent.latestEducation ?? undefined) as StudentFormValues["latestEducation"],
        gender: (editingStudent.gender ?? undefined) as StudentFormValues["gender"],
        notes: editingStudent.notes ?? "",
        classMode: (editingStudent.classMode ?? undefined) as StudentFormValues["classMode"],
        studyProgram: (editingStudent.studyProgram ?? undefined) as StudentFormValues["studyProgram"],
        codingTrack: (editingStudent.codingTrack ?? undefined) as StudentFormValues["codingTrack"],
      });
      setPhotoPreview(editingStudent.photo ?? null);
      setPhotoFile(null);
    } else {
      form.reset(defaultValues);
      setPhotoFile(null);
      setPhotoPreview(null);
    }
  }, [editingStudent, form.reset]);

  const handlePhotoChange = useCallback(
    (file: File | null) => {
      if (!file) {
        setPhotoFile(null);
        setPhotoPreview(null);
        return;
      }
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        form.setError("photo", {
          message: "Only JPG, JPEG, and PNG files are allowed",
        });
        return;
      }
      if (file.size > 1024 * 1024) {
        form.setError("photo", { message: "File size must be less than 1MB" });
        return;
      }
      form.clearErrors("photo");
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    },
    [form],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      form.handleSubmit(async (values) => {
        let photoBase64: string | undefined;
        if (photoFile) {
          try {
            photoBase64 = await fileToBase64(photoFile);
          } catch {
            form.setError("photo", {
              message: "Failed to process photo. Please try again.",
            });
            return;
          }
        }
        const input: StudentFormData = {
          name: values.name.trim(),
          email: values.email.trim(),
          age: values.age,
          address: values.address.trim(),
          ...(photoBase64
            ? { photo: photoBase64 }
            : values.photo
              ? { photo: values.photo }
              : {}),
          ...(values.dateOfBirth?.trim()
            ? { dateOfBirth: values.dateOfBirth.trim() }
            : {}),
          ...(values.phoneNumber?.trim()
            ? { phoneNumber: values.phoneNumber.trim() }
            : {}),
          ...(values.latestEducation
            ? { latestEducation: values.latestEducation }
            : {}),
          ...(values.gender ? { gender: values.gender } : {}),
          ...(values.notes?.trim() ? { notes: values.notes.trim() } : {}),
          ...(values.classMode ? { classMode: values.classMode } : {}),
          ...(values.studyProgram ? { studyProgram: values.studyProgram } : {}),
          ...(values.codingTrack ? { codingTrack: values.codingTrack } : {}),
        };
        if (!input.photo) delete input.photo;
        await onSubmit(input);
        form.reset(defaultValues);
        setPhotoFile(null);
        setPhotoPreview(null);
        onReset();
      })(e);
    },
    [form, photoFile, onSubmit, onReset],
  );

  const setFieldErrors = useCallback(
    (fieldErrors: StudentFormErrors) => {
      (
        Object.entries(fieldErrors) as [keyof StudentFormErrors, string][]
      ).forEach(([field, message]) => {
        if (message) form.setError(field, { message });
      });
    },
    [form],
  );

  const formData: StudentFormData = {
    name: form.watch("name"),
    email: form.watch("email"),
    age: form.watch("age"),
    address: form.watch("address"),
    photo: form.watch("photo") ?? (undefined as string | undefined),
    dateOfBirth: form.watch("dateOfBirth") ?? "",
    phoneNumber: form.watch("phoneNumber") ?? "",
    latestEducation: form.watch("latestEducation") ?? undefined,
    gender: form.watch("gender") ?? undefined,
    notes: form.watch("notes") ?? "",
    classMode: form.watch("classMode") ?? undefined,
    studyProgram: form.watch("studyProgram") ?? undefined,
    codingTrack: form.watch("codingTrack") ?? undefined,
  };

  const errors: StudentFormErrors = {
    name: form.formState.errors.name?.message,
    email: form.formState.errors.email?.message,
    age: form.formState.errors.age?.message,
    address: form.formState.errors.address?.message,
    photo: form.formState.errors.photo?.message,
    dateOfBirth: form.formState.errors.dateOfBirth?.message,
    phoneNumber: form.formState.errors.phoneNumber?.message,
    latestEducation: form.formState.errors.latestEducation?.message,
    gender: form.formState.errors.gender?.message,
    notes: form.formState.errors.notes?.message,
    classMode: form.formState.errors.classMode?.message,
    studyProgram: form.formState.errors.studyProgram?.message,
    codingTrack: form.formState.errors.codingTrack?.message,
  };

  const handleInputChange = useCallback(
    (field: keyof StudentFormData, value: string | number | undefined) => {
      if (field === "age") {
        form.setValue(
          "age",
          value === undefined ? 0 : (typeof value === "string" ? parseInt(value, 10) : value) || 0
        );
        return;
      }
      form.setValue(field, value as never);
    },
    [form],
  );

  return {
    form,
    formData,
    errors,
    isSubmitting: form.formState.isSubmitting,
    handleInputChange,
    handlePhotoChange,
    handleSubmit,
    setFieldErrors,
    photoPreview,
    photoFile,
  };
}
