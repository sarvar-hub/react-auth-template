import "./style.css"
import { useEffect, useState } from "react"
import ILogin from "@/interfaces/Login";
import axios from "axios";
import { BASE_URL } from "@/constants";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { updateUserAtom, userAtom } from "@/store/user.store";

const Login = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [login, setLogin] = useState<ILogin>({ username: "", password: "" });
  const [errMess, setErrMess] = useState<string | null>(null);
  const [user] = useAtom(userAtom);
  const [, updateUser] = useAtom(updateUserAtom);
  const navigate = useNavigate()

  useEffect(() => {
    if (user.token) {
      navigate("/home");
    } else {
      setLoading(false);
    }
  }, [user.token]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrMess(null);
    const { name, value } = event.target;
    setLogin(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleLogin = async () => {
    try {
      const {data} = await axios.post(BASE_URL+"/login", login);
      navigate('/home')
      updateUser(data)
    }catch (error: any) {
       if (error.response) {
        setErrMess(error.response.data.detail);
      }  else {
        console.log("Error", error.message);
      }
    }
  }

 if (loading) return null;

  return (
    <>
      <div className="app">
        <div className="login-form">
          <h1>Sign in</h1>
          <input type="text" onChange={handleChange} value={login?.username} name="username" placeholder="username" />
          <input type="password" onChange={handleChange} value={login?.password} name="password" placeholder="password" />
          {errMess && <p>{errMess}</p>}
          <button onClick={handleLogin}>Sign in</button>
        </div>
      </div>
    </>
  )
}

export default Login