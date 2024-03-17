import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import LoginForm from "./Components/LoginForm";
import RegisterForm from "./Components/RegisterForm";
import QuoteHistory from "./Components/QuoteHistory";
import ProfileManagement from "./Components/ProfileManagement";
import NavBar from "./Components/NavBar";
import QuoteForm from "./Components/QuoteForm";
import Footer from "./Components/Footer";
function App() {
  return (
    <div>
      <Router>
         <NavBar/>
         <Routes>
          <Route path = "/" element = {<LoginForm/>}/>
          <Route path = "/quote" element = {<QuoteForm/>}/>
          <Route path = "/profile" element = {<ProfileManagement/>}/>
          <Route path = "/history" element = {<QuoteHistory/>}/>
          <Route path = "/register" element = {<RegisterForm/>}/>
         </Routes>
         <Footer/>
      {/* <LoginForm />
      <RegisterForm />
      <ProfileManagement/> */}
      </Router>
     
    </div>
  );
}

export default App;
