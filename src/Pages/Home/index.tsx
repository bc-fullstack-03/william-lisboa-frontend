import { getAuthHeader } from "../../services/auth"
import api from "../../services/api";
import { useEffect, useState } from "react";
import Feed from "../../components/Feed";
import MainScreen from "../../components/MainScreen";
import { Post } from "../../Model/Post";
import { likePost, unLikePost } from "../../services/post";

function Home(){
    const profile = localStorage.getItem("profile") as string;
    const [posts,setPosts] = useState<Post[]>([])
    const authHeader = getAuthHeader();

    useEffect(()=> {
        async function getPosts() {
            try {
               const { data } = await api.get("/feed", authHeader);
               setPosts(data)
            } catch (error) {
                alert("Error ao obter o Feed.")
            }
        }

        getPosts();
    }, [])

    async function postCreated(post:Post){
        try {
            const { data } = await api.get(`/posts/${post._id}`, authHeader);
            setPosts((posts) => [data, ...posts])
        }catch(err){
            alert("Error ao tentar obter post salvo.")
        }
    }

    async function handleLike(postId:string){
        const [post, ...rest] = posts.filter((post) => post._id === postId);

        try {
            if(post && !post.likes.includes(profile)){
                const newPost = await likePost(post, profile);
                changePosts(newPost);
            } else{
                const newPost = await unLikePost(post,profile)
                changePosts(newPost)
              }
        } catch (error) {
            alert("Error ao tentar realizar o like.")
        }
    }

    function changePosts(newPost:Post){
        setPosts((posts) => {             
          const index = posts.indexOf(newPost)
          posts[index] = newPost
          return [...posts]
        })
      }

    return (
        <MainScreen postCreated={postCreated}>
            <Feed posts={posts} handleLike={handleLike}  />
        </MainScreen>
    )
}

export default Home