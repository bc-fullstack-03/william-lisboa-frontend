import { useNavigate } from "react-router-dom";
import AuthForm, { Auth } from "../../components/AuthForm";
import api from "../../services/api";

function SignUp(){
    const navigate = useNavigate()

    async function handleRegister(auth: Auth) {
        try {
            await api.post("/security/register", auth)
            navigate("/")
        } catch (err) {
            alert("Erro na criação do usuário")
        }
    }

    return (
        <AuthForm 
            authFormTitle="Faça o cadastro e começe a usar!"
            routeName="/"
            submitFormButtonText="Cadastrar"
            submitFormButtonAction={handleRegister}
        />
    )
}

export default SignUp