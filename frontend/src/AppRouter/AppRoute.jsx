import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from '../Components/Dashboard/Dashboard'
import SignIn from '../Components/SignIn/Login/SignIn'
const AppRoute = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<SignIn />} />
                <Route path='/dashboard/*' element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoute