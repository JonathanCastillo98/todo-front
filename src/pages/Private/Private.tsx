import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';


function Private() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to={"/dashboard"} />} />
            <Route path={"/dashboard"} element={<Dashboard />} />
        </Routes>
    );
}
export default Private;
