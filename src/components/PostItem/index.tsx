import { Chat, Heart, UserCircle } from "@phosphor-icons/react"
import { Post } from "../../Model/Post"
import Heading from "../Heading"
import Text from "../Text"

interface PostItemProps {
    post: Post
}

function PostItem({post}: PostItemProps){
    return (
        <div className="border-b border-slate-400" key={post._id}>
            <Heading className="flex items-center ml-5 my-4">
                <UserCircle size={48} weight="light" />
                <Text className="ml-2 font-extrabold">{post.profile.name}</Text>
            </Heading>
            <div className="ml-16 flex flex-col gap-2">
                <Heading size="sm">{post.title}</Heading>
                <Text asChild>
                    <p>{post.description}</p>
                </Text>
            </div>
            <footer className="flex items-center space-x-2 ml-16 my-4">
                <Chat size={24} className=" text-slate-50" />
                <Text size="sm">{post.comments.length}</Text>
                
                <div className="hover:bg-sky-400 rounded-full p-1">
                   <Heart size={24} className=" text-slate-50" /> 
                </div> 
                <Text size="sm">{post.likes.length}</Text>
            </footer>
        </div>
    )
}

export default PostItem