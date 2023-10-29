import {Outlet} from "react-router-dom"
const ClientLayout = () => {
  return (
    <div>
        <header></header>
        <Outlet/>
        <footer></footer>
    </div>
  )
}

export default ClientLayout