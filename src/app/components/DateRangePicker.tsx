import React, {useState} from "react";

interface DateRangePickerProps {
    startDate: Date | null;
    endDate: Date | null;
    onChange: (start: Date | null, end: Date | null) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
                                                             startDate,
                                                             endDate,
                                                             onChange,
                                                         }) => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("Last 30 days"); // Initialize with default
    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleFilterChange = (days?: number, label?: string) => {
        const today = new Date();
        let startDate = new Date(today);
        let endDate = today;

        if (days) {
            startDate.setDate(today.getDate() - days);
        } else {
            // Calculate for "Last Month" and "Last Year"
            if (today.getMonth() === 0) {
                startDate.setFullYear(today.getFullYear() - 1, 11); // December of previous year
            } else {
                startDate.setMonth(today.getMonth() - 1);
            }
            startDate.setDate(1); // First day of the month
        }
        onChange(startDate, endDate);
        if(label) setSelectedFilter(label)
        else setSelectedFilter(days ? `Last ${days} days` : "Last month");
        setIsDropdownOpen(false);
    };

    return <div className="relative">
        <button onClick={handleDropdownToggle} id="dropdownRadioButton"
                data-dropdown-toggle="dropdownRadio"
                className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                type="button">
            <svg className="w-3 h-3 text-gray-500 dark:text-gray-400 me-3" aria-hidden="true"
                 xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path
                    d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
            </svg>
            {selectedFilter}
            <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                 fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                      strokeWidth="2" d="m1 1 4 4 4-4"/>
            </svg>
        </button>
        <div id="dropdownRadio"
             className={`z-10 ${isDropdownOpen ? "" : "hidden"} w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
             data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top">
            <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownRadioButton">
                {[
                    {label: "Last day", days: 1},
                    {label: "Last 7 days", days: 7},
                    {label: "Last 30 days", days: 30},
                    {label: "Last month", days: undefined},
                    {label: "Last year", days: 365},
                ].map(({label, days}) => (
                    <li key={label}>
                        <button
                            onClick={() => handleFilterChange(days, label)}
                            className={`flex items-center p-2 rounded w-full text-left ${
                                selectedFilter === label
                                    ? "bg-blue-100 dark:bg-blue-700"
                                    : "hover:bg-gray-100 dark:hover:bg-gray-600"
                            }`}
                        >
                            {label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    </div>
};

export default DateRangePicker;
