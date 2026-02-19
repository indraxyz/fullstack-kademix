"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useStudentForm } from "@/app/src/features/students/hooks/useStudentForm";
import { useCreateStudentSWR } from "@/app/src/features/students/hooks/useCreateStudentSWR";
import { StudentFormFields } from "@/app/src/features/students/components/student-management/StudentFormFields";
import { getCart, clearCart } from "@/app/src/cart/cart-store";
import type { StudentFormData } from "@/app/src/features/students/types/student";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowLeft, Loader2, UserPlus } from "lucide-react";
import { toast } from "sonner";

export default function StudentsRegisterPage() {
  const router = useRouter();
  const [cartOverrides, setCartOverrides] = useState<Partial<StudentFormData>>({});
  const { createStudent, isMutating } = useCreateStudentSWR();

  useEffect(() => {
    const items = getCart();
    if (items.length > 0) {
      const programs = [
        ...new Set(
          items.map((i) =>
            i.codingTrack
              ? `Coding – ${i.codingTrack.charAt(0).toUpperCase()}${i.codingTrack.slice(1)}`
              : i.studyProgram,
          ),
        ),
      ];
      setCartOverrides({ studyPrograms: programs });
    }
  }, []);

  const {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handlePhotoChange,
    handleSubmit,
    setFieldErrors,
    photoPreview,
  } = useStudentForm({
    editingStudent: null,
    initialOverrides: cartOverrides,
    onSubmit: async (data) => {
      try {
        const cartItems = getCart();
        const studyPrograms =
          cartItems.length > 0
            ? [
                ...new Set(
                  cartItems.map((i) =>
                    i.codingTrack
                      ? `Coding – ${i.codingTrack.charAt(0).toUpperCase()}${i.codingTrack.slice(1)}`
                      : i.studyProgram,
                  ),
                ),
              ]
            : undefined;
        const payload = studyPrograms?.length ? { ...data, studyPrograms } : data;
        const student = await createStudent(payload);
        clearCart();
        toast.success("Registration successful", {
          description: `${student.name} has been added to the students list.`,
        });
        router.push("/");
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Registration failed";
        toast.error(message);
        const gqlErr = err as {
          graphQLErrors?: Array<{
            extensions?: { fieldErrors?: Record<string, string> };
          }>;
        };
        const ext = gqlErr?.graphQLErrors?.[0]?.extensions?.fieldErrors;
        if (ext) setFieldErrors(ext);
        throw err;
      }
    },
    onReset: () => {},
  });

  const submitting = isSubmitting || isMutating;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <Button variant="ghost" asChild className="-ml-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Kademix
            </Link>
          </Button>
          <ThemeToggle />
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg">
            <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background px-6 pt-6 pb-4">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <UserPlus className="h-5 w-5" />
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold text-foreground">
                      Register as Student
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      Fill in your details to register. You will appear in the
                      students list after submission.
                    </p>
                  </div>
                </div>
              </CardHeader>
            </div>
            <CardContent className="px-6 py-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <StudentFormFields
                  formData={formData}
                  errors={errors}
                  onInputChange={handleInputChange}
                  showPhotoSection={true}
                  photoPreview={photoPreview}
                  onPhotoChange={handlePhotoChange}
                />
                <div className="flex flex-col-reverse sm:flex-row gap-2 sm:justify-end pt-4">
                  <Button type="button" variant="outline" asChild>
                    <Link href="/">Cancel</Link>
                  </Button>
                  <Button type="submit" disabled={submitting} className="min-w-[160px]">
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4" />
                        Register
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Admin?{" "}
            <Link href="/admin-login" className="text-primary hover:underline">
              Login to manage students
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
