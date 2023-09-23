'use server';

import { revalidatePath } from 'next/cache';
import { getUser } from '../utils/auth';
import { prisma } from '../utils/db';

export const createPost = async (body, images) => {
    const user = await getUser(true);
    const post = await prisma.post.create({
        data: {
            body,
            images,
            authorId: user?.id,
        }
    });
    revalidatePath('/');
    return post;
};

export const likePost = async (postId, userId) => {
    try {
        let post;
        const liked = await prisma.postLikes.findUnique({
            where: {
                postId_userId: {
                    postId, userId
                }
            }
        });
        if (!!liked)
            post = await prisma.postLikes.delete({
                where: {
                    postId_userId: {
                        postId, userId
                    }
                }
            });
        else post = await prisma.postLikes.create({
            data: {
                userId, postId
            }
        });

        revalidatePath('/');
        return post;
    } catch (error) {
        revalidatePath('/');
    }
};