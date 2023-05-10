import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import axios, { AxiosError } from "axios";
import Dashboard from "./components/Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [configData, setConfigData] = useState<any>();

  const login = async (props: { username: string; password: string }) => {
    try {
      const result = await axios.post("https://api.infokanal.com/login", {
        username: props.username,
        password: props.password,
      });
      if(result.status === 200){
        const configResult = await axios.get("https://api.infokanal.com/get-config");
        setConfigData(configResult.data);
        setIsLoggedIn(true);
      }else{
        alert("Something wrong happened, please try again");
      }
    } catch (e: any) {
      console.error(e);
      if (e.response.status !== 200) {
        alert("Wrong credentials, please try again");
      } else {
        alert("Something wrong happened, please try again");
      }
    }
  };

  return <>{isLoggedIn ? <Dashboard config={configData}/> : <Login loginHandler={login} />}</>;
}

export default App;
