import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from '../Components/Dashboard/Dashboard'
import SignIn from '../Components/SignIn/Login/SignIn'
import Login from '../StudentComponents/Auth/Login'
import StudentDashboard from '../StudentComponents/Dashboard/StudentDashboard'

const AppRoute = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<SignIn />} />
                <Route path='/dashboard/*' element={<Dashboard />} />
                <Route path='/Student/' element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoute