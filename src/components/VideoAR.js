import React, { useState, useEffect } from 'react';
import getApiURL from '../config';

const API_URL = getApiURL();

function VideoAR() {
    const [videoFile, setVideoFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [arMode, setArMode] = useState(false);

    useEffect(() => {
        fetchVideo();
    }, []);

    const fetchVideo = async () => {
        try {
            const response = await fetch(`${API_URL}/api/video`);
            const data = await response.json();
            setVideoFile(data);
            setLoading(false);
        } catch (err) {
            setError('Gagal memuat video. Pastikan server berjalan.');
            setLoading(false);
        }
    };

    const startAR = () => {
        setArMode(true);
    };

    const stopAR = () => {
        setArMode(false);
    };

    useEffect(() => {
        if (arMode && videoFile) {
            const sceneEl = document.querySelector('a-scene');
            if (sceneEl) {
                sceneEl.components['mindar-image-system'].start();
            }
        }
    }, [arMode, videoFile]);

    if (loading) {
        return <div className="loading">Memuat video...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (arMode) {
        return (
            <div style={{ width: '100%', maxWidth: '900px' }}>
                <h2 className="page-title">Video AR Mode</h2>
                <div className="ar-viewer">
                    <a-scene
                        mindar-image={`imageTargetSrc: ${API_URL}/targets.mind; maxTrack: 1`}
                        color-space="sRGB"
                        renderer="colorManagement: true, physicallyCorrectLights"
                        vr-mode-ui="enabled: false"
                        device-orientation-permission-ui="enabled: false"
                    >
                        <a-assets>
                            <video
                                id="ar-video"
                                src={videoFile.url}
                                preload="auto"
                                loop
                                crossOrigin="anonymous"
                            ></video>
                        </a-assets>

                        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

                        <a-entity mindar-image-target="targetIndex: 0">
                            <a-video
                                src="#ar-video"
                                position="0 0 0"
                                height="1"
                                width="1.778"
                                rotation="0 0 0"
                            ></a-video>
                        </a-entity>
                    </a-scene>
                </div>
                <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                    <button className="slider-button" onClick={stopAR}>
                        🛑 Stop AR
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ width: '100%', maxWidth: '900px' }}>
            <h2 className="page-title">Video Preview</h2>

            <div className="image-slider">
                <div className="slider-container">
                    {videoFile && (
                        <video
                            src={videoFile.url}
                            controls
                            style={{
                                width: '100%',
                                borderRadius: '15px',
                                maxHeight: '500px',
                            }}
                        >
                            Browser Anda tidak mendukung tag video.
                        </video>
                    )}
                </div>

                <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                    <p style={{ fontSize: '1.1rem' }}>
                        📁 {videoFile.name}
                    </p>
                </div>
            </div>

            <div className="ar-instructions">
                <h3>🎬 Cara Menggunakan Video AR:</h3>
                <p>
                    1. Klik tombol "Start AR" di bawah<br />
                    2. Izinkan akses kamera<br />
                    3. Arahkan kamera ke target marker (targets.mind)<br />
                    4. Video akan diputar otomatis di AR<br />
                    5. Video akan berulang secara otomatis (loop)
                </p>
                <button className="start-ar-button" onClick={startAR}>
                    🚀 Start AR Mode
                </button>
            </div>
        </div>
    );
}

export default VideoAR;
