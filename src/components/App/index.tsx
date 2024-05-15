import "./style.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "@/router"

const App = () => {
  return <>
    <Router>
      <Routes>
        {routes.map((item, index) => (
          <Route key={index} path={item.path} element={item.element} />
        ))}
      </Routes>
    </Router>
  </>
}

export default App;