import { UserCircle } from "@phosphor-icons/react";
import { Post } from "../../Model/Post";
import Heading from "../Heading";
import Text from "../Text";
import PostItem from "../PostItem";

interface FeedProps {
    posts: Post[]
}

function Feed({posts}:FeedProps){
    console.log(posts);
    
    return (
        <div className="basis-5/6 overflow-y-auto scroll-smooth">
            <Heading className="mt-4 border-b border-slate-400">
                <Text size="lg" className="ml-5 font-extrabold">
                    Página Inicial
                </Text>
                <div className="flex items-center ml-5 my-4">
                    <UserCircle size={48} weight="light" className="text-slate-50" />
                    <Text size="lg" className="ml-2 font-extrabold">Fulano Silva</Text>
                </div>
            </Heading>
            <section>
                {posts && 
                posts.map((post) => (
                    <PostItem post={post} />
                ))}
            </section>
        </div>
    )
}

export default Feed;