import { Chat, Heart, UserCircle } from "@phosphor-icons/react"
import { Post } from "../../Model/Post"
import Heading from "../Heading"
import Text from "../Text"
import { getProfile } from "../../services/auth"
import { Link } from "react-router-dom"

interface PostItemProps {
    post: Post,
    handleLike: (postId:string) => void
}

function PostItem({post, handleLike}: PostItemProps){


    return (
        <div className="border-b border-slate-400" key={post._id}>
            <Heading className="flex items-center ml-5 my-4">
                <UserCircle size={48} weight="light" />
                <Text className="ml-2 font-extrabold">{post.profile.name}</Text>
            </Heading>
            <div className="ml-16 flex flex-col gap-2">
                <Link to={`/posts/${post._id}`}>
                    <Heading size="sm">{post.title}</Heading>
                </Link>                
                { post.image ? (
                    <img 
                        src={post.description}
                        className="rounded-lg max-w-lg"                    
                    />
                ): (
                    <Text asChild>
                        <p>{post.description}</p>
                    </Text>
                )}
            </div>
            <footer className="flex items-center space-x-2 ml-16 my-4">
                <Chat size={24} className=" text-slate-50" />
                <Text size="sm">{post.comments.length}</Text>
                
                {post.likes.includes(getProfile()) ? (
                    <Heart size={24} weight="fill" className="cursor-pointer text-red-700 hover:bg-red-500 rounded-full transition-colors" onClick={() => handleLike(post._id)} />
                  ) : (
                    <Heart size={24} className="cursor-pointer text-slate-50 hover:bg-red-600 rounded-full transition-colors" onClick={() => handleLike(post._id)} />
                  ) 
                 }

                <Text size="sm">{post.likes.length}</Text>
            </footer>
        </div>
    )
}

export default PostItem