import React from 'react';
import './footer.scss';

interface IFooterProps { }

const Footer: React.FC<IFooterProps> = () => {
    return (
        <>
            <footer className='footer'>
                <div className="container">
                    <div className="footer__inner">
                        &copy; 2024 The Reel Deal. Все права защищены.
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;