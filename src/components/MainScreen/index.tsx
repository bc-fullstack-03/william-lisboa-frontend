import Menu from "../../components/Menu";
import { ReactNode } from "react";

interface MainScreenProps {
    children: ReactNode
}

function MainScreen(props: MainScreenProps){
    return (
        <main className="flex w-screen h-screen">
            <Menu />
            {props.children}
        </main>
    )
}

export default MainScreen