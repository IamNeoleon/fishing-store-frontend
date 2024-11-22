import React, { useEffect, useState } from 'react';
import "./authBlock.scss";
import { useAppDispatch, useAppSelector } from '../../hooks';
import { login, selectToken } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { setTokenToLs } from '../../utils/setTokenToLs';

interface IAuthBlockProps {
	setIsHaveAcc: (value: boolean) => void;
}

const AuthBlock: React.FC<IAuthBlockProps> = ({ setIsHaveAcc }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const token = useAppSelector(selectToken);

	const loginUser = async () => {
		if (username && password) {
			await dispatch(login({ username: username, password: password }))
		} else {
			alert('Введите нужные данные')
		}
	}

	useEffect(() => {
		if (token != null) {
			navigate('/')
			setTokenToLs(token)
		}
	}, [token])

	return (
		<>
			<div className="authBlock">
				<div className='form'>
					<h1>Авторизация</h1>
					<div>
						<div className='name'>Логин</div>
						<input value={username} onChange={(e) => setUsername(e.target.value)} type="text" />
					</div>
					<div>
						<div className='name'>Пароль</div>
						<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
					</div>
					<button className='btn' onClick={loginUser}>Вход</button>
					<div className="authBlock__bottom">
						Нет аккаунта? <span onClick={() => setIsHaveAcc(false)}>Регистрация</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default AuthBlock;