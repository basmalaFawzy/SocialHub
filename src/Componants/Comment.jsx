import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Textarea,
} from "@heroui/react";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { AiOutlineMore } from "react-icons/ai";
import { IoPencil, IoTrashOutline } from "react-icons/io5";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Comment({ postId, comment, creator, isPostDetails }) {
  const [isEdit, setIsEdit] = useState(false);
  const [imagePreview, setImagePreview] = useState(comment.image || null);
  const [newImageFile, setNewImageFile] = useState(null);
  const fileInputRef = useRef(null);
  const { logedUserId } = useContext(AuthContext);

  const formattedDate = new Date(comment.createdAt).toLocaleDateString(
    "en-UK",
    {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  const schema = z.object({
    content: z.string().min(1, "Comment cannot be empty"),
  });

  const { content } = comment;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { content },
  });

  // Delete comment
  function deleteComment() {
    return axios.delete(
      `${import.meta.env.VITE_BASE_URL}/posts/${postId}/comments/${comment._id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }

  const query = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      toast.success("Comment deleted successfully", {
        position: "top-center",
        autoClose: 3000,
      });
      query.invalidateQueries({ queryKey: ["allPosts"] });
      query.invalidateQueries({ queryKey: ["getPostComments"] });
    },
    onError: () => {
      toast.error("Failed to delete comment", {
        position: "top-center",
        autoClose: 3000,
      });
    },
  });
//  edit comment
  function editComment(formData) {
    return axios.put(
      `${import.meta.env.VITE_BASE_URL}/posts/${postId}/comments/${comment._id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }

  const { isPending: isEditing, mutate: mutateEdit } = useMutation({
    mutationFn: editComment,
    onSuccess: () => {
      toast.success("Comment updated successfully", {
        position: "top-center",
        autoClose: 3000,
      });
      query.invalidateQueries({ queryKey: ["allPosts"] });
      query.invalidateQueries({ queryKey: ["getPostComments"] });
      setIsEdit(false);
    },
    onError: () => {
      toast.error("Failed to update comment", {
        position: "top-center",
        autoClose: 3000,
      });
    },
  });

  const onSubmitEdit = (values) => {
    const formData = new FormData();
    formData.append("content", values.content);
    if (newImageFile) {
      formData.append("image", newImageFile);
    }
    mutateEdit(formData);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setNewImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const toggleEdit = () => {
    if (!isEdit) {
      reset({ content });
      setImagePreview(comment.image || null);
      setNewImageFile(null);
    }
    setIsEdit(!isEdit);
  };

  return (
    <div className="flex flex-col items-start w-full mb-4 p-3">
      <p
        className={`text-[11px] font-bold uppercase tracking-wide text-gray-500 mb-3 ${isPostDetails ? "hidden" : "flex"}`}
      >
        Top comment
      </p>
      <div className="flex gap-3 w-full">
        <Avatar
          src={creator.photo}
          size="sm"
          className="border-2 border-amber-100"
        />
        <div className="flex-1">
          <Card className="bg-amber-50 w-full *:p-1 px-2 py-2.5 rounded-2xl border border-amber-100">
            <CardHeader className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {creator.name}
                </p>
                <p className="text-xs text-slate-400">{formattedDate}</p>
              </div>

              {logedUserId === creator._id && (
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      isIconOnly
                      variant="light"
                      size="sm"
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <AiOutlineMore size={18} />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Dropdown menu with icons"
                    variant="light"
                  >
                    <DropdownItem
                      onPress={toggleEdit}
                      key="edit"
                      startContent={<IoPencil />}
                    >
                      Edit comment
                    </DropdownItem>
                    <DropdownItem
                      className="text-rose-400 hover:bg-rose-50"
                      key="delete"
                      startContent={<IoTrashOutline />}
                      onPress={() => mutate()}
                    >
                      Delete comment
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              )}
            </CardHeader>

            {isEdit ? (
              <CardBody>
                <form
                  onSubmit={handleSubmit(onSubmitEdit)}
                  className="space-y-3"
                >
                  <Textarea
                    {...register("content")}
                    variant="flat"
                    minRows={2}
                    classNames={{
                      input: "text-gray-700 p-2",
                      base: "bg-transparent",
                      inputWrapper:
                        "border border-gray-300 bg-transparent shadow-none p-0",
                    }}
                  />
                  {errors.content && (
                    <p className="text-xs text-rose-500">
                      {errors.content.message}
                    </p>
                  )}

                  {/* Image section */}
                  {imagePreview ? (
                    <div className="relative rounded-xl overflow-hidden border border-gray-100 group">
                      <img
                        src={imagePreview}
                        alt="Comment image preview"
                        className="w-full h-auto object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-white text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-amber-50 transition-colors flex items-center gap-1.5"
                        >
                          <IoPencil size={13} /> Replace image
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full border-2 border-dashed border-gray-200 rounded-xl py-4 text-sm text-gray-400 hover:border-amber-400 hover:text-amber-500 transition-colors flex items-center justify-center gap-2"
                    >
                      <IoPencil size={14} /> Add image
                    </button>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png, image/jpeg"
                    className="hidden"
                    onChange={handleImageChange}
                  />

                  <div className="flex w-full gap-3 justify-end items-center">
                    <button
                      type="button"
                      onClick={toggleEdit}
                      disabled={isEditing}
                      className="border border-gray-300 rounded-full px-3 py-1 text-sm font-semibold hover:bg-amber-50 transition-colors cursor-pointer disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isEditing}
                      className="bg-amber-500 rounded-full px-3.5 py-1 text-sm text-white font-semibold hover:bg-amber-600 transition-colors cursor-pointer disabled:opacity-60 flex items-center gap-1.5"
                    >
                      {isEditing ? "Saving..." : "Save"}
                    </button>
                  </div>
                </form>
              </CardBody>
            ) : (
              <CardBody>
                {comment.content && (
                  <p className="text-sm text-gray-700">{comment.content}</p>
                )}
                {comment.image && (
                  <img
                    src={comment.image}
                    alt="Comment"
                    className="mt-2 rounded-xl w-full h-auto object-cover"
                  />
                )}
              </CardBody>
            )}
          </Card>

          <div className="flex items-center gap-4 mt-1 ml-2">
            <button className="text-xs text-gray-500 hover:text-amber-600 transition-colors">
              Like
            </button>
            <button className="text-xs text-gray-500 hover:text-rose-600 transition-colors">
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}