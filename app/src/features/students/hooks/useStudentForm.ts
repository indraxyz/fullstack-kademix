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
  };

  const errors: StudentFormErrors = {
    name: form.formState.errors.name?.message,
    email: form.formState.errors.email?.message,
    age: form.formState.errors.age?.message,
    address: form.formState.errors.address?.message,
    photo: form.formState.errors.photo?.message,
  };

  const handleInputChange = useCallback(
    (field: keyof StudentFormData, value: string | number) => {
      form.setValue(
        field,
        (field === "age"
          ? (typeof value === "string" ? parseInt(value, 10) : value) || 0
          : value) as never,
      );
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
