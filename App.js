import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

 
 

function App() {
    
    const [bannerData, setBannerData] = useState({
        description: 'Welcome to our website!',
        timer: 10,
        link: '#',
        isVisible: true
    });

    const handleSubmit = () => {
        axios.post('http://localhost:5000/api/banner', bannerData)
            .then(() => alert('Banner updated!'))
            .catch(err => console.error(err));
    };

    const [countdown, setCountdown] = useState(bannerData.timer);

    // Handle updating the banner data from the dashboard
    const handleUpdateBanner = (newData) => {
        setBannerData(newData);
        setCountdown(newData.timer);
    };

    // Handle the countdown logic
    useEffect(() => {
        if (bannerData.isVisible && countdown > 0) {
            
            const timerId = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
            return () => clearInterval(timerId);
        }
    }, [bannerData.isVisible, countdown]);

    // Handle form input changes in the dashboard
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBannerData((prev) => ({ ...prev, [name]: value }));
    };

    // Toggle the banner visibility
    const handleToggleVisibility = () => {
        setBannerData((prev) => ({ ...prev, isVisible: !prev.isVisible }));
    };
     

    return (
        <div className="App">
            {/* Banner Display */}
            {bannerData.isVisible && countdown > 0 && (
                <div className="banner">
                 
                    <p>{bannerData.description}</p>
                    <a href={bannerData.link} target="_blank" rel="noopener noreferrer">
                        LINK
                    </a>
                    <div className="timer">Time left: {countdown}s</div>
                </div>
            )}

           {/* Toggle Button */}
             
            
            <button className="toggle-button" onClick={handleToggleVisibility}>
                {bannerData.isVisible ? 'Hide Banner' : 'Show Banner'}
            </button>

            {/* Dashboard Control */}
            <div className="dashboard">
                <h2>Banner Dashboard</h2>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        name="description"
                        value={bannerData.description}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Timer (seconds):</label>
                    <input
                        type="number"
                        name="timer"
                        value={bannerData.timer}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Link:</label>
                    <input
                        type="text"
                        name="link"
                        value={bannerData.link}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={bannerData.isVisible}
                            onChange={handleToggleVisibility}
                        />
                        Show Banner
                    </label>
                </div>
                <button onClick={handleSubmit}>Update Banner</button>
                <button onClick={() => handleUpdateBanner(bannerData)}>Restart Banner</button>
            </div>
        </div>
    );
}

export default App;

