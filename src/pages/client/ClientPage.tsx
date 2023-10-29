import { useState, useEffect } from "react";
import request from "../../server";
import Experience from "../../types/experience";
import useAuth from "../../store/auth";
import useExperience from "../../store/experience";
import { TOKEN, USER, USER_ID } from "../../constants";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom"
import Loading from "../../components/loading";

const ClientPage = () => {
  const [data, setData] = useState<Experience[] | null>(null);
  const user = useAuth((state) => state.user);
  const total = useExperience((state) => state.total);
  const [selected] = useState<string | number | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [values] = useState({
    workName: "",
    companyName: "",
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
        getData();
      }
    catch(err){
      console.log(err);
      
    }
  }


  async function getData() {
    const userId = Cookies.get(USER_ID);
    if (userId !== undefined) {
      setUserId(userId);
    }
    setLoading(true)
    try {
      const {
        data: { data },
      } = await request.get(`experiences`,{
        params: {
          user: userId,
          // page: page,
          // limit: LIMIT,
        },
      });
      setData(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    finally{
    setLoading(false)

    }
  }
  useEffect(() => {
    getData();
  }, [userId]);


  function logout() {
    Cookies.remove(TOKEN);
    localStorage.removeItem(USER);
    navigate("/login");
  }

  return (
    <>
      <header style={{backgroundColor:"lightblue",padding:"16px 0px",boxShadow:"4px 4px 8px 0px rgba(34, 60, 80, 0.2)",position:"fixed",width:'100%',}}>
        <div className="container" style={{display:"flex" ,justifyContent:"space-between",alignItems:"center"}}>
        <a href="/client" className="user" style={{textDecoration:"none",display:"flex",alignItems:"center",gap:"20px"}}>
            <img
             style={{width:"60px",height:"60px",borderRadius:"50px"}}
            src={`https://ap-portfolio-backend.up.railway.app/upload/${user?.photo}`} alt="" />

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
      {/* <div style={{position:'relative',width:"100%",height:"150vh",marginTop:"-20px"}}>
        <span style={{padding:"100px"}}>
      (<Loading/>)
        </span>
      </div> */}
      {
        loading ?(<Loading/>) :
        (<div className="row"  style={{flexWrap:'nowrap'}}>
    
        <footer  style={{backgroundColor:"lightblue",bottom:"0px",maxWidth:"350px",height:"210vh"}}>
          <div className="container">
            <div className="head" style={{paddingTop:"120px"}}>
            <form onSubmit={handleSubmit}>
              <input name="workName" type="text" placeholder="workName"/>
              <input name="companyName" type="text" placeholder="companyName"/>
              <input name="description" type="text" placeholder="description"/>
              <input name="startDate" type="text" placeholder="startDate"/>
              <input name="endDate" type="text" placeholder="endDate"/>
      <button>Add</button>
     </form>
              <h2 style={{fontSize:"18px",lineHeight:"24px",color:"white"}}>User-ID : {user?._id}</h2>
                <button onClick={() => logout()}>LogOut <i className="fa fa-sign-out"></i></button>
            </div>
          </div>
        </footer>
        <section style={{paddingTop:"180px",marginBottom:"100px"}}>
          <h1 style={{color:"black",textAlign:"center",marginBottom:"25px"}}>Experiences({total})</h1>
          <div className="container">
        {data?.map((item) => (
            <div key={item._id} className="col-8" style={{boxShadow:"-1px 0px 13px 10px rgba(34, 60, 80, 0.2)",padding:"8px 6px",borderRadius:"5px",marginBottom:"25px"}}>
              <div className="container">
                <div className="head" style={{display:"flex",gap:"10px"}}>
                  <h1 style={{color:"black"}}>{item.companyName}</h1>
                  <h1 style={{color:"black"}}>{item.workName}</h1>
                </div>
                <div className="footer">
                  <p style={{marginBottom:"5px"}}>{item.description}</p>
                  <span>Start - {item.startDate} : End{item.endDate}</span>
                </div>
              </div>
            </div> 
        ))}
          </div>
        </section>
    
        </div>)
      }
      
    </>
  );
};

export default ClientPage;
