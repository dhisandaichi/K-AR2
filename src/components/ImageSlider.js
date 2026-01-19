import React, { useState, useEffect } from 'react';
import getApiURL from '../config';

const API_URL = getApiURL();

function ImageSlider() {
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [arMode, setArMode] = useState(false);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await fetch(`${API_URL}/api/images`);
            const data = await response.json();
            setImages(data.images);
            setLoading(false);
        } catch (err) {
            setError('Gagal memuat gambar. Pastikan server berjalan.');
            setLoading(false);
        }
    };

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const startAR = () => {
        setArMode(true);
    };

    const stopAR = () => {
        setArMode(false);
    };

    useEffect(() => {
        if (arMode && images.length > 0) {
            // Initialize MindAR scene
            const sceneEl = document.querySelector('a-scene');
            if (sceneEl) {
                sceneEl.components['mindar-image-system'].start();
            }
        }
    }, [arMode, images]);

    if (loading) {
        return <div className="loading">Memuat gambar...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (arMode) {
        return (
            <div style={{ width: '100%', maxWidth: '900px' }}>
                <h2 className="page-title">Image Slider AR Mode</h2>
                <div className="ar-viewer">
                    <a-scene
                        mindar-image={`imageTargetSrc: ${API_URL}/targets.mind; maxTrack: 1`}
                        color-space="sRGB"
                        renderer="colorManagement: true, physicallyCorrectLights"
                        vr-mode-ui="enabled: false"
                        device-orientation-permission-ui="enabled: false"
                    >
                        <a-assets>
                            {images.map((img, idx) => (
                                <img
                                    key={idx}
                                    id={`image-${idx}`}
                                    src={img.url}
                                    crossOrigin="anonymous"
                                />
                            ))}
                        </a-assets>

                        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

                        <a-entity mindar-image-target="targetIndex: 0">
                            <a-image
                                src={`#image-${currentIndex}`}
                                position="0 0 0"
                                height="1"
                                width="1"
                                rotation="0 0 0"
                            ></a-image>
                        </a-entity>
                    </a-scene>
                </div>
                <div className="slider-controls">
                    <button className="slider-button" onClick={prevImage}>
                        ⬅️ Previous
                    </button>
                    <span className="slider-info">
                        {currentIndex + 1} / {images.length}
                    </span>
                    <button className="slider-button" onClick={nextImage}>
                        Next ➡️
                    </button>
                </div>
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <button className="slider-button" onClick={stopAR}>
                        🛑 Stop AR
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ width: '100%', maxWidth: '900px' }}>
            <h2 className="page-title">Image Slider Preview</h2>

            <div className="image-slider">
                <div className="slider-container">
                    {images.length > 0 && (
                        <img
                            src={images[currentIndex].url}
                            alt={images[currentIndex].name}
                            className="slider-image"
                        />
                    )}
                </div>

                <div className="slider-controls">
                    <button
                        className="slider-button"
                        onClick={prevImage}
                        disabled={images.length === 0}
                    >
                        ⬅️ Previous
                    </button>
                    <span className="slider-info">
                        {images.length > 0 ? `${currentIndex + 1} / ${images.length}` : '0 / 0'}
                    </span>
                    <button
                        className="slider-button"
                        onClick={nextImage}
                        disabled={images.length === 0}
                    >
                        Next ➡️
                    </button>
                </div>

                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                        📁 {images.length > 0 ? images[currentIndex].name : 'Tidak ada gambar'}
                    </p>
                </div>
            </div>

            <div className="ar-instructions">
                <h3>📱 Cara Menggunakan AR:</h3>
                <p>
                    1. Klik tombol "Start AR" di bawah<br />
                    2. Izinkan akses kamera<br />
                    3. Arahkan kamera ke target marker (targets.mind)<br />
                    4. Gambar akan muncul di AR<br />
                    5. Gunakan tombol Previous/Next untuk mengganti gambar
                </p>
                <button className="start-ar-button" onClick={startAR}>
                    🚀 Start AR Mode
                </button>
            </div>
        </div>
    );
}

export default ImageSlider;
