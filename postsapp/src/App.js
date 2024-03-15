import './App.css';
//import { useSDK } from "@metamask/sdk-react";
import React from 'react';
import { Route,Routes, Navigate } from 'react-router-dom';
import Navi from './common/Navi';
import WatchedList from './Content/WatchedList';
import SignUp from './login/Signup';
import SignIn from './login/Signin';
import Home from './login/Home';
import ImagesList from './Users/ImagesList';

//function App() {
//  return (
//    <div className="App">
//      <UsersList />
//    </div>
//  );
//}
export const App = () => {
  //const [account, setAccount] = useState("");
  //const { sdk, connected, connecting, provider, chainId } = useSDK();
//
  //  const connect = async () => {
  //      try {
  //          const accounts = await sdk?.connect();
  //          setAccount(accounts?.[0]);
  //      } catch (err) {
  //          console.warn("failed to connect..", err);
  //      }
  //  };
  const email = localStorage.getItem("email");
    return (
        <div className="App">
          <Navi />
          <Routes>        
            <Route path="/customers" element={<ImagesList />}/>
            <Route path="/content"  element={<WatchedList />}/>
            <Route exact path="/" element={<SignIn />} />
            <Route path="/Signup" element={<SignUp />} />
            <Route path="/Home" element={email ? <Home /> : <Navigate to="/" />}
          />
          </Routes>
        </div>
    );
  }
export default App;

