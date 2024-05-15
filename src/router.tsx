import { BASE_URL } from "@/constants";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import { initialUserState, updateUserAtom, userAtom } from "@/store/user.store";
import axios from "axios";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckAuth = ({children}: {children: React.ReactNode}) => {
  
  const [loading, setLoading] = useState<boolean>(true);

  const [user] = useAtom(userAtom);
  const [, updateUser] = useAtom(updateUserAtom)
  const navigate = useNavigate()

  useEffect(()=> {
    if(user.token) {
      const fetchUserData = async () => {
        try {
          const { data } = await axios.get(BASE_URL + "/user", {
            headers: {
              Authorization: `Token ${user.token}`,
            },
          });
          updateUser(data);
        } catch (error) {
          console.log(error);
          updateUser(initialUserState);
          navigate('/')
        } finally {
          setLoading(false); 
        }
      }
  
      fetchUserData()
    }else {
      navigate('/')
    }
  }, [user.token])

  if (loading) return null

  return <>{children}</>
}

const routes = [
  {
    path: '/',
    element: <Login />,
  }, 
  {
    path: '/home',
    element: <CheckAuth><Home /></CheckAuth>,
  },
  {
    path: '*',
    element: <>Page not Found!</>
  }
]

export default routes;