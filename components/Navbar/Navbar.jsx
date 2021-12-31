import { useState } from 'react';
import Menubar from './Menubar';
import NavLinks from './NavLinks';

export default function Navbar() {
	const [hidden, setHidden] = useState(1);
	return (
		<>
			<div className="top-0 w-screen border-b fixed h-16 z-50 outer-cover navbar-bg transition-all duration-300"></div>
			<nav className="h-16 fixed top-0 w-full flex items-center justify-center lg:justify-between px-12 shadow-lg z-50 transition-all duration-300">
				<div className="text-[2.25rem] font-bold text-gray-200 tracking-wider dancing cursor-pointer">
					hevently
				</div>
				<NavLinks hidden={hidden} setHidden={setHidden}/>
				<Menubar hidden={hidden} click={() => setHidden(!hidden)} />
			</nav>
		</>
	);
}
