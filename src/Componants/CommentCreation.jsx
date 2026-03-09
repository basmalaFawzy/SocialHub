import { Image, Textarea } from "@heroui/react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { FaRegSmile } from "react-icons/fa";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useContext } from "react";
import { UserContext } from './../context/UserContext'

export default function CommentCreation({ postId, queryKey }) {
   const { userData } = useContext(UserContext);
  const form = useForm({
    defaultValues: {
      content: "",
      image: "",
    },
  });
  const query = useQueryClient();
  const { handleSubmit, register, reset } = form;

  const formData = new FormData();
  function createComment() {
    axios.post(
      `${import.meta.env.VITE_BASE_URL}/posts/${postId}/comments`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }
  const { data, isPending, mutate } = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: queryKey });
      reset();
    },
    onError: () => {
      <h1 className="text-rose-800 bg-white/90 p-3 rounded-2xl">Faild to create comment</h1>;
    },
  });
  function handelCreatedComment(values) {
    if (!values.body && !values.image[0]) return;
    if (values.body) {
      formData.append("content", values.body);
    }
    if (values.image[0]) {
      formData.append("image", values.image[0]);
    }
    mutate();
  }
  return (
    <div className="w-full flex gap-2 group">
      {/* Avatar*/}
      <Image
        alt="User avatar"
        height={44}
        width={44}
        radius="full"
        src={ userData.photo ||"hhttps://placehold.co/600x400"}
        className="object-cover border-2 border-amber-200 shadow-sm transition-transform group-hover:scale-105 group-hover:border-amber-300"
      />

      {/* Comment input container*/}
      <div className="w-full space-y-3 rounded-2xl border border-amber-200 bg-amber-50 backdrop-blur-sm p-3 shadow-sm transition-all duration-200 hover:border-amber-300 hover:shadow-md focus-within:border-amber-400 focus-within:shadow-lg">
        <form onSubmit={handleSubmit(handelCreatedComment)}>
          {/* Textarea */}
          <Textarea
            {...register("body")}
            variant="flat"
            className="w-full"
            classNames={{
              input:
                "text-sm text-gray-700 placeholder:text-slate-400 font-medium leading-relaxed",
              base: "bg-transparent",
              inputWrapper:
                "bg-transparent shadow-none hover:bg-transparent focus-within:bg-transparent p-0 border-none",
            }}
            labelPlacement="inside"
            placeholder="Write a comment..."
            minRows={1}
            color="warning"
          />

          {/* Action buttons */}
          <div className="flex gap-4 text-slate-500 text-lg">
            <label className="hover:text-amber-600 transition-colors duration-200 hover:scale-110 transform cursor-pointer">
              <MdOutlineAddPhotoAlternate />
              <input {...register("image")} type="file" className="hidden" />
            </label>
            <button
              type="button"
              className="hover:text-rose-500 transition-colors duration-200 hover:scale-110 transform cursor-pointer"
            >
              <FaRegSmile />
            </button>
            <button
              disabled={isPending}
              type="submit"
              className="ml-auto text-amber-600 hover:text-amber-700 duration-200 font-medium text-sm flex items-center gap-1 opacity-0 group-focus-within:opacity-100 transition-opacity disabled:text-amber-900 disabled:cursor-not-allowed"
            >
              {isPending
                ? `${(<AiOutlineLoading3Quarters className="animate-spin" />)} Posting...`
                : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
