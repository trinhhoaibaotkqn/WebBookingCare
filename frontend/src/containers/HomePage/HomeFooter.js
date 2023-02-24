import { FaFacebookSquare } from 'react-icons/fa';
import { ImYoutube } from 'react-icons/im';

const HomeFooter = () => {
    return (
        <div className="home-footer">
            <div className="footer-content">
                <div className="copyright">&copy;2023 HoaiBaoTrinh</div>
                <div className="social-network">
                    <div className="facebook"><FaFacebookSquare /></div>
                    <div className='youtube'><ImYoutube /></div>
                </div>
            </div>
        </div>
    )
}

export default HomeFooter;