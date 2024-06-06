import {useEffect, useState} from "react";

const Preloader = () => {
    // Optional: Manage state for a fade-out animation
    const [isFadingOut, setIsFadingOut] = useState(false);

    useEffect(() => {
        if (!isFadingOut) {
            setIsFadingOut(true);
            setTimeout(() => setIsFadingOut(false), 500); // Adjust fade time as needed
        }
    }, [isFadingOut], );

    return (
        isFadingOut ? (
            <div
                className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 transition-opacity duration-500 ${
                    isFadingOut ? "opacity-100" : "opacity-100"
                }`}
                style={{
                    background: "rgba(255, 255, 255, 0.3)",
                }}
            >
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
            </div>
        ) : null
    );
};

export default Preloader;
