import React from 'react';
import { Link } from 'react-router-dom';
import './adminHeader.scss';

const AdminHeader: React.FC = () => {
	return (
		<>
			<div className="admin__header header-admin">
				<div className="container">
					<div className="header-admin__inner">
						<div className="header-admin__logo">
							<span>The Reel Deal</span><span>admin</span>
						</div>
						<nav className="header-admin__nav">
							<div className="header-admin__link">
								<Link to='/'>
									К сайту
								</Link>
							</div>
						</nav>
					</div>
				</div>
			</div>
		</>
	);
};

export default AdminHeader;