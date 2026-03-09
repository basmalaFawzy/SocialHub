import {
  Card,
  CardBody,
  Divider,
  Image,
  Avatar,
  Badge,
  CardHeader,
} from "@heroui/react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BsThreeDots, BsBell, BsCheck2Circle } from "react-icons/bs";
import {
  AiOutlineHeart,
  AiOutlineComment,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { MdOutlinePersonAdd } from "react-icons/md";

export default function Notifications() {
  // get notifications
  function getNotifications() {
    return axios.get(`${import.meta.env.VITE_BASE_URL}/notifications`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    });
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["getNotifications"],
    queryFn: getNotifications,
  });
// get unread notifications count
  function getUnreadCount() {
    return axios.get(
      `${import.meta.env.VITE_BASE_URL}/notifications/unread-count`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }

  const { data: unreadnotifiCount } = useQuery({
    queryKey: ["getUnreadCount"],
    queryFn: getUnreadCount,
  });

  // mark all as read
  function markAllAsRead(){
     return axios.patch(
      `${import.meta.env.VITE_BASE_URL}/notifications/read-all`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }
  const query=useQueryClient()
  const {mutate}= useMutation({
    mutationFn: markAllAsRead,
    onSuccess:()=>{
      console.log(read)
      query.invalidateQueries({queryKey:['getNotifications']})
    }

  })
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 flex justify-center items-center rounded-full bg-linear-to-r from-amber-200 to-rose-200">
            <BsBell className="text-amber-400 text-2xl mx-auto" />
          </div>
          <p className="text-amber-600 font-medium">Loading notifications...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-100">
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-8 text-center max-w-md">
          <BsBell className="text-rose-400 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-bold text-rose-800 mb-2">
            Failed to load
          </h3>
          <p className="text-rose-600">
            Couldn't load notifications. Please try again.
          </p>
        </div>
      </div>
    );
  }

  const notifications = data?.data.data.notifications || [];
  const unreadCount = unreadnotifiCount?.data.data.unreadCount;
  return (
    <>
      <Helmet>
        <title>Notifications | SocialHub</title>
      </Helmet>

      <Card className="w-full lg:max-w-250 mx-auto border border-amber-100 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        {/* Header with linear */}
        <CardHeader className="bg-linear-to-r from-amber-400 to-rose-400 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                <BsBell className="text-white text-2xl" />
              </div>
              <div>
                <h2 className="font-bold text-2xl text-white">Notifications</h2>
                <p className="text-white/80 text-sm">
                  Stay updated with your activity
                </p>
              </div>
            </div>
          </div>
        </CardHeader>

        {/* Tabs */}
        <div className="flex border-b border-amber-100 px-4 pt-2">
          <button className="px-4 py-2 text-sm font-medium text-amber-600 border-b-2 border-amber-500">
            All
          </button>
          <button className="px-4 py-2 flex gap-2 justify-center items-center  text-sm font-medium text-gray-500 hover:text-amber-600 transition-colors">
            Unread
            {/* Unread badge */}
            {unreadCount > 0 && (
              <span className="bg-rose-100/80 text-rose-500 border-2 border-white w-10 h-7 flex justify-center items-center rounded-2xl">
                <div>{unreadCount} </div>
              </span>
            )}
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-amber-600 transition-colors ml-auto">
            <BsCheck2Circle size={18} />
          </button>
        </div>

        <CardBody className="p-0">
          {notifications ? (
            <div className="divide-y divide-amber-100">
              {notifications.map((notif, index) => (
                <div
                  key={notif._id || index}
                  className={`flex items-start gap-4 p-4 hover:bg-amber-50/50 transition-colors cursor-pointer relative group ${
                    !notif.read ? "bg-amber-50/30" : ""
                  }`}
                >
                  {/* Unread indicator */}
                  {!notif.isRead && (
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-amber-500"></div>
                  )}

                  {/* Avatar with icon overlay */}
                  <div className="relative">
                    <Avatar
                      src={
                        notif.actor?.photo ||
                        "https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                      }
                      size="md"
                      className="border-2 border-amber-100"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center">
                      {notif.type === "like_post" && (
                        <AiOutlineHeart className="text-rose-500 text-xs" />
                      )}
                      {notif.type === "comment_post" && (
                        <AiOutlineComment className="text-amber-500 text-xs" />
                      )}
                      {notif.type === "share_post" && (
                        <AiOutlineShareAlt className="text-teal-500 text-xs" />
                      )}
                      {notif.type === "follow_user" && (
                        <MdOutlinePersonAdd className="text-sky-500 text-xs" />
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-semibold text-gray-800">
                          {notif.actor?.name || "User"}
                        </span>
                        <span className="text-gray-600 text-sm ml-1">
                          {notif.type === "like_post" && "liked your post"}
                          {notif.type === "comment_post" &&
                            "commented on your post"}
                          {notif.type === "share_post" && "shared your post"}
                          {notif.type === "follow_user" &&
                            "started following you"}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                        {new Date(notif.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-3 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-xs text-amber-600 hover:text-amber-700 font-medium">
                        Mark as read
                      </button>
                      <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                      {!(notif.type === "follow_user") && (
                        <button className="text-xs text-gray-500 hover:text-gray-700">
                          View post
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4">
              <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <BsBell className="text-amber-300 text-4xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                No notifications yet
              </h3>
              <p className="text-gray-500 text-sm">
                When you get notifications, they'll appear here
              </p>
            </div>
          )}
        </CardBody>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="border-t border-amber-100 p-3 text-center">
            <button onClick={()=>mutate()} className="text-sm text-amber-600 hover:text-amber-700 font-medium cursor-pointer">
              Mark all as read
            </button>
          </div>
        )}
      </Card>
    </>
  );
}
