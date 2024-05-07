import { useRef } from "react";
import { FaBars, FaTimes, FaSignInAlt } from "react-icons/fa";
import "../../assets/css/navbar.css";

function Navbar() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

	return (
		<header>
			<h3>Réparation Tunisie</h3>
			<div>
			<nav ref={navRef}>
				<a href="/#accueil">Home</a>
				<a href="/#about">A propos</a>
				<a href="/#services">Services</a>
				<a href="/reparation">Réparation</a>
				<a href="/login">Login</a>
				<a href="/stepper">Stepper</a>

				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<a href="/login"
				className="nav-btn"
				id="logoLogin">
				<FaSignInAlt />
			</a>
			</div>
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
}

export default Navbar;