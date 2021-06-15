import React, { useEffect, useState } from 'react'
import './ScrollableTabs.css'

const ScrollableTabs = (props) => {
    const {children, handleAdd} = props

    const [currentIndex, setCurrentIndex] = useState(0)
    const [length, setLength] = useState(children.length)
    const [touchPosition, setTouchPosition] = useState(null)

    useEffect(() => {
        setLength(children.length)
    }, [children])

    const next = () => {
        if (currentIndex < (length - 3)) {
            setCurrentIndex(prevState => prevState + 1)
        }

    }

    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevState => prevState - 1)
        }

    }

    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX
        setTouchPosition(touchDown)
    }

    const handleTouchMove = (e) => {
        const touchDown = touchPosition

        if(touchDown === null) {
            return
        }

        const currentTouch = e.touches[0].clientX
        const diff = touchDown - currentTouch

        if (diff > 5) {
            next()
        }

        if (diff < -5) {
            prev()
        }

        setTouchPosition(null)
    }

    return (
        <div className="carousel-container">
            <div className="carousel-wrapper">
                {
                    currentIndex > 0 &&
                    <button onClick={prev} className="left-arrow">
                        &lt;
                    </button>
                }
                <div
                    className="carousel-content-wrapper"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                >
                    <div
                        className={`carousel-content size-3`}
                        style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
                    >
                        {children}
                    </div>
                </div>
                {
                    currentIndex < (length - 3) &&
                    <button onClick={next} className="right-arrow">
                        &gt;
                    </button>
                }
                <button 
                    type="button" 
                    disabled={children.length === 10}
                    className="add-button" 
                    onClick={() => handleAdd()}>+
                </button>
            </div>
            
        </div>
    )
}

export default ScrollableTabs