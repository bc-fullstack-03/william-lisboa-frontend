import { getAuthHeader } from "../../services/auth"
import api from "../../services/api";
import { useEffect, useState } from "react";
import Feed from "../../components/Feed";
import MainScreen from "../../components/MainScreen";
import { Post } from "../../Model/Post";

function Home(){
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

    return (
        <MainScreen>
            <Feed posts={posts}/>
        </MainScreen>
    )
}

export default Home