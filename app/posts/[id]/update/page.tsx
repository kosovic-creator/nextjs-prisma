import { getPostById, updatePostById } from "@/actions/post";
import { forbidden, notFound, redirect } from "next/navigation";
import UpdatePostForm from "./UpdatePostForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function UpdatePostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = Number(resolvedParams?.id);
  if (!resolvedParams?.id || isNaN(id)) notFound();
  const post = await getPostById(id);
  if (!post) notFound();
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !post || session.user.id !== post.authorId) {
    forbidden(); // Baca 403 grešku
  }

  async function handleUpdate(formData: FormData) {
    "use server";
    // serverska funkcija koja obrađuje form podatke
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    // koristi server akciju za ažuriranje posta na osnovu ID-a i podataka iz forme
    await updatePostById(id, title, content);
    // nakon ažuriranja, preusmeri korisnika nazad na listu postova
    redirect("/posts");
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Update Post</h1>
      {/* Render the UpdatePostForm component with existing post data and the handleUpdate function */}
      <UpdatePostForm post={{
        title: post.title,
        content: post.content ?? undefined
        //šalje post podatke kao propove zajeno sa funkcijom za ažuriranje koja ide u form action
      }} handleUpdateProp={handleUpdate} />
    </div>
  );
}
