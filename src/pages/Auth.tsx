import React from 'react';
import AuthBlock from '../components/AuthBlock/AuthBlock';

interface IAuthProps { }

const Auth: React.FC = () => {


	return (
		<>
			<div className="auth">
				<div className="container">
					<div className="auth__inner">
						<AuthBlock />
					</div>
				</div>
			</div>
		</>
	);
};

export default Auth;