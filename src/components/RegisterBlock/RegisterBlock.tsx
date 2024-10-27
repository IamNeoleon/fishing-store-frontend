import React from 'react';

interface IRegisterBlockProps {
    setIsHaveAcc: (value: boolean) => void;
}

const RegisterBlock: React.FC<IRegisterBlockProps> = ({ setIsHaveAcc }) => {
    return (
        <>
            <div className="authBlock">
                <h1>Регистрация</h1>
                <form className='form'>
                    <div>
                        <div className='name'>E-mail:</div>
                        <input type="email" />
                    </div>
                    <div>
                        <div className='name'>Логин:</div>
                        <input type="text" />
                    </div>
                    <div>
                        <div className='name'>Пароль:</div>
                        <input type="text" />
                    </div>
                    <button className='btn'>Регистрация</button>
                </form>
                <div className="authBlock__bottom">
                    Уже есть аккаунт? <span onClick={() => setIsHaveAcc(true)}>Войти</span>
                </div>
            </div>
        </>
    );
};

export default RegisterBlock;