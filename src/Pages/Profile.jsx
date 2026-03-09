import { Card, CardBody, Avatar, Divider, Chip } from "@heroui/react";
import { MdBookmark, MdPostAdd } from "react-icons/md";
import { FaBookmark, FaRegUser } from "react-icons/fa";
import { RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { CiCamera } from "react-icons/ci";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ProfileLoader from "../Componants/Loaders/ProfileLoader";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { IoPencil } from "react-icons/io5";
import PostCard from "../Componants/PostCard";

export default function Profile({ myPosts = 4, savedPosts = 0 }) {
  const [isEdit, setIsEdit] = useState(false);
  const [previewImage, setPreviewImage] = useState(
    "https://placehold.co/600x400.png",
  );
  function getMyProfile() {
    return axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile-data`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    });
  }
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getMyProfile"],
    queryFn: getMyProfile,
  });
  const userId = data?.data.data.user.id;
  
  function getUserPosts() {
    return axios.get(`${import.meta.env.VITE_BASE_URL}/users/${userId}/posts`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    });
  }
  const { data: userPosts } = useQuery({
    queryKey: ["getUserPosts"],
    queryFn: getUserPosts,
  });
  if (isLoading) {
    return <ProfileLoader />;
  }
  if (isError) {
    return (
      <h1 className="text-rose-800 bg-white/90 p-3 rounded-2xl text-2xl text-center">
        Faild to load profile
      </h1>
    );
  }
  
  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };
  const coverPhotoStyle = data?.data.data.user.cover
    ? "  bg-[url(${data?.data.data.user.cover})] bg-center bg-cover"
    : "bg-linear-150 from-amber-400 to-rose-400";

  return (
    <>
      <Helmet>
        <title>Profile | SocialHub</title>
      </Helmet>
      {/* profile card */}
      <Card className="w-full lg:max-w-200 mx-auto mb-4 border border-amber-100 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        {/* Header */}

        <div
          className={`relative h-40 bg-linear-to-r from-amber-400 to-rose-400 ${coverPhotoStyle}`}
        >
          <div className="absolute -bottom-10 left-4 ">
            <Avatar
              src={data?.data.data.user.photo}
              className="size-30 border-4 border-white shadow-lg"
            />
            {isEdit && (
              <label className="absolute -bottom-2 right-1 bg-amber-500 text-white p-2 rounded-full z-1 cursor-pointer">
                <CiCamera size={20} />
                <input type="file" className="hidden" />
              </label>
            )}
          </div>

          {isEdit && (
            <button className="flex items-center gap-1 absolute top-2 right-2 font-semibold text-sm text-white bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded-full transition-colors cursor-pointer">
              <IoPencil />
              Edit cover
            </button>
          )}
        </div>

        <CardBody className="pt-12 px-4 pb-4">
          {/* Name and username */}
          <div className="mb-3">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              {data?.data.data.user.name}
            </h2>
            <p className="text-sm text-gray-500">
              @{data?.data.data.user.username}
            </p>
          </div>

          {/* Bio/Member info */}
          <Chip className="mb-3 bg-amber-50/50 p-2 rounded-2xl border border-amber-100 fit-content ">
            <p className="text-sm text-gray-700 flex items-center gap-2">
              <FaRegUser className="text-amber-500" size={14} />
              Route Posts member
            </p>
          </Chip>

          <Divider className="bg-amber-100 my-2" />

          {/* About section */}
          <div className="space-y-2 mb-3">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              About
            </h3>

            <div className="flex items-center gap-2 text-sm text-gray-700">
              <HiOutlineMail className="text-amber-500" size={16} />
              <span>{data?.data.data.user.email}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-700">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>Active on Route Posts</span>
            </div>
          </div>

          <Divider className="bg-amber-100 my-2" />

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-3 mb-3">
            {/* Followers */}
            <div className="text-center p-2 rounded-lg hover:bg-amber-50 transition-colors">
              <div className="flex justify-center mb-1">
                <RiUserFollowLine className="text-amber-500" size={20} />
              </div>
              <p className="text-lg font-bold text-gray-800">
                {data?.data.data.user.followersCount}
              </p>
              <p className="text-xs text-gray-500">Followers</p>
            </div>

            {/* Following */}
            <div className="text-center p-2 rounded-lg hover:bg-amber-50 transition-colors">
              <div className="flex justify-center mb-1">
                <RiUserUnfollowLine className="text-rose-500" size={20} />
              </div>
              <p className="text-lg font-bold text-gray-800">
                {data?.data.data.user.followingCount}
              </p>
              <p className="text-xs text-gray-500">Following</p>
            </div>

            {/* Bookmarks */}
            <div className="text-center p-2 rounded-lg hover:bg-amber-50 transition-colors">
              <div className="flex justify-center mb-1">
                <FaBookmark className="text-amber-500" size={18} />
              </div>
              <p className="text-lg font-bold text-gray-800">
                {data?.data.data.user.bookmarksCount}
              </p>
              <p className="text-xs text-gray-500">Bookmarks</p>
            </div>
          </div>

          <Divider className="bg-amber-100 my-2" />

          {/* Post stats */}
          <div className="grid grid-cols-2 gap-3">
            {/* My Posts */}
            <div className="flex items-center gap-2 p-2 rounded-lg bg-linear-to-r from-amber-50 to-rose-50/30 border border-amber-100">
              <div className="p-2 rounded-full bg-amber-100">
                <MdPostAdd className="text-amber-600" size={18} />
              </div>
              <div>
                <p className="text-lg font-bold text-gray-800">{userPosts?.data.data.posts.length}</p>
                <p className="text-xs text-gray-500">My Posts</p>
              </div>
            </div>

            {/* Saved Posts */}
            <div className="flex items-center gap-2 p-2 rounded-lg bg-linear-to-r from-amber-50 to-rose-50/30 border border-amber-100">
              <div className="p-2 rounded-full bg-rose-100">
                <MdBookmark className="text-rose-500" size={18} />
              </div>
              <div>
                <p className="text-lg font-bold text-gray-800">{savedPosts}</p>
                <p className="text-xs text-gray-500">Saved Posts</p>
              </div>
            </div>
          </div>

          {/* Edit Profile Button */}
          <button
            onClick={() => toggleEdit()}
            className="w-full mt-4 py-2 bg-linear-to-r from-amber-500 to-rose-500 text-white rounded-lg font-medium text-sm hover:shadow-md transition-all hover:scale-[1.02]"
          >
            Edit Profile
          </button>
        </CardBody>
      </Card>
      {/* user Posts */}
      {userPosts?.data.data.posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
}
