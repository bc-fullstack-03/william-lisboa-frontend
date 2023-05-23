import AuthForm from "../../components/AuthForm";

function Login(){
    return (
        <AuthForm
            routeName="/signup" 
            authFormTitle="Faça login e começe a usar!" 
            submitFormButtonText="Entrar" 
        />
    )
}

export default Login