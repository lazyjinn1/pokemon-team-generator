import { Routes, Route } from 'react-router-dom';
import Settings from './Settings';
import TeamGenerator from './TeamGenerator';

function MainPage() {
    return (
        <Routes>
            <Route path="/" element={<TeamGenerator />} />
            <Route path="/settings" element={<Settings />} />
        </Routes>
    );
}

export default MainPage;
