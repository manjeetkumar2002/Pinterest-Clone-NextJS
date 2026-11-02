
"use client";

import React, { useState } from "react";
import UploadImage from "./UploadImage";
import { useSession } from "next-auth/react";
import UserTag from "./UserTag";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { db } from "../Shared/firebaseConfig";

const Form = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [link, setLink] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const onSave = async () => {
        if (!session?.user?.email) {
            alert("Please login first");
            return;
        }

        if (!file) {
            alert("Please select an image");
            return;
        }

        if (!title.trim()) {
            alert("Please enter a title");
            return;
        }

        try {
            setLoading(true);

            const postId = crypto.randomUUID();

            // Step 1: Upload image to Cloudinary
            const formData = new FormData();

            formData.append("file", file);
            formData.append(
                "upload_preset",
                process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
            );

            const cloudinaryResponse = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: formData
                }
            );

            const cloudinaryData = await cloudinaryResponse.json();

            if (!cloudinaryResponse.ok) {
                throw new Error(
                    cloudinaryData.error?.message || "Image upload failed"
                );
            }

            const imageUrl = cloudinaryData.secure_url;

            console.log("Cloudinary Image URL:", imageUrl);

            // Step 2: Save post details in Firestore
            const postData = {
                title,
                desc,
                link,
                image: imageUrl,
                userName: session.user.name,
                email: session.user.email,
                userImage: session.user.image,
                id: postId,
                createdAt: new Date()
            };

            await setDoc(
                doc(db, "pinterest-post", postId),
                postData
            );

            console.log("Post Saved Successfully");

            router.push("/" + session.user.email);

        } catch (error) {
            console.error("Upload Error:", error);
            alert(
                error instanceof Error
                    ? error.message
                    : "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-16 rounded-2xl">

            <div className="flex justify-end mb-6">
                <button
                    onClick={onSave}
                    disabled={loading}
                    className="bg-red-500 p-2 text-white font-semibold
                    px-3 rounded-lg disabled:opacity-50"
                >
                    {loading ? "Uploading..." : "Save"}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                <UploadImage setFile={setFile} />

                <div className="col-span-2">
                    <div className="w-full">

                        <input
                            type="text"
                            placeholder="Add your title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="text-[35px] outline-none font-bold
                            w-full border-b-2 border-gray-400
                            placeholder-gray-400"
                        />

                        <h2 className="text-[12px] mb-8 w-full text-gray-400">
                            The first 40 characters are what usually
                            show up in feeds
                        </h2>

                        <UserTag user={session?.user} />

                        <textarea
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            placeholder="Tell everyone what your pin is about"
                            className="outline-none w-full mt-8 pb-4
                            text-[14px] border-b-2 border-gray-400
                            placeholder-gray-400"
                        />

                        <input
                            type="text"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            placeholder="Add a Destination Link"
                            className="outline-none w-full pb-4 mt-[90px]
                            border-b-2 border-gray-400
                            placeholder-gray-400"
                        />

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Form;
