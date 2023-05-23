import jwtDecode from "jwt-decode";
import AuthForm, { Auth } from "../../components/AuthForm";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

interface UserToken {
    profile: string
    user: string
}

function Login(){
    const navigate = useNavigate()

    async function handleLogin(auth: Auth) {
        try {
            const {data} = await api.post("/security/login", auth);
            const decodedToken = jwtDecode(data.accessToken) as UserToken;
            localStorage.setItem("profile", decodedToken.profile);
            localStorage.setItem("user", decodedToken.user);
            localStorage.setItem("accessToken", data.accessToken);
            navigate("/home")
        } catch (err) {
            alert("Erro ao tentar logar usuário")
        }
    }

    return (
        <AuthForm
            routeName="/signup" 
            authFormTitle="Faça login e começe a usar!" 
            submitFormButtonText="Entrar" 
            submitFormButtonAction={handleLogin}
        />
    )
}

export default Login