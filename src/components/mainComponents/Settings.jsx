import HeroBanner from '../HeroBanner';
import SettingsComponent from '../settingsComponent';
import { useSettings } from '../../context/SettingsContext';
import settingsData from '../../data/settingsData.json';

export default function Settings() {
    const { settings, updateSetting } = useSettings();

    return (
        <div>
            <HeroBanner />
            <div>
                <ul className="flex flex-col gap-4 p-8 justify-center align-middle">
                    {settingsData.map((setting, index) => (
                        <li key={index} className="w-full">
                            <SettingsComponent
                                title={setting.title}
                                description={setting.description}
                                type={setting.type}
                                options={setting.options}
                                value={settings[setting.key]}
                                onChange={(val) => updateSetting(setting.key, val)}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
