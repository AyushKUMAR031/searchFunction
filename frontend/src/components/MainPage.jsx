import React, { useEffect, useState } from 'react';
import { RiSearch2Line, RiCloseLine } from 'react-icons/ri'; 
import TrackVisibility from "react-on-screen";
import headerImg from "../assets/Img/header-img.svg";
import contactImg from "../assets/Img/contact-img.svg";
import { Container, Row } from "react-bootstrap";
import 'animate.css'; 
import './MainPage.css';

function MainPage() {
    const [showSearch, setShowSearch] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(100 - Math.random() * 50);  
    const [loopNum, setLoopNum] = useState(0);
    const toRotate = [ " your Query", " and Get The Response." ];
    const period = 1500; 

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => { clearInterval(ticker) };
    }, [text, delta]);

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting
            ? fullText.substring(0, text.length - 1)
            : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta(prevDelta => prevDelta / 2); 
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setDelta(period);  
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(100); 
        }
    };

    const toggleSearch = () => {
        setShowSearch(prevState => !prevState);
    };

    return (
        <div className="main-page">
            <TrackVisibility>
                {({ isVisible }) =>
                    <div
                        className={`background-image ${isVisible ? "animate__animated animate__zoomIn" : ""}`}
                        style={{ backgroundImage: `url(${contactImg})` }}
                    ></div>
                }
            </TrackVisibility>
            <Container className="container">

                <Row>
                    <TrackVisibility>
                        {({ isVisible }) =>
                        <div className="banner">
                            <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                            <span className="tagline">Welcome To The SearchBox</span>
                            <h1>{`Hi! There - Type`} 
                                <span className="txt-rotate">
                                <span className="wrap">{text}</span>
                                </span>
                            </h1>
                            <button onClick={() => window.open('https://github.com/AyushKUMAR031', '_blank')}>Lets Connect </button>
                            </div>
                        </div>   
                        }
                    </TrackVisibility>
                </Row>

                <Row className="form-container">
                    <h2>{`Search Here...`}</h2>
                    <form 
                        action="https://www.google.com/search" 
                        className={`search ${showSearch ? 'show-search' : ''}`} >
                        <input type="search"  placeholder="Type something..." name="q" className="search__input" />
                        <div className="search__button" onClick={toggleSearch}>
                            {showSearch ? (
                                
                                <RiCloseLine className="ri-close-line search__close" />
                            ) : (
                                <RiSearch2Line className="ri-search-2-line search__icon" />
                            )}
                        </div>
                    </form>
                </Row>
            </Container>
        </div>
    );
}

export default MainPage;
