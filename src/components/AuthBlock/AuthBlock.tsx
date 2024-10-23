import React from 'react';
import "./authBlock.scss";

interface IAuthBlockProps { }

const AuthBlock: React.FC = () => {
	return (
		<>
			<div className="authBlock">
				<h1>Авторизация</h1>
				<form className='form'>
					<div>
						<div className='name'>Логин</div>
						<input type="text" />
					</div>
					<div>
						<div className='name'>Пароль</div>
						<input type="text" />
					</div>
					<button className='btn'>Вход</button>
				</form>
			</div>
		</>
	);
};

export default AuthBlock;