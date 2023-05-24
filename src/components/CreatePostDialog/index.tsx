import * as Dialog from '@radix-ui/react-dialog';
import Text from '../Text';
import { TextInput } from '../TextInput';
import Button from '../Button';
import { FormEvent, useState } from 'react';
import api from '../../services/api';
import { getAuthHeader } from '../../services/auth';
import { Post } from '../../Model/Post';
import Dropzone from '../Dropzone';

interface CreatePostDialogProps {
    postCreated?: (post:Post) => void
}

interface PostFormElements extends HTMLFormControlsCollection {
    title: HTMLInputElement
    description: HTMLInputElement
}

interface PostFormElement extends HTMLFormElement {
    readonly elements: PostFormElements
}

function CreatePostDialog({postCreated}: CreatePostDialogProps){
    const [selectedFile,setSelectedFile] = useState<File>()
    const authHeader = getAuthHeader();
    async function handleSubmit(event: FormEvent<PostFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;

        const formData = new FormData();
        formData.append("title",form.elements.title.value);
        formData.append("description",form.elements.description.value)
        selectedFile && formData.append("file", selectedFile);

        try {
            const { data } = await api.post("/posts", formData, authHeader);
            postCreated && postCreated(data)
        } catch (error) {
            alert("Erro ao tentar salvar novo post.")
        }
    }


    return (
        <Dialog.Portal>
            <Dialog.Overlay className='fixed inset-0 bg-black/60' />

            <Dialog.Content className='py-8 px-10 fixed bg-[#121214] text-white top-1/2 left-1/2 rounded-lg -translate-x-1/2 -translate-y-1/2 w-96 shadow-lg shadow-black/25'>
                <Dialog.Title className='text-2xl font-extrabold'>
                    Novo Post
                </Dialog.Title>
                <form onSubmit={handleSubmit} className='flex flex-col gap-3 mt-4'>
                    <Text>Título do Post</Text>
                    <TextInput.Root>
                        <TextInput.Input id='title' placeholder='Qual o título do post?' />
                    </TextInput.Root>

                    <Text>Conteúdo do Post</Text>
                    <TextInput.Root>
                        <TextInput.Input id='description' placeholder='Qual o conteúdo da mensagem?' />
                    </TextInput.Root>

                    <Dropzone onFileUploaded={setSelectedFile} />

                    <div className='mt-4 flex justify-end gap-4'>
                        <Dialog.Close
                            type='button'
                            className='px-5 h-12 bg-zinc-500 rounded-md hover:bg-zinc-600'
                        >
                            Fechar
                        </Dialog.Close>
                        <Button
                            type='submit'
                            className='w-[5rem] max-w-[5rem] flex-none'
                        >
                            Postar
                        </Button>
                    </div>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}

export default CreatePostDialog