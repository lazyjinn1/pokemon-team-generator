import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';

function HeroBanner() {
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState('Generator');
    const { settings } = useSettings();

    useEffect(() => {
        setCurrentPage(location.pathname === '/settings' ? 'Settings' : 'Generator');
    }, [location.pathname]);

    return (
        <div
            className={`grid grid-cols-1 p-4 text-center shadow-lg transition-colors ${settings.darkMode ? 'bg-black text-white' : 'bg-red-600 text-white'
                }`}
        >
            <div>
                <h1 className="text-center font-bold align-middle text-6xl">
                    Random Pokemon Team Generator
                </h1>
            </div>

            <div>
                <ul className="flex gap-4 justify-end mt-4">
                    <li>
                        <Link
                            to="/"
                            className={currentPage === 'Generator' ? 'font-bold pointer-events-none opacity-50' : ''}
                            tabIndex={currentPage === 'Generator' ? -1 : 0}
                            aria-disabled={currentPage === 'Generator'}
                        >
                            Generator
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/settings"
                            className={currentPage === 'Settings' ? 'font-bold pointer-events-none opacity-50' : ''}
                            tabIndex={currentPage === 'Settings' ? -1 : 0}
                            aria-disabled={currentPage === 'Settings'}
                        >
                            Settings
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default HeroBanner;
