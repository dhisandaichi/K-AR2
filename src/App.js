import React, { useState } from 'react';
import ImageSlider from './components/ImageSlider';
import ThreeDViewer from './components/ThreeDViewer';
import VideoAR from './components/VideoAR';

function App() {
    const [activeMenu, setActiveMenu] = useState('image');

    const renderContent = () => {
        switch (activeMenu) {
            case 'image':
                return <ImageSlider />;
            case '3d':
                return <ThreeDViewer />;
            case 'video':
                return <VideoAR />;
            default:
                return <ImageSlider />;
        }
    };

    return (
        <div className="app-container">
            <header className="header">
                <h1>🎯 AR Prototype Demo</h1>
            </header>

            <nav className="nav-menu">
                <button
                    className={`nav-button ${activeMenu === 'image' ? 'active' : ''}`}
                    onClick={() => setActiveMenu('image')}
                >
                    📸 Image Slider AR
                </button>
                <button
                    className={`nav-button ${activeMenu === '3d' ? 'active' : ''}`}
                    onClick={() => setActiveMenu('3d')}
                >
                    🎨 3D Model AR
                </button>
                <button
                    className={`nav-button ${activeMenu === 'video' ? 'active' : ''}`}
                    onClick={() => setActiveMenu('video')}
                >
                    🎬 Video AR
                </button>
            </nav>

            <div className="content-container">
                {renderContent()}
            </div>
        </div>
    );
}

export default App;
