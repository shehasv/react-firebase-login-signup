import {React,useState} from 'react';
import './Login.scss';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import {login} from './features/userSlice';

function Login() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const auth = getAuth();
    

    const loginUser = () => {

        signInWithEmailAndPassword(auth,email,password,name)
        .then((userAuth) => {              
            dispatch(login({
                email : userAuth.user.email,
                uid : userAuth.user.uid,
                displayName: userAuth.user.displayName
            }))
        }).catch((error)=>{
            alert(error);
            setToNull();
        })
    }

    
    const signUp = () =>{
        if(!name){
            return alert('please enter the name to register')
        }else{
            createUserWithEmailAndPassword(auth,email,password,name)
            .then((userAuth) => {              
                updateProfile(userAuth.user,{
                    displayName : name
                }).then(()=>{
                    dispatch(login({
                        email : userAuth.user.email,
                        uid : userAuth.user.uid,
                        displayName: name
                    }))
                })
            }).catch((error)=>{
                alert(error);
                setToNull();
            })
        }


    }


    const setToNull = () => {
        setName('');
        setEmail('');
        setPassword('');
    } 

    return (
        <div className="login-container">
            <div className="login-main-container">
                <div className="main-heading">
                    <h2>Sign up / Login</h2>
                </div>
                <div className="fields-container">
                    <form>
                        <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Name (for sign up)"></input>
                        <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email ID"></input>
                        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password"></input>
                        <button onClick={loginUser} type="button">Login</button>
                    </form>
                </div>
                <div className="register-container">
                    <p>Not yet registered ? try</p>
                    <span onClick={signUp}>Sign Up</span>
                </div>
            </div>
        </div>
    )
}

export default Login
