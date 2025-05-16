import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Slider() {
    const navigate = useNavigate();

    return (
        <div className="w-full">
            {/* Carousel */}
            <div className="carousel w-full rounded-xl lg:h-[600px] overflow-hidden">
                {/* Slide 1 */}
                <div id="slide1" className="carousel-item relative w-full">
                    <img
                        src="https://i.ibb.co.com/qDKc59w/istockphoto-1921750831-1024x1024.jpg"
                        className="w-full object-cover"
                    />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide4" className="btn btn-circle">❮</a>
                        <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                </div>

                {/* Slide 2 */}
                <div id="slide2" className="carousel-item relative w-full">
                    <img
                        src="https://i.ibb.co.com/QfrGfYN/istockphoto-593340906-1024x1024.jpg"
                        className="w-full object-cover"
                    />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide1" className="btn btn-circle">❮</a>
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div>

                {/* Slide 3 */}
                <div id="slide3" className="carousel-item relative w-full">
                    <img
                        src="https://i.ibb.co.com/w0JMj4d/istockphoto-464857708-1024x1024.jpg"
                        className="w-full object-cover"
                    />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide2" className="btn btn-circle">❮</a>
                        <a href="#slide4" className="btn btn-circle">❯</a>
                    </div>
                </div>

                {/* Slide 4 */}
                <div id="slide4" className="carousel-item relative w-full">
                    <img
                        src="https://i.ibb.co.com/qDKc59w/istockphoto-1921750831-1024x1024.jpg"
                        className="w-full object-cover"
                    />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide3" className="btn btn-circle">❮</a>
                        <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                </div>
            </div>

            {/* Get Start Button - below the images */}
            <div className="flex justify-center mt-6">
                <button
                    onClick={() => navigate('/marathons')}
                    className="btn text-white py-2 px-6 rounded-md bg-blue-600 hover:bg-blue-700 transition duration-300"
                >
                    Get Start
                </button>
            </div>
        </div>
    )
}
