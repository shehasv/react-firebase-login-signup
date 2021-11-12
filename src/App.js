import {React,useEffect} from 'react';
import { useSelector } from 'react-redux';
import './App.scss';
import { selectUser } from './features/userSlice';
import Login from './Login';
import {initializeApp} from 'firebase/app';
import {firebaseConfig} from './firebase'
import { useDispatch } from 'react-redux';
import {login,logout} from './features/userSlice';
import { getAuth } from "firebase/auth";


function App() {

  initializeApp(firebaseConfig);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const auth = getAuth();


  useEffect(() => {
    auth.onAuthStateChanged((userAuth)=>{
      if(userAuth){
        dispatch(login({
          email : userAuth.email,
          uid : userAuth.uid,
          displayName: userAuth.displayName
        }))
      }else{
        dispatch(logout())
      }
    })
  }, [])


  const logoutFromApp = () =>{
    dispatch(logout());
    auth.signOut();
  }

  return (
    
    <div className="App">
      {!user ? ( 
        <Login /> 
        ) : (
          <div>
            <h1>hello {user.displayName}</h1>
            <button onClick={logoutFromApp}>Logout</button>
          </div>
      )}
      
    </div>
  );
}

export default App;
