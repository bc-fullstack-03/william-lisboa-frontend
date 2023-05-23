import { Envelope, Lock } from "@phosphor-icons/react"
import logo from "./assets/logo.svg"
import Heading from "./components/Heading"
import Text from "./components/Text"
import { TextInput } from "./components/TextInput"
import Button from "./components/Button"

function App() {

  return (
    <main className="flex flex-col mt-16 items-center">
      <header className="flex flex-col items-center">
        <img src={logo} alt="Logo Sysmap" />        
        <Heading size="lg" className="mt-4">Sysmap Parrot</Heading>
        <Text className="mt-2 opacity-50">Faça login e começe a usar!</Text>
      </header>
      <form 
        className="flex flex-col items-stretch gap-4 w-full max-w-sm mt-12"
      >
        <Text>Endereço de e-mail</Text>
        <TextInput.Root>
          <TextInput.Icon>
            <Envelope />
          </TextInput.Icon>
          <TextInput.Input 
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
            type="password" 
            placeholder="*********" >
          </TextInput.Input>
        </TextInput.Root>
        <Button className="mt-6" type="submit">
          Entrar
        </Button>
      </form>
      <footer className="flex flex-col items-center mt-6 gap-4">
        <Text asChild size="sm">
          <a 
            className="text-gray-400 hover:text-gray-200 underline" 
            href=""
          >
            Não possui conta? Crie uma agora!
          </a>
        </Text>
      </footer>
    </main>
  )
}

export default App
