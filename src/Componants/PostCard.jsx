import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Button,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Textarea,
} from "@heroui/react";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineComment,
  AiOutlineShareAlt,
  AiOutlineMore,
  AiOutlineGlobal,
} from "react-icons/ai";
import { BsLock, BsPeopleFill } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { CiBookmark } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import Comment from "./Comment";
import axios from "axios";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import CommentsLoader from "./Loaders/CommentsLoader";
import CommentCreation from "./CommentCreation";
import { useContext, useState, useRef } from "react";
import { IoPencil } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function PostCard({ post, isPostDetails = false }) {
  const {
    createdAt,
    image,
    privacy,
    body,
    likesCount,
    sharesCount,
    commentsCount,
    user,
    topComment,
    id,
  } = post;

  const { name, username, photo } = user;
  const userId = user._id;
  const { logedUserId } = useContext(AuthContext);
  const navigate = useNavigate();
  const topCommentCreator = topComment?.commentCreator || {};
  const [commentInput, setCommentInput] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [imagePreview, setImagePreview] = useState(image || null);
  const [newImageFile, setNewImageFile] = useState(null);
  const fileInputRef = useRef(null);

  // Format date
  const formattedDate = new Date(createdAt).toLocaleDateString("en-UK", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  //  Zod schema
  const schema = z.object({
    body: z.string().min(1, "Post content cannot be empty"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { body },
  });

  //  Fetch post comments 
  function getPostComments() {
    return axios.get(`${import.meta.env.VITE_BASE_URL}/posts/${id}/comments`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    });
  }

  const { data, isLoading } = useQuery({
    queryKey: ["getPostComments"],
    queryFn: getPostComments,
    enabled: isPostDetails,
  });

  const toggleCommentInput = () => setCommentInput((prev) => !prev);

  // Privacy icon mapping
  const getPrivacyIcon = () => {
    switch (privacy) {
      case "private":
        return <BsLock className="text-gray-500" size={12} />;
      case "friends":
        return <BsPeopleFill className="text-gray-500" size={12} />;
      default:
        return <AiOutlineGlobal className="text-gray-500" size={12} />;
    }
  };

  const Placeholder_Image = "https://placehold.co/600x400";
  const isLiked = false;

  //  Delete post 
  function deletePost() {
    return axios.delete(`${import.meta.env.VITE_BASE_URL}/posts/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    });
  }

  const query = useQueryClient();

  const { isPending: isDeleting, mutate: mutateDelete } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      toast.success("Post deleted successfully", {
        position: "top-center",
        autoClose: 3000,
      });
      query.invalidateQueries({ queryKey: ["allPosts"] });
      navigate("/");
    },
    onError: () => {
      toast.error("Failed to delete post", {
        position: "top-center",
        autoClose: 3000,
      });
    },
  });

  //  Edit post 
  function editPost(formData) {
    return axios.put(`${import.meta.env.VITE_BASE_URL}/posts/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
  }

  const { isPending: isEditing, mutate: mutateEdit } = useMutation({
    mutationFn: editPost,
    onSuccess: () => {
      toast.success("Post updated successfully", {
        position: "top-center",
        autoClose: 3000,
      });
      query.invalidateQueries({ queryKey: ["allPosts"] });
      query.invalidateQueries({ queryKey: ["getPostComments"] });
      setIsEdit(false);
    },
    onError: () => {
      toast.error("Failed to update post", {
        position: "top-center",
        autoClose: 3000,
      });
    },
  });

  const onSubmitEdit = (values) => {
    const formData = new FormData();
    formData.append("body", values.body);

    // append image when new image is selected
    if (newImageFile) {
      formData.append("image", newImageFile);
    }
    mutateEdit(formData);
  };

  // Handle new image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setNewImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // toggle edit & reset form values and image state to current post data
  const toggleEdit = () => {
    if (!isEdit) {
      reset({ body });
      setImagePreview(image || null);
      setNewImageFile(null);
    }
    console.log(id)
    setIsEdit(!isEdit);
  };

  return (
    <Card className="w-full lg:max-w-200 mx-auto mb-4 hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      {/* Header */}
      <CardHeader className="flex gap-3 px-4 py-3">
        <div className="relative">
          <Image
            alt={username}
            height={44}
            width={44}
            radius="full"
            src={photo || Placeholder_Image}
            className="object-cover border-2 border-white shadow-sm"
          />
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex items-center gap-2">
            <p className="text-md font-semibold hover:text-amber-600 cursor-pointer transition-colors">
              {name || username}
            </p>
            <span className="text-xs text-gray-500">@{username}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>{formattedDate}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              {getPrivacyIcon()}
              <span className="capitalize text-gray-500">{privacy}</span>
            </div>
          </div>
        </div>

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
          <DropdownMenu aria-label="Dropdown menu with icons" variant="light">
            <DropdownItem key="save" startContent={<CiBookmark />}>
              Save post
            </DropdownItem>
            {logedUserId === userId && (
              <>
                <DropdownItem
                  key="edit"
                  startContent={<IoPencil />}
                  onPress={toggleEdit}
                >
                  Edit post
                </DropdownItem>
                <DropdownItem
                  className="text-rose-400 hover:bg-rose-50"
                  key="delete"
                  startContent={<IoTrashOutline />}
                  onPress={() => mutateDelete()}
                >
                  Delete post
                </DropdownItem>
              </>
            )}
          </DropdownMenu>
        </Dropdown>
      </CardHeader>

      {/* Body */}
      <CardBody className="px-4 py-2 space-y-3">
        {isEdit ? (
          //  EDIT FORM 
          <form onSubmit={handleSubmit(onSubmitEdit)} className="space-y-3">
            {/* Text area */}
            <Textarea
              {...register("body")}
              variant="flat"
              minRows={2}
              classNames={{
                input: "text-gray-700 p-2",
                base: "bg-transparent",
                inputWrapper:
                  "border border-gray-300 bg-transparent shadow-none p-0",
              }}
            />
            {errors.body && (
              <p className="text-xs text-rose-500">{errors.content.message}</p>
            )}

            {/* Image section */}
            {imagePreview ? (
              <div className="relative rounded-xl overflow-hidden border border-gray-100 group">
                <img
                  src={imagePreview}
                  alt="Post image preview"
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
              // Post had no image — allow adding one
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-gray-200 rounded-xl py-4 text-sm text-gray-400 hover:border-amber-400 hover:text-amber-500 transition-colors flex items-center justify-center gap-2"
              >
                <IoPencil size={14} /> Add image
              </button>
            )}

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={handleImageChange}
            />

            {/* Action buttons */}
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
        ) : (
          <>
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {body}
            </p>

            {image && (
              <div className="rounded-xl overflow-hidden border border-gray-100">
                <Image
                  src={image}
                  alt={body}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
          </>
        )}

        {/* Stats bar */}
        <div className="flex items-center justify-between py-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-linear-to-br from-amber-400 to-rose-400 flex items-center justify-center">
                <FiHeart size={12} className="text-white" />
              </div>
            </div>
            <span className="text-gray-600 font-medium">{likesCount} likes</span>
          </div>

          <div className="flex gap-3 text-gray-500">
            <button className="hover:text-amber-600 transition-colors flex items-center gap-1">
              <AiOutlineComment size={14} />
              {commentsCount}
            </button>
            <span>•</span>
            <button className="hover:text-rose-600 transition-colors flex items-center gap-1">
              <AiOutlineShareAlt size={14} />
              {sharesCount}
            </button>
            <button className="text-rose-600 hover:bg-rose-50 transition-background p-1 rounded-md">
              <Link to={`post-details/${id}`}>View Details</Link>
            </button>
          </div>
        </div>
      </CardBody>

      <Divider className="my-1" />

      {/* Action Buttons */}
      <div className="px-2 py-1">
        <div className="flex justify-around w-full">
          <Button
            size="sm"
            variant="light"
            className={`flex-1 gap-2 transition-all ${
              isLiked
                ? "text-amber-600 bg-amber-50"
                : "text-gray-600 hover:text-amber-600 hover:bg-amber-50"
            }`}
            startContent={
              isLiked ? <AiFillHeart size={18} /> : <AiOutlineHeart size={18} />
            }
          >
            Like
          </Button>

          <Button
            size="sm"
            variant="light"
            className="flex-1 gap-2 text-gray-600 hover:text-rose-600 hover:bg-rose-50 transition-all"
            startContent={<AiOutlineComment size={18} />}
            onPress={toggleCommentInput}
          >
            Comment
          </Button>

          <Button
            size="sm"
            variant="light"
            className="flex-1 gap-2 text-gray-600 hover:text-rose-600 hover:bg-rose-50 transition-all"
            startContent={<AiOutlineShareAlt size={18} />}
          >
            Share
          </Button>
        </div>
      </div>

      <CardFooter className="px-3 py-2 flex flex-col items-start">
        {/* Top comment */}
        {!isPostDetails && topComment && (
          <Comment
            postId={id}
            comment={topComment}
            creator={topCommentCreator}
            commentsCount={commentsCount}
          />
        )}
        {/* Loading comments */}
        {isPostDetails && isLoading && <CommentsLoader />}
        {/* All comments in post details */}
        {isPostDetails &&
          !isLoading &&
          data?.data.data.comments.map((curruntComment) => (
            <Comment
              key={curruntComment._id}
              postId={id}
              comment={curruntComment}
              creator={curruntComment.commentCreator}
              isPostDetails={true}
            />
          ))}
        {/* Create comment */}
        {commentInput && (
          <CommentCreation
            postId={id}
            queryKey={isPostDetails ? ["getPostComments"] : ["allPosts"]}
          />
        )}
      </CardFooter>
    </Card>
  );
}
