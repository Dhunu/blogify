import React from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export interface Comment {
    id: number;
    content: string;
    user: {
        name: string;
        image: string;
    };
    updatedAt: string;
}

export default function BlogFooter(comments: Comment[]) {
    return (
        <div className="flex flex-col mt-10">
            <Textarea placeholder="Write a comment" className="" />
            <Button className="mt-2 w-32 " size="sm">
                Post Comment
            </Button>

            <div className="mt-5">
                <h3>Comments</h3>
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <div
                            key={comment.id}
                            className="flex gap-2 items-center mt-3"
                        >
                            <img
                                src={comment.user.image}
                                alt={comment.user.name}
                                className="h-6 w-6 rounded-full object-cover m-0"
                            />
                            <div>
                                <p className="font-semibold">
                                    {comment.user.name}
                                </p>
                                <p className="text-sm">{comment.content}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No comments yet</p>
                )}
            </div>
        </div>
    );
}
