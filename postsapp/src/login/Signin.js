import React, {useState, useEffect} from "react";
import { loadBlockchainData, loadWeb3 } from "../Web3helpers";
import { useNavigate } from "react-router-dom";
import {fetchData} from './fetch';
 
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState(null);
  const [amount, setAmount] = useState(null);
 
  const loadAccounts = async () => {
    let { auth, accounts, amount } = await loadBlockchainData();
    setAccounts(accounts);
    setAmount(amount);
  };

  const fetchDataFormDynamoDb = () => {
    fetchData('Users',(err, items) => {
      console.log('Items found:', items);
    });
  }
 
  const login = async () => {
    if (!email || !password) {
      alert("please fill all details");
      return;
    }
    try {
      fetchData('Users',(err, items) => {
        if(items.find(item => item.email === email)){  
        localStorage.setItem("email", email);
        localStorage.setItem("account", accounts);
        localStorage.setItem("amount", amount);
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
        style={button}
        onClick={() => {
          navigate("/Signup");
        }}
      >
        {" "}
        Create new account{" "}
      </span>
{/* <button onClick={() => fetchDataFormDynamoDb()}> Fetch </button> */}
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
  width: 300,
  padding: 10,
  borderRadius: 10,
  margin: 10,
  cursor: "pointer",
  fontSize: 17,
  color: "black",
  backgroundColor: "#1dcaff",
  border: "none",
  boxShadow: "5px 5px 5px black"
};
 
const image = {
  width: 70,
  height: 70,
  objectFit: "contain",
  borderRadius: 70,
  margin: 30
};