import React from 'react';
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Shop from './Shop';
import Signup from './Signup';
import Signin from './Signin';
import Chart from './Chart';
import About from './About';
    

const NaviBar = () => {
    

    function handleNavTog() {
        const navToggle = document.querySelector(".nav-toggle");
        const links = document.querySelector(".links");
        navToggle.addEventListener("click", function () {
            links.classList.toggle("show-links");
        });
    }
    

    return (
        <Router>
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
            />

            <nav>
                <div className="nav-center">
                    <div className="nav-header">
                        <Link className="logo" to="/">Logo</Link>
                        <button className="nav-toggle" onClick={handleNavTog}>
                            <i className="fas fa-bars"></i>
                        </button>
                    </div>
                    <ul className="links">
                        <Link className="nav-link" to="/">Home</Link>
                        <Link className="nav-link" to="/About">About</Link>
                        <Link className="nav-link" to="/Signup">SignUp</Link>
                        <Link className="nav-link" to="/Signin">SignIn</Link>
                        <Link className="nav-link" to="/Chart">Chart</Link>
                    </ul>
                    <ul className="social-icons">
                        <li>
                            <a href="" target="_blank">
                                <i className="fab fa-facebook"></i>
                            </a>
                        </li>
                        <li>
                            <a href="" target="_blank">
                                <i className="fab fa-twitter"></i>
                            </a>
                        </li>
                        <li>
                            <a href="" >
                                <i className="fab fa-linkedin"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            
            <Switch>
                <Route exact path="/">
                    <Shop></Shop>
                </Route>
                <Route path="/About">
                    <About></About>
                </Route>
                <Route path="/Signup">
                    <Signup></Signup>
                </Route>
                <Route path="/Signin">
                    <Signin></Signin>
                </Route>
                <Route path="/Chart">
                    <Chart></Chart>
                </Route>
            </Switch>
        </Router>

    );

    
}

export default NaviBar;
