import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {PUBLIC_ROUTERS} from "public/routers/PublicRouter.tsx";
import './App.css'
import {AUTHENTICATION_ROUTER} from "authentication/routers/AuthenticationRouters.tsx";
import {ADMIN_ROUTERS} from "@/modules/admin/routers/AdminRouter.tsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                {PUBLIC_ROUTERS.map((rt) => {
                    return <Route key={rt.path} path={rt.path} element={rt.element}/>;
                })}
                {AUTHENTICATION_ROUTER.map((rt) => {
                    return <Route key={rt.path} path={rt.path} element={rt.element}/>;
                })}
                {ADMIN_ROUTERS.map((rt) => {
                    return <Route key={rt.path} path={rt.path} element={rt.element} />;
                })}
            </Routes>
        </BrowserRouter>

    )
}

export default App
