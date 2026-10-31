
import { FaEnvelope, FaLinkedin } from 'react-icons/fa';
export function ContactButton(){
    return (
        <div className="contact-buttons">
            <button className="btn btn-email"> <FaEnvelope /> Email</button>
            <button className="btn btn-linkedin"> <FaLinkedin /> LinkedIn</button>
        </div>
    )
}
