import { UserCircle } from "@phosphor-icons/react"
import { FormEvent, useState } from "react"
import api from "../../services/api"
import { likePost, unLikePost } from "../../services/post"
import { getAuthHeader, getProfile } from "../../services/auth"
import { Post } from "../../Model/Post"
import PostItem from "../PostItem"
import { TextInput } from "../TextInput"
import Button from "../Button"
import Text from "../Text"

interface PostDetailItemProps {
    post: Post;
    setPostDetail: (post: Post) => void;
}
  
interface CommentFormElements extends HTMLFormControlsCollection {
    description: HTMLTextAreaElement;
}
  
interface CommentFormElement extends HTMLFormElement {
    readonly element: CommentFormElements;
}

export function PostDetailItem({ post, setPostDetail }: PostDetailItemProps) {
  const profile = getProfile() || "";
  const [comment, setComment] = useState("");

  async function handleLike() {
    try {
      if (post?.likes.includes(profile)) {
        const newPost = await unLikePost(post, profile);
        setPostDetail({ ...newPost });
      } else {
        const newPost = await likePost(post, profile);
        setPostDetail({ ...newPost });
      }
    } catch (error) {
      alert("Erro ao realizar like.");
    }
  }

  async function handleSaveComment(event: FormEvent<CommentFormElement>) {
    event.preventDefault();
    const formData = {
      description: comment,
    };

    try {
      await api.post(`posts/${post._id}/comments`, formData, getAuthHeader());

      const response = await api.get(`posts/${post._id}`, getAuthHeader());
      setPostDetail(response.data);
    } catch (error) {
      alert("Erro ao tentar fazer comentário.");
    }
    setComment('')
  }

  return (
    <div className="flex text-white flex-col w-full overflow-auto scroll-smooth ">
      {post && <PostItem handleLike={handleLike} post={post} />}

      <form onSubmit={handleSaveComment} className="flex flex-col px-4 mb-8">
        <div className="flex flex-col gap-4 mt-10  mb-10">
          <Text> Inseria seu comentario:</Text>
          <TextInput.TextInputTextArea
            id="description"
            className="ml-2 w-1/2 bg-transparent text-lg h-40 p-2 rounded-lg mt-2 font-bold outline-none focus:focus-within:ring-2 ring-cyan-300"
            spellCheck={false}
            placeholder="Digite seu comentário aqui"
            value={comment}
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => setComment(e.target.value)}
          />
        </div>

        <div className="flex">
          <Button type="submit" className="w-[210px]">
            Incluir comentario
          </Button>
        </div>
      </form>
      <section className="border-t  border-slate-400 w-full ">
        <Text className="mx-8 font-extrabold my-8 " >Comentários:</Text>
        <ul className="mx-8">
          {post.comments && post.comments.map((comment: Post) => (
            <li key={comment._id} className="my-8 border rounded-lg ">
              <div className="flex items-center gap-2">
                <UserCircle size={32} weight="fill" className="text-slate-50" />
                <Text size='sm'> {comment.profile.name}</Text>
              </div>
              <Text className="mx-8" > {comment.description}</Text>
            </li>
          ))}
        </ul>
      </section>

    </div>
  )
}