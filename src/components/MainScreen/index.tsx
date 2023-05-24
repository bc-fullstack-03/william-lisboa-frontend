import { Post } from "../../Model/Post";
import Menu from "../../components/Menu";
import { ReactNode } from "react";

interface MainScreenProps {
    children: ReactNode
    postCreated?: (post:Post) => void
}

function MainScreen(props: MainScreenProps){
    return (
        <main className="flex w-screen h-screen">
            <Menu postCreated={props.postCreated} />
            {props.children}
        </main>
    )
}

export default MainScreen