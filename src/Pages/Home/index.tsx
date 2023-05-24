import { getAuthHeader } from "../../services/auth"
import api from "../../services/api";
import { useEffect, useState } from "react";
import Feed from "../../components/Feed";
import MainScreen from "../../components/MainScreen";
import { Post } from "../../Model/Post";

function Home(){
    const user = localStorage.getItem("user") || "";
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

    function postCreated(post:Post){
        post = {
            ...post,
            profile: {
                name: user
            }
        }

        setPosts((posts) => [post, ...posts])
    }

    return (
        <MainScreen postCreated={postCreated}>
            <Feed posts={posts}/>
        </MainScreen>
    )
}

export default Home