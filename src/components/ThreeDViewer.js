import React, { useState, useEffect } from 'react';
import getApiURL from '../config';

const API_URL = getApiURL();

function ThreeDViewer() {
    const [glbFile, setGlbFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [arMode, setArMode] = useState(false);

    useEffect(() => {
        fetchLatestGLB();
    }, []);

    const fetchLatestGLB = async () => {
        try {
            const response = await fetch(`${API_URL}/api/glb-latest`);
            const data = await response.json();
            setGlbFile(data);
            setLoading(false);
        } catch (err) {
            setError('Gagal memuat file 3D. Pastikan server berjalan.');
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
        if (arMode && glbFile) {
            const sceneEl = document.querySelector('a-scene');
            if (sceneEl) {
                sceneEl.components['mindar-image-system'].start();
            }
        }
    }, [arMode, glbFile]);

    if (loading) {
        return <div className="loading">Memuat model 3D...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (arMode) {
        return (
            <div style={{ width: '100%', maxWidth: '900px' }}>
                <h2 className="page-title">3D Model AR Mode</h2>
                <div className="ar-viewer">
                    <a-scene
                        mindar-image={`imageTargetSrc: ${API_URL}/targets.mind; maxTrack: 1`}
                        color-space="sRGB"
                        renderer="colorManagement: true, physicallyCorrectLights"
                        vr-mode-ui="enabled: false"
                        device-orientation-permission-ui="enabled: false"
                    >
                        <a-assets>
                            <a-asset-item
                                id="model-glb"
                                src={glbFile.url}
                                crossOrigin="anonymous"
                            ></a-asset-item>
                        </a-assets>

                        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

                        <a-entity mindar-image-target="targetIndex: 0">
                            <a-gltf-model
                                src="#model-glb"
                                position="0 0 0"
                                scale="0.5 0.5 0.5"
                                rotation="0 0 0"
                                animation="property: rotation; to: 0 360 0; loop: true; dur: 10000; easing: linear"
                            ></a-gltf-model>
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
            <h2 className="page-title">3D Model Preview</h2>

            <div className="image-slider">
                <div style={{ textAlign: 'center', padding: '3rem' }}>
                    <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🎨</div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                        File 3D Terbaru
                    </h3>
                    <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                        📁 {glbFile.name}
                    </p>
                    <p style={{ opacity: 0.8 }}>
                        Model GLB siap ditampilkan dalam AR
                    </p>
                </div>
            </div>

            <div className="ar-instructions">
                <h3>🎯 Cara Menggunakan 3D AR:</h3>
                <p>
                    1. Klik tombol "Start AR" di bawah<br />
                    2. Izinkan akses kamera<br />
                    3. Arahkan kamera ke target marker (targets.mind)<br />
                    4. Model 3D akan muncul dan berputar otomatis<br />
                    5. File yang ditampilkan: <strong>{glbFile.name}</strong>
                </p>
                <button className="start-ar-button" onClick={startAR}>
                    🚀 Start AR Mode
                </button>
            </div>
        </div>
    );
}

export default ThreeDViewer;
