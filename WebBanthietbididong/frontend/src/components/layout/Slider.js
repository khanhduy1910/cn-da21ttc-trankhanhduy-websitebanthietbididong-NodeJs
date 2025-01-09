import React, { Component } from 'react';

class Sliderr extends Component {
    render() {
        return (
            <div
                id="carouselExampleFade"
                className="carousel slide carousel-fade"
                data-ride="carousel"
                style={{
                    margin: '20px auto',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
                    maxWidth: '1200px',
                }}
            >
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img
                            className="d-block w-100"
                            src="https://phukienpico.com/wp-content/uploads/2020/12/banner-website-1-1024x379.jpg"
                            alt="First slide"
                            style={{
                                height: '400px',
                                objectFit: 'cover',
                                objectPosition: 'center',
                            }}
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            className="d-block w-100"
                            src="https://file.hstatic.net/1000063620/file/artboard_21_2x-8_51d3257accf544ab81f243732d7862a2_grande.png"
                            alt="Second slide"
                            style={{
                                height: '400px',
                                objectFit: 'cover',
                                objectPosition: 'center',
                            }}
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            className="d-block w-100"
                            src="https://www.phucanh.vn/media/news/0612_KMSieusaleT12.jpg"
                            alt="Third slide"
                            style={{
                                height: '400px',
                                objectFit: 'cover',
                                objectPosition: 'center',
                            }}
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            className="d-block w-100"
                            src="https://olymstore.net/storage/21.11.2023/Olymstore%20001531%20(2).jpg"
                            alt="Fourth slide"
                            style={{
                                height: '400px',
                                objectFit: 'cover',
                                objectPosition: 'center',
                            }}
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            className="d-block w-100"
                            src="https://cdn.nguyenkimmall.com/images/detailed/820/san-sale-macbook-gia-hoi-back-to-school-2022-thumbnail.png"
                            alt="Fifth slide"
                            style={{
                                height: '400px',
                                objectFit: 'cover',
                                objectPosition: 'center',
                            }}
                        />
                    </div>
                </div>

                {/* Nút điều hướng */}
                <a
                    className="carousel-control-prev"
                    href="#carouselExampleFade"
                    role="button"
                    data-slide="prev"
                    style={{
                        filter: 'brightness(0.9)',
                    }}
                >
                    <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                        style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            borderRadius: '50%',
                            padding: '10px',
                            width: '40px',
                            height: '40px',
                        }}
                    />
                    <span className="sr-only">Previous</span>
                </a>
                <a
                    className="carousel-control-next"
                    href="#carouselExampleFade"
                    role="button"
                    data-slide="next"
                    style={{
                        filter: 'brightness(0.9)',
                    }}
                >
                    <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                        style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            borderRadius: '50%',
                            padding: '10px',
                            width: '40px',
                            height: '40px',
                        }}
                    />
                    <span className="sr-only">Next</span>
                </a>
            </div>
        );
    }
}

export default Sliderr;
