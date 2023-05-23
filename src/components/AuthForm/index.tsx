import { Envelope, Lock } from "@phosphor-icons/react"
import logo from "../../assets/logo.svg"
import Heading from "../Heading"
import Text from "../Text"
import { TextInput } from "../TextInput"
import Button from "../Button"
import { Link } from "react-router-dom"
import { FormEvent } from "react"

interface AuthFormElements extends HTMLFormControlsCollection {
  user: HTMLInputElement
  password: HTMLInputElement
}

interface AuthFormElement extends HTMLFormElement {
  readonly elements: AuthFormElements
}

export interface Auth {
  user:string
  name?:string
  password: string
}

interface AuthFormProps {
  authFormTitle: string
  submitFormButtonText: string
  routeName: string
  submitFormButtonAction: (auth:Auth) => void
}

function AuthForm(props: AuthFormProps) {
  function handleSubmit(event: FormEvent<AuthFormElement>){
    event.preventDefault();
    const form = event.currentTarget;

    const auth = {
      user: form.elements.user.value,
      password: form.elements.password.value
    }

    props.submitFormButtonAction(auth);
  }

  return (
    <main className="flex flex-col mt-16 items-center">
      <header className="flex flex-col items-center">
        <img src={logo} alt="Logo Sysmap" />        
        <Heading size="lg" className="mt-4">Sysmap Parrot</Heading>
        <Text className="mt-2 opacity-50">{props.authFormTitle}</Text>
      </header>
      <form 
        onSubmit={handleSubmit}
        className="flex flex-col items-stretch gap-4 w-full max-w-sm mt-12"
      >
        <Text>Endereço de e-mail</Text>
        <TextInput.Root>
          <TextInput.Icon>
            <Envelope />
          </TextInput.Icon>
          <TextInput.Input 
            id="user"
            type="text" 
            placeholder="Digite seu e-mail" >
          </TextInput.Input>
        </TextInput.Root>
        <Text>Sua senha</Text>
        <TextInput.Root>
          <TextInput.Icon>
            <Lock />
          </TextInput.Icon>
          <TextInput.Input 
            id="password"
            type="password" 
            placeholder="*********" >
          </TextInput.Input>
        </TextInput.Root>
        <Button className="mt-6" type="submit">
          {props.submitFormButtonText}
        </Button>
      </form>
      <footer className="flex flex-col items-center mt-6 gap-4">
        <Text asChild size="sm">
          <Link
            to={props.routeName} 
            className="text-gray-400 hover:text-gray-200 underline" 
          >
            Não possui conta? Crie uma agora!
          </Link>
        </Text>
      </footer>
    </main>
  )
}

export default AuthForm
