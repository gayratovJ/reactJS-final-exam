import { useEffect, useState } from "react";
import useAuth from "../../store/auth";
import PortfolioData from "../../types/portfolio";
import usePortfolio from "../../store/portfolio";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom"

import request from "../../server";
import { TOKEN, USER, USER_ID } from "../../constants";
import Loading from "../../components/loading";

const Portfolio = () => {
  const user = useAuth((state) => state.user);
  const [data, setPortfolio] = useState<PortfolioData[] | null>(null);
  const total = usePortfolio((state) => state.total);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [selected] = useState<string | number | null>(null);
  const [values] = useState({
    name: "",
    level: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  console.log(total);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      // if (selected === null) {
        await request.post("experiences", values);
      // } else {
        await request.put(`experiences/${selected}`, values);
        getPortfolio();
      }
    catch(err){
      console.log(err);
      
    }
  }

  function logout() {
    Cookies.remove(TOKEN);
    localStorage.removeItem(USER);
    navigate("/login");
  }


  async function getPortfolio() {
    const userId = Cookies.get(USER_ID);
    if (userId !== undefined) {
      setUserId(userId);
    }
    setLoading(true)
    try {
      const {
        data: { data },
      } = await request.get("portfolios",{params:{user:userId}});
      setPortfolio(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }finally{
      setLoading(false)
    }
  }
  useEffect(() => {
    getPortfolio();
  }, [userId]);

  return (
    <div>
      <header style={{backgroundColor:"lightblue",padding:"16px 0px",boxShadow:"4px 4px 8px 0px rgba(34, 60, 80, 0.2)",position:"fixed",width:'100%',}}>
        <div className="container" style={{display:"flex" ,justifyContent:"space-between",alignItems:"center"}}>
        <a href="/client" className="user" style={{textDecoration:"none",display:"flex",alignItems:"center",gap:"20px"}}>
            <img style={{width:"60px",height:"60px",borderRadius:"50px"}}  src={`https://ap-portfolio-backend.up.railway.app/upload/${user?.photo}`} alt="" />
            <h1 style={{fontSize:"20px",lineHeight:'30px',color:"white"}}>
            {user?.firstName}
            {user?.lastName}
            </h1>
          </a>
          <ul style={{
            display:"flex",
            gap:"16px",
            alignItems:'center'
          }}>
            <li style={{ listStyle: "none" }}>
              <a style={{textDecoration:"none"}} href="experince">Experience</a>
            </li>
            <li style={{ listStyle: "none" }}>
              <a style={{textDecoration:"none"}} href="skills">Skills</a>
            </li>
            <li style={{ listStyle: "none" }}>
              <a style={{textDecoration:"none"}} href="education">Education</a>
            </li>{" "}
            <li style={{ listStyle: "none" }}>
              <a style={{textDecoration:"none"}} href="portfolio">Portfolios</a>
            </li>
            <li style={{ listStyle: "none" }}>
              <a style={{textDecoration:"none"}} href="messages">Messages</a>
            </li>
          </ul>
        </div>
      </header>
      {loading ? (<Loading/>): (
        <div className="row">
        <footer  style={{backgroundColor:"lightblue",bottom:"0px",maxWidth:"350px",height:"210vh"}}>
          <div className="container">
            <div className="head" style={{paddingTop:"120px"}}>
            <form onSubmit={handleSubmit}>
                <input name="name" type="text" placeholder="name"/>
                <input name="description" type="text" placeholder="description"/>
                <input name="photo" type="file" placeholder="endDate"/>
  
  
        <button>Add</button>
       </form>
              <h2 style={{fontSize:"18px",lineHeight:"24px",color:"white"}}>User-ID : {user?._id}</h2>
                <button onClick={() => logout()}>LogOut <i className="fa fa-sign-out"></i></button>
            </div>
          </div>
        </footer>
        <section style={{paddingTop:"180px",marginBottom:"100px"}}>
          <h1 style={{color:"black",textAlign:"center",marginBottom:"25px"}}>Portfolio({total})</h1>
          <div className="container">
        {data?.map((item) => (
            <div className="col-12" key={item._id} style={{boxShadow:"-1px 0px 13px 10px rgba(34, 60, 80, 0.2)",padding:"8px 6px",borderRadius:"5px",marginBottom:"25px"}}>
              <div className="container" style={{display:'flex', justifyContent:"space-between",gap:"20px"}}>
                <div className="head" style={{display:"grid",gap:"10px"}}>
                  <h1 style={{color:"black"}}>{item.name}</h1>
                  <p style={{marginBottom:"5px"}}>{item.description}</p>
                </div>
                <div className="footer">
                  {}<img style={{maxWidth:"150px",height:"100px"}} src={`https://ap-portfolio-backend.up.railway.app/upload/${item.photo._id}.jpg`} alt="Rasm mavjud emas!" />
                </div>
              </div>
            </div>
        ))}
          </div>
        </section>
        </div>
      )}
    </div>
  )
}

export default Portfolio
