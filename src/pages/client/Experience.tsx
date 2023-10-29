import useAuth from "../../store/auth";

const Experience = () => {
  const user = useAuth((state) => state.user);
const error = "Hech narsa topilmadi"
  return (
    <>
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
      <section style={{paddingTop:"120px"}}>
        <div className="container" style={{display:"grid",justifyContent:"center"}}>
          <img style={{width:"200px",height:"200px",borderRadius:'100px',marginBottom:"25px"}} src={`https://ap-portfolio-backend.up.railway.app/upload/${user?.photo}`} alt="Rasm mavjud emas!" />
         <div style={{backgroundImage:`url=${`https://ap-portfolio-backend.up.railway.app/upload/${user?.photo}`}`}}>
         <h3>FirstName</h3>
<h1 style={{color:'black',fontWeight:"700"}}>{user?.firstName}</h1>
          <h3>LastName</h3>

          <h1 style={{color:'black',fontWeight:"700"}}>{user?.lastName}</h1>
          <h3>UserName</h3>
          <h1 style={{color:'black',fontWeight:"700"}}>{user?.username}</h1>
<h3>User Id</h3>
<h1 style={{color:'black',fontWeight:"700"}}>{user?._id ? user?._id : error}</h1>

          <h3>Adress</h3>
          <h1 style={{color:'black',fontWeight:"700"}}>{user?.address}</h1>
          <h3>PhoneNumber</h3>
          <h1 style={{color:'black',fontWeight:"700"}}>{user?.phoneNumber}</h1>
          <h3>Email</h3>

          <h1 style={{color:'black',fontWeight:"700"}}>{user?.email ? user?.email : error}</h1>
          <h3>GitHub</h3>
          <h1 style={{color:'black',fontWeight:"700"}}>{user?.github ? user?.github : error}</h1>
          <h3>Instagram</h3>
          <h1 style={{color:'black',fontWeight:"700"}}>{user?.instagram ? user?.instagram : error}</h1>
          <h3>Facebook</h3>
          <h1 style={{color:'black',fontWeight:"700"}}>{user?.facebook ? user?.facebook : error}</h1>
          <h3>Telegram</h3>
          <h1 style={{color:'black',fontWeight:"700"}}>{user?.telegram ? user?.telegram : error}</h1>
          <h3>Role</h3>
          <h1 style={{color:'black',fontWeight:"700"}}>Siz ({user?.role ? user?.role : error}) siz</h1>
<h3>Info</h3>
<h1 style={{color:'black',fontWeight:"700"}}>{user?.info ? user?.info : error}</h1>

         </div>
        </div>
      </section>
    </>
  )
}

export default Experience
