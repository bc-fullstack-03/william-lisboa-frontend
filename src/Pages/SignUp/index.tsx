import AuthForm from "../../components/AuthForm";

function SignUp(){
    return (
        <AuthForm 
            authFormTitle="Faça o cadastro e começe a usar!"
            routeName="/"
            submitFormButtonText="Cadastrar"
        />
    )
}

export default SignUp