import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Textarea,
  Button,
  Divider,
} from "@heroui/react";
import {
  MdOutlineAddPhotoAlternate,
  MdClose,
  MdKeyboardArrowDown,
} from "react-icons/md";
import { FaRegSmile } from "react-icons/fa";
import { useRef, useState, useContext } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserContext } from "../context/UserContext";

export default function PostCreation() {
  const { userData } = useContext(UserContext);
  const {name, photo,username}=userData || {}
  const [postContent, setPostContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const textareaInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const query = useQueryClient();

  // image preview
  function handleImageUpload(e) {
    const imagePath = URL.createObjectURL(e.target.files[0]);
    setSelectedImage(imagePath);
  }
  // remove the selected image
  function handelImageRemove() {
    setSelectedImage(null);
    imageInputRef.current.value = "";
  }

  // prepare form data for post creation
  function prepData() {
    const formData = new FormData();
    if (textareaInputRef.current.value) {
      formData.append("body", textareaInputRef.current.value);
    }
    if (imageInputRef.current.files[0]) {
      formData.append("image", imageInputRef.current.files[0]);
    }
    return formData;
  }

  function createPost() {
    return axios.post(`${import.meta.env.VITE_BASE_URL}/posts`, prepData(), {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    });
  }
  const { isPending, mutate } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      setSelectedImage(null);
      setPostContent(null);
      query.invalidateQueries({ queryKey: ["allPosts"] });
      textareaInputRef.current.value = "";
      imageInputRef.current.value = "";
    },
  });
  return (
    <div>
      <Card className="w-full lg:max-w-200 mx-auto mb-6 border border-blue-100 shadow-sm">
        {/* Header  */}
        <CardHeader className="flex items-center gap-3 px-4 py-3">
          <Avatar
            src={photo || "https://avatars.githubusercontent.com/u/86160567?s=200&v=4"}
            size="md"
            className="border-2 border-blue-200"
          />

          <div>
            <p className="text-md font-semibold text-gray-800">{name}</p>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span>Public</span>
              <MdKeyboardArrowDown />
            </div>
          </div>
        </CardHeader>

        {/* Text input */}
        <CardBody className="px-4 pt-0 pb-2">
          <Textarea
            ref={textareaInputRef}
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder={`What's on your mind, ${username}?`}
            variant="flat"
            minRows={3}
            classNames={{
              input: "text-gray-700 p-2 placeholder:text-gray-400 text-base",
              base: "bg-transparent",
              inputWrapper: "bg-transparent shadow-none p-0",
            }}
          />

          {/* Image preview */}
          {selectedImage && (
            <div className="relative mt-3 inline-block">
              <img
                src={selectedImage}
                alt="Preview"
                className="max-h-48 rounded-lg border border-blue-200"
              />
              <button
                onClick={() => handelImageRemove()}
                className="absolute -top-2 -right-2 bg-teal-500 text-white rounded-full p-1 hover:bg-teal-600 transition-colors shadow-md cursor-pointer"
              >
                <MdClose size={14} />
              </button>
            </div>
          )}
        </CardBody>

        {/* Options */}
        <div className="px-4 py-2 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                ref={imageInputRef}
              />
              <MdOutlineAddPhotoAlternate className="text-blue-600 text-xl" />
              <span className="text-xs">Photo/video</span>
            </label>

            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-teal-600 transition-colors cursor-pointer">
              <FaRegSmile className="text-teal-500 text-xl" />
              <span className="text-xs">Feeling/activity</span>
            </button>
          </div>
        </div>

        <Divider className="bg-blue-100" />

        {/* Post button */}
        <CardFooter className="px-4 py-3">
          <Button
            className="w-full bg-linear-to-r from-blue-500 to-teal-500 text-white font-medium shadow-sm hover:shadow-md transition-all hover:scale-[1.01] disabled:opacity-50"
            size="lg"
            isDisabled={!postContent && !selectedImage}
            onPress={() => mutate()}
          >
            Post
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
