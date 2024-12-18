import { Outlet } from "react-router-dom"
import { Container } from "./components/Container"
import { Header } from "./components/Header"
import { Main } from "./components/Main"
import { SideBar } from "./components/SideBar"

function App() {

  return (
    <Container>
      <div className="grid grid-cols-12 h-screen">
        <SideBar className="col-span-2 grid grid-rows-12 border-r-2 border-gray-200" />

        <div className="grid grid-rows-12 col-span-10">
          <Header
            className="row-span-1 flex items-center justify-end px-8 border-b-2 border-gray-200"
          >
          </Header>

          <Main
            className="row-span-11 p-8"
          >
            <Outlet />
          </Main>
        </div>
      </div>
    </Container>
  )
}

export default App
