import {useEffect, useState} from "react";
import {signInWithPopup} from "firebase/auth";
import {auth, provider} from "@/firebase";
import {useAppStore} from "@/app/store/slice";
import {shallow} from "zustand/shallow";

const Login = () => {
    const [username, initUsername] = useAppStore(
        (state) => [state.username, state.initUsername],
        shallow
    );

    const [name, setName] = useState('');
    const handleGoogleLogin = () => {
        signInWithPopup(auth, provider).then(
            (data) => {
                console.log(data.user.email);
                setName(data.user.email);
            }
        )
    }

    useEffect(() => {
        initUsername(name);
    }, [name]);

    return (
        <>
            {
                name && <>
                    <span className="user-name"> {name} </span>
                    <button> Logout </button>
                </>
            }
            {
                !name && <button onClick={() => handleGoogleLogin()}> Login </button>
            }

        </>
    );
}

export default Login;