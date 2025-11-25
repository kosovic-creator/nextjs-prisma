import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getAllPosts() {
    const posts = await prisma.post.findMany({
        include: {
            author: true,
        },
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
