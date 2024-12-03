import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { register, selectAuth, selectToken } from '../../redux/slices/authSlice';

interface IRegisterBlockProps {
    setIsHaveAcc: (value: boolean) => void;
}

const RegisterBlock: React.FC<IRegisterBlockProps> = ({ setIsHaveAcc }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const token = useAppSelector(selectToken);
    const { errorRegistered } = useAppSelector(selectAuth);
    const handleAuth = async () => {
        await dispatch(register({ username, email, password }))

        if (errorRegistered) {
            setIsHaveAcc(true);
        } else {
            alert(errorRegistered);
        }
    }

    return (
        <>
            <div className="authBlock">
                <h1>Регистрация</h1>
                <div className='form'>
                    <div>
                        <div className='name'>E-mail:</div>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                    </div>
                    <div>
                        <div className='name'>Логин:</div>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" />
                    </div>
                    <div>
                        <div className='name'>Пароль:</div>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" />
                    </div>
                    <button onClick={handleAuth} className='btn'>Регистрация</button>
                </div>
                <div className="authBlock__bottom">
                    Уже есть аккаунт? <span onClick={() => setIsHaveAcc(true)}>Войти</span>
                </div>
            </div>
        </>
    );
};

export default RegisterBlock;