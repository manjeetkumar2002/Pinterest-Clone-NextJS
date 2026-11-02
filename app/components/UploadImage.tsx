"use client";

import React, { useState } from "react";
import { HiArrowUpCircle } from "react-icons/hi2";

function UploadImage({ setFile }: { setFile: (file: File) => void }) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    return (
        <div className="h-[450px] bg-[#e9e9e9] rounded-lg">
            <label className="m-5 flex flex-col justify-center items-center
                cursor-pointer h-[90%] border-2 border-gray-300
                border-dashed rounded-lg text-gray-600">

                {!selectedFile && (
                    <div className="flex items-center flex-col">
                        <HiArrowUpCircle className="text-[22px]" />
                        <h2 className="font-semibold">Click to Upload</h2>
                    </div>
                )}

                {selectedFile && (
                    <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="selected-image"
                        className="object-contain h-[90%]"
                    />
                )}

                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                        const file = e.target.files?.[0];

                        if (file) {
                            setFile(file);
                            setSelectedFile(file);
                        }
                    }}
                />
            </label>
        </div>
    );
}

export default UploadImage;