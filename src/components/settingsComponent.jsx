import { useState, useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';

function SettingsComponent({
    title,
    description,
    type = 'toggle',
    value,
    onChange,
    options = [],
}) {
    const [selectedValue, setSelectedValue] = useState(value);
    const { settings } = useSettings();

    useEffect(() => {
        setSelectedValue(value);
    }, [value]);

    const handleChange = (newValue) => {
        setSelectedValue(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <section className={`border-b py-6 ${settings.darkMode ? "border-gray-700" : "border-gray-300"}`}>
            <div className="mb-2">
                <h2 className={`text-xl font-semibold ${settings.darkMode ? "text-white" : ""}`}>{title}</h2>
                {description && (
                    <p className={`text-sm ${settings.darkMode ? "text-gray-300" : "text-gray-500"}`}>
                        {description}
                    </p>
                )}
            </div>

            <div className="mt-4">
                {type === 'toggle' ? (
                    <button
                        type="button"
                        onClick={() => handleChange(!selectedValue)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${selectedValue
                            ? settings.darkMode
                                ? 'bg-yellow-400'
                                : 'bg-red-600'
                            : settings.darkMode
                                ? 'bg-gray-600'
                                : 'bg-gray-300'
                            }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${selectedValue ? 'translate-x-6' : 'translate-x-1'
                                }`}
                        />
                    </button>
                ) : type === 'radio' ? (
                    <div className="flex gap-6">
                        {options.map((option) => (
                            <label key={option} className={`flex items-center ${settings.darkMode ? "text-white" : ""}`}>
                                <input
                                    type="radio"
                                    value={option}
                                    checked={selectedValue === option}
                                    onChange={() => handleChange(option)}
                                    className="mr-2"
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                ) : type === 'buttons' ? (
                    <div className="flex gap-2 flex-wrap">
                        {options.map((option) => {
                            const isSelected = selectedValue === option;
                            const baseClasses = 'px-4 py-2 rounded border transition-colors';

                            const selectedClasses = isSelected
                                ? settings.darkMode
                                    ? 'bg-yellow-400 text-black font-semibold hover:bg-yellow-500'
                                    : 'bg-red-600 text-white font-semibold hover:bg-red-700'
                                : settings.darkMode
                                    ? 'bg-gray-700 text-white border-gray-500 hover:bg-gray-600'
                                    : 'bg-white text-black border-gray-300 hover:bg-red-200';

                            return (
                                <button
                                    key={option}
                                    onClick={() => handleChange(option)}
                                    className={`${baseClasses} ${selectedClasses}`}
                                >
                                    {option}
                                </button>
                            );
                        })}
                    </div>
                ) : null}
            </div>
        </section>
    );
}

export default SettingsComponent;
