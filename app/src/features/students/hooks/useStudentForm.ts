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
  studyPrograms: undefined,
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
  initialOverrides,
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
      const studyPrograms = (editingStudent.studyPrograms?.length
        ? editingStudent.studyPrograms
        : editingStudent.studyProgram
          ? editingStudent.studyProgram === "Coding" && editingStudent.codingTrack
            ? [`Coding – ${editingStudent.codingTrack.charAt(0).toUpperCase()}${editingStudent.codingTrack.slice(1)}`]
            : [editingStudent.studyProgram]
          : undefined) as StudentFormValues["studyPrograms"];
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
        studyPrograms,
      });
      setPhotoPreview(editingStudent.photo ?? null);
      setPhotoFile(null);
    } else {
      const base = { ...defaultValues };
      if (initialOverrides?.studyPrograms != null) base.studyPrograms = initialOverrides.studyPrograms as StudentFormValues["studyPrograms"];
      form.reset(base);
      setPhotoFile(null);
      setPhotoPreview(null);
    }
  }, [editingStudent, initialOverrides, form.reset]);

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
          ...(values.studyPrograms?.length ? { studyPrograms: values.studyPrograms } : {}),
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

  const formFieldNames: (keyof StudentFormValues)[] = [
    "name",
    "email",
    "age",
    "address",
    "photo",
    "dateOfBirth",
    "phoneNumber",
    "latestEducation",
    "gender",
    "notes",
    "classMode",
    "studyPrograms",
  ];

  const setFieldErrors = useCallback(
    (fieldErrors: StudentFormErrors) => {
      (
        Object.entries(fieldErrors) as [keyof StudentFormErrors, string][]
      ).forEach(([field, message]) => {
        if (message && formFieldNames.includes(field as keyof StudentFormValues)) {
          form.setError(field as keyof StudentFormValues, { message });
        }
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
    studyPrograms: form.watch("studyPrograms") ?? undefined,
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
    studyPrograms: form.formState.errors.studyPrograms?.message,
  };

  const handleInputChange = useCallback(
    (field: keyof StudentFormData, value: string | number | undefined | string[]) => {
      if (field === "age") {
        const num = value === undefined ? 0 : typeof value === "number" ? value : typeof value === "string" ? parseInt(value, 10) : 0;
        form.setValue("age", Number.isNaN(num) ? 0 : num);
        return;
      }
      if (field === "studyPrograms") {
        form.setValue("studyPrograms", Array.isArray(value) ? (value as StudentFormValues["studyPrograms"]) : undefined);
        return;
      }
      if (field === "studyProgram" || field === "codingTrack") return;
      form.setValue(field as keyof StudentFormValues, value as never);
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
