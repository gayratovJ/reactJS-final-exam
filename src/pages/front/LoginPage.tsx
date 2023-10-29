import {useNavigate} from "react-router-dom"
import useAuth from "../../store/auth";
import Login from "../../types/login";
import "./style.module.css"

const LoginPage = () => {
    const   login = useAuth((state) => state.login);
    const navigate = useNavigate()
    const submit = async(e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user: Login = {
            username:e.currentTarget.username.value,
            password:e.currentTarget.password.value,
        };
        login(user,navigate)
    }
  return (
    <>
    <section style={{ background: "url(/src/assets/business.jpg) center / cover"}}>
        <div className="container">
    <div className="row" style={{alignItems:"",justifyContent:"space-around",paddingTop:"150px"}}>
<div className="col-6">
<h1>Rule of Using this w-site</h1>
<p style={{maxWidth:"320px",fontSize:"18px",lineHeight:"30px",color:"white"}}>Your role is user.Please login to our site and then you can use our web-site as possible you can.
    Then rate our web-site "1" to "10"!
</p>
<span style={{fontSize:"20px",lineHeight:"32px",color:"white"}}>We work to create new perioud.</span>
</div>
   <form onSubmit={submit}>
    <input name="username" style={{marginBottom:"5px"}} type="text" placeholder="User Name" />
    <input name="password" style={{marginBottom:"35px"}} type="password" placeholder="Password"/>
    <button>Login</button>
   </form>
    </div>
    </div>
    </section>
    </>
  )
}

export default LoginPage
