import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import PostCard from "../Componants/PostCard";
import DetailsLoader from '../Componants/Loaders/DetailsLoader';

export default function PostDetails() {
  const { id } = useParams();

  function getSinglePost() {
    return axios.get(`https://route-posts.routemisr.com/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["SinglePost",id],
    queryFn: getSinglePost,
  });

  if (isLoading) {
    return <DetailsLoader />;
  }
  if (isError) {
    return<div className="flex justify-center items-center min-h-screen"> <h1 className="bg-white/80 p-3 rounded-2xl text-rose-900 font-semibold text-2xl">Failed to load post details</h1></div>;
  }

  return <> 
  <PostCard post={data?.data.data.post} isPostDetails/>
  </>;
}
