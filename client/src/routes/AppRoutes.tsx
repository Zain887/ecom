import { Routes, Route } from 'react-router-dom';
import SignUp from '../pages/signUp';
import Login from '../pages/login';
import UserTable from '../pages/user';

function AppRoute() {
    return (
        <Routes>
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<UserTable />} />
        </Routes>
    );
}

export default AppRoute;
