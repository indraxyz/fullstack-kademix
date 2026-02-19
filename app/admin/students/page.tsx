import StudentManagement from "@/app/src/features/students/components/StudentManagement";

export default function AdminStudentsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Students</h1>
        <p className="text-muted-foreground">
          View, add, edit, and remove student records.
        </p>
      </div>
      <StudentManagement />
    </div>
  );
}
