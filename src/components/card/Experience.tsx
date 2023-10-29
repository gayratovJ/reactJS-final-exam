import Experience from "../../types/experience";

const ExperienceCard = ({ workName, companyName, _id,description }: Experience) => {

    return(
        <div className="card"style={{border: "1px solid black",width: "320px",height: "250px",borderRadius: "50px",}}>
        <a href={`/categories/${_id}`}>
          <h3
            style={{
              textAlign: "center",
              fontSize: "25px",
              lineHeight: "35px",
              color: "blue",
              fontWeight: "700",
            }}
          >
            {workName}
          </h3>
          <h3>{companyName}</h3>
          <p>
            {description}</p>
        </a>
      </div>
    )
};

export default ExperienceCard
