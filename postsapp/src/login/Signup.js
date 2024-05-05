import React, {useState, useEffect} from "react";
import { loadBlockchainData, loadWeb3 } from "../Web3helpers";
import {putData} from "./fetch";
 
import { useNavigate } from "react-router-dom";
export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const navigate = useNavigate();
 
  const [accounts, setAccounts] = useState(null);
  const [auth, setAuth] = useState(null);
 
  const loadAccounts = async () => {
    let { auth, accounts } = await loadBlockchainData();
 
    setAccounts(accounts);
    setAuth(auth);
  };
 
  const addDataToDynamoDB = async () => {
    if (!username || !email || !password) {
      alert("please fill all details");
      return;
    }
    var mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(mailformat)) {
      alert("please enter valid email address");
      return;
    }
    try {
      await auth.methods
        .createUser(username, email, password)
        .send({ from: accounts });
        const userData = {
          userName:username,
          email:email,
          password: password
        }
      await putData('Users' , userData);
      localStorage.setItem("username", username);
      localStorage.setItem("email", email);
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    loadWeb3();
  }, []);
 
  useEffect(() => {
    loadAccounts();
  }, []);
 
  return (
    <div style={rootDiv}>
      <img
        src="https://media.istockphoto.com/id/1057455004/vector/hand-hold-phone-logotype-hand-hold-smartphone.jpg?s=612x612&w=0&k=20&c=-RXiEdROvJMurKjA09aBGn4FJ2_qo_gIRMHdnV92oS4="
        style={image}
        alt="geeks"
      />
      <input
        style={input}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        type="text"
      />
      <input
        style={input}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="text"
      />
      <input
        style={input}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />
      <button style={button} onClick={() => addDataToDynamoDB()}>
        {" "}
        Sign Up
      </button>
    </div>
  );
}
 
const rootDiv = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
};
 
const input = {
  width: 300,
  padding: 10,
  margin: 10,
  borderRadius: 10,
  outline: "none",
  border: "2px solid grey",
  fontSize: 17,
};
 
const button = {
  width: 325,
  padding: 10,
  borderRadius: 10,
  margin: 10,
  cursor: "pointer",
  fontSize: 17,
  color: "black",
  backgroundColor: "#1dcaff",
  border: "none",
  boxShadow: "5px -5px 5px black",
};
 
const image = {
  width: 70,
  height: 70,
  objectFit: "contain",
  borderRadius: 70,
};