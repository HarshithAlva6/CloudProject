import React, {useState, useEffect} from "react";
import { loadBlockchainData, loadWeb3 } from "../Web3helpers";
import { useNavigate } from "react-router-dom";
import {fetchData, putData} from './fetch';
 
export default function SignIn() {
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

  const fetchDataFormDynamoDb = () => {
    fetchData('Users',(err, items) => {
      console.log('Items found:', items);
    });
  }
  const addDataToDynamoDB = async () => {
    const userData = {
      userName:"HarshAlva",
      email:"Harshith.alva318@gmail.com",
	    password: "harsh6"
    }
	await putData('Users' , userData);
  }
 
  const login = async () => {
    if (!email || !password) {
      alert("please fill all details");
      return;
    }
 
    try {
      //const res = await auth.methods.usersList(email).call();
      fetchData('Users',(err, items) => {
        if(items.find(item => item.email === email)){  
        localStorage.setItem("email", email);
        localStorage.setItem("account", accounts);
        navigate("/Home");
      } else {
        alert("wrong user credentials or please signup");
      }
    })
    } catch (err) {
      alert(err.message);
    }
  };
 
  useEffect(() => {
    loadWeb3();
  }, []);
 
  useEffect(() => {
    loadAccounts();
  }, []);
 
  return (
    <div style = {rootDiv}>
       <h2>WEB CONTENT</h2>
      <img
        src="https://media.istockphoto.com/id/1057455004/vector/hand-hold-phone-logotype-hand-hold-smartphone.jpg?s=612x612&w=0&k=20&c=-RXiEdROvJMurKjA09aBGn4FJ2_qo_gIRMHdnV92oS4="
        style={image}
        alt="media"
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
      <button style={button} onClick={login}>
        {" "}
        Sign In
      </button>
 
      <span
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigate("/Signup");
        }}
      >
        {" "}
        Create new account{" "}
      </span>
      <button onClick={() => fetchDataFormDynamoDb()}> Fetch </button>
	    <button onClick={() => addDataToDynamoDB()}> Put </button>
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
  color: "white",
  backgroundColor: "#0055D0",
  border: "none",
};
 
const image = {
  width: 70,
  height: 70,
  objectFit: "contain",
  borderRadius: 70,
};