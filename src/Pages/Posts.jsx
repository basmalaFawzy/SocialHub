import axios from "axios";
import PostCard from "../Componants/PostCard";
import Loader from "../Componants/Loaders/Loader";
import { useQuery } from "@tanstack/react-query";
import PostCreation from "../Componants/PostCreation";
import { Helmet } from "react-helmet";


export default function Posts() {

  function getAllPosts() {
    return axios.get(`${import.meta.env.VITE_BASE_URL}/posts`, {
      // params:{sort:'createdAt'},
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    
    });
  }
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["allPosts"],
    queryFn: getAllPosts,
  });

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }
  return (
    <>
       <Helmet>
        <title>Posts | SocialHub</title>
      </Helmet>
    <PostCreation/>
      {data?.data?.data?.posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
}
