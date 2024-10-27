import React, { useState } from 'react';
import AuthBlock from '../components/AuthBlock/AuthBlock';
import RegisterBlock from '../components/RegisterBlock/RegisterBlock';
import { useAppDispatch } from '../hooks';

interface IAuthProps { }

const Auth: React.FC = () => {
	const [isHaveAcc, setIsHaveAcc] = useState<boolean>(true);


	return (
		<>
			<div className="auth">
				<div className="container">
					<div className="auth__inner">
						{isHaveAcc ? (
							<AuthBlock setIsHaveAcc={setIsHaveAcc} />
						) : (
							<RegisterBlock setIsHaveAcc={setIsHaveAcc} />
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Auth;