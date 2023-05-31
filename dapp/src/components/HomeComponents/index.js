
import SignUp from "./SignUp";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import React, { useState, useEffect } from 'react';
import { debounce } from '../../utilities/helpers.js';

import {useRef} from 'react';


function Title() {
    return (
        <div>
            <div className="title_main">PROJECT 
            <img src="../logo_name.png" alt="logo name" className="mb-4 mx-4 logo_name_nav2"/></div>
            <h6 className="text_sub mt-3">
                The Use of Smart-Contracts to Help Reduce
                Royalty Issues in the Local Music Industry
            </h6>
        </div>
    );
}

function About() {
    return (
        <div className="mx-0 px-0 about_con" id="about">
            <img src="../tina_logo.png" alt="logo" className="logo"/>
            <div className="pt-4 title_submain">About the project</div>
        </div>
        
    );
}

function Team() {
    return (
        <div className="mx-0 px-0 team_con">
            <div class="custom-shape-divider-top-1681106908">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
                    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
                    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
                </svg>
            </div>
            <div className="pt-5 title_submain top_z">Team</div>
        </div>
        
    );
}

function Home() {

    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    const handleScroll = debounce(() => {
        const currentScrollPos = window.pageYOffset;

        setVisible((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 30) || currentScrollPos < 10);

        setPrevScrollPos(currentScrollPos);
    }, 100);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);

    }, [prevScrollPos, visible, handleScroll]);

    const aboutSection = useRef(null);
    const teamSection = useRef(null);

    const scrollDown = (ref) => {
        window.scrollTo({
          top: ref.current.offsetTop,
          behavior: 'smooth',
        });
      };
      

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" variant="dark" className="navbar_con top_z"
                style={{ top: visible ? '0' : '-100px' }}>
                <Container>
                    <Navbar.Brand href="#home">
                        <img src="../tina_logo.png" alt="logo" className="logo_nav" />
                        <img src="../logo_name.png" alt="logo name" className="logo_name_nav"/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                        </Nav>
                        <Nav>
                            <Nav.Link className="text_white" onClick={() => scrollDown(aboutSection)}>About</Nav.Link>
                            <Nav.Link  className="text_white" onClick={() => scrollDown(teamSection)}>Team</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="img_con">
                {/*LOGIN <Link to="/Home"> Home</Link>*/}
                <div className="row m-0 p-0">
                    <div className="col title_con">
                        <Title />
                    </div>
                    <div className="col login_con">
                        <div className="selectrole_box">
                            <SignUp />
                        </div>
                    </div>
                </div>
                <div class="custom-shape-divider-bottom-1681105057">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
                        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
                        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
                    </svg>
                </div>
            </div>
            <div ref={aboutSection}></div>
            <About />
            <div ref={teamSection}></div>
            <Team />
            
        </div>
        
    );
}

export default Home;