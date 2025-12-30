import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { forbidden, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";

export async function getAllPosts() {
    const posts = await prisma.post.findMany({
        include: {
            author: true,
        },
    });
    return posts;
}

export async function getAllPostsTrans() {
    const posts = await prisma.$transaction(async (prismaTxn) => {
        const allPosts = await prismaTxn.post.findMany({
            include: {
                author: true,
            },
        });
        return allPosts;
    });
    return posts;
}

export async function getPostById(id: number) {
    const post = await prisma.post.findUnique({
        where: { id },
    });
    return post;
}

export async function updatePostById(id: number, title: string, content: string) {
    const session = await getServerSession(authOptions);
    const post = await prisma.post.findUnique({
        where: { id },
    });
    if (
        !session ||
        !session.user ||
        !post ||
        Number(session.user.id) !== post.authorId  // Provera da li je trenutni korisnik autor posta
    ) {
        forbidden(); // Baca 403 grešku
    }

    await prisma.post.update({
        where: { id },
        data: { title, content },
    });
    revalidatePath("/posts");
    redirect("/posts");
}

export async function createPost(title: string, content: string, authorId: number) {
    const post = await prisma.post.create({
        data: {
            title,
            content,
            authorId,
        },

    });
    revalidatePath("/posts");
    redirect("/posts");
    return post;

}

export async function deletePostById(id: number) {
    await prisma.post.delete({
        where: { id },
    });
    revalidatePath("/posts");
    redirect("/posts");
}



export async function serverActionTransaction() {
  const result = await prisma.$transaction(async (prismaTxn) => {
    const user = await prismaTxn.user.create({
      data: { name: 'Marko', email: 'marko1@example.com' },
    });

    const post = await prismaTxn.post.create({
      data: {
        title: 'Novi post',
        content: 'Ovo je sadržaj posta',
        authorId: user.id,
      },
    });

    return { user, post };
  });

  return result;
}
// async function getCurrentUserSession() {
//     const session = await getServerSession(authOptions);
//     if (!session) {
//         throw new Error("User session not found.");
//     }
//     return session;
// }

