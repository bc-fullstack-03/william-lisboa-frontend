import { UserCircle } from "@phosphor-icons/react";
import Heading from "../Heading";
import Text from "../Text";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

function Profile(){
    const navigate = useNavigate();
    const user = localStorage.getItem("user");

    function handleLogout(){
        localStorage.clear();
        navigate("/");
    }

    return (
        <div className="basis-5/6">
         <div>
            <Heading className="mt-4 border-b border-slate-400">
                <Text size="lg" className="ml-5 font-extrabold">
                    Perfil
                 </Text>
                 <div className="ml-5 my-4 w-full max-w-sm">
                    <div className="flex flex-1 items-center my-4">
                        <UserCircle size={48} weight="light" />
                        <Text className="ml-2 font-extrabold">{user}</Text>
                    </div>
                    <Button onClick={handleLogout}>Sair</Button>
                 </div>
            </Heading>
         </div>
        </div>
    )
}

export default Profile;