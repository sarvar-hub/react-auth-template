import "./style.css"
import { useAtom } from "jotai";
import { initialUserState, updateUserAtom, userAtom } from "@/store/user.store";

const Home = () => {
  const [user] = useAtom(userAtom);
  const [, updateUser] = useAtom(updateUserAtom)

  const handleLogout = () => {
    updateUser(initialUserState)
  }

  return (
    <>
      <div className="centered-div">
        <table>
          <thead>
            <tr>
              <th>username</th>
              <th>email</th>
              <th>token</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.token}</td>
            </tr>
          </tbody>
        </table>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  )
}

export default Home