import React, { useEffect } from 'react';
import "./authBlock.scss";
import { useAppDispatch, useAppSelector } from '../../hooks';
import { login, selectToken, selectUser } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { setTokenToLs } from '../../utils/setTokenToLs';

interface IAuthBlockProps {
	setIsHaveAcc: (value: boolean) => void;
}

const AuthBlock: React.FC<IAuthBlockProps> = ({ setIsHaveAcc }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const token = useAppSelector(selectToken);

	const loginUser = async () => {
		await dispatch(login({ username: "testuser123123123", password: "TestPassword123" }))
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
						<input type="text" />
					</div>
					<div>
						<div className='name'>Пароль</div>
						<input type="text" />
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