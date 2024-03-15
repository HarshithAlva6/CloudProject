import * as React from "react";
import { loadBlockchainData, loadWeb3 } from "../Web3helpers";
import { useNavigate } from "react-router-dom";
 
export default function SignIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
 
  const [accounts, setAccounts] = React.useState(null);
  const [auth, setAuth] = React.useState(null);
 
  const loadAccounts = async () => {
    let { auth, accounts } = await loadBlockchainData();
 
    setAccounts(accounts);
    setAuth(auth);
  };
 
  const login = async () => {
    if (!email || !password) {
      alert("please fill all details");
      return;
    }
 
    try {
      const res = await auth.methods.usersList(email).call();
 
      if (res.password === password) {
        localStorage.setItem("email", email);
        localStorage.setItem("account", accounts);
        navigate("/Home");
      } else {
        alert("wrong user credentials or please signup");
      }
    } catch (error) {
      alert(error.message);
    }
  };
 
  React.useEffect(() => {
    loadWeb3();
  }, []);
 
  React.useEffect(() => {
    loadAccounts();
  }, []);
 
  return (
    <div style = {rootDiv}>
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
  backgroundColor: "#9D27CD",
  border: "none",
};
 
const image = {
  width: 70,
  height: 70,
  objectFit: "contain",
  borderRadius: 70,
};