import React from "react";
import { Phone, Email, Share, Home, Instagram, Facebook, Telegram, YouTube, WhatsApp } from '@mui/icons-material'; // Updated icon
import { FaMapMarkerAlt, FaSnapchat, FaTiktok } from 'react-icons/fa'; // Importing new icons from react-icons
import "./ProfileCard.css";

function ProfileCard() {
    return (
        <div className="profile-card">
            {/* Header Image Section */}
            <div className="header-image">
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaOqxwk6qaU-_tKKdBO_5R74f4lEiA8wOW-g&s"
                    alt="Header"
                    className="header-img"
                />
            </div>

            {/* Profile Image and Name */}
            <div className="profile-header">
                <img
                    src="https://www.wilsoncenter.org/sites/default/files/media/images/person/james-person-1.jpg"
                    alt="profile"
                    className="profile-image"
                />
                <h2>Hossam Ashraf</h2>
                <p>Art Director</p>
            </div>

            {/* Call, Email, and Share Buttons */}
            <div className="profile-actions">
                <button className="action-button">
                    <Phone sx={{ color: 'inherit' }} />
                </button>
                <button className="action-button">
                    <Email sx={{ color: 'inherit' }} />
                </button>
                <button className="action-button">
                    <Share sx={{ color: 'inherit' }} />
                </button>
            </div>

            {/* Connect Button */}
            <button className="connect-button">Connect With Me</button>

            {/* Save Contact (vCard) Button */}


            {/* Social Links with Icons */}
            <div className="social-links">
                <div className="social-icon">
                    <Home sx={{ color: 'inherit' }} />
                    <p>Clubhouse</p>
                </div>
                <div className="social-icon">
                    <Instagram sx={{ color: '#E1306C' }} />
                    <p>Instagram</p>
                </div>
                <div className="social-icon">
                    <Facebook sx={{ color: '#1877F2' }} />
                    <p>Facebook</p>
                </div>
                <div className="social-icon">
                    <FaTiktok style={{ color: '#000000' }} />
                    <p>TikTok</p>
                </div>
                <div className="social-icon">
                    <Telegram sx={{ color: '#0088cc' }} />
                    <p>Telegram</p>
                </div>
                <div className="social-icon">
                    <YouTube sx={{ color: '#FF0000' }} />
                    <p>YouTube</p>
                </div>
                <div className="social-icon">
                    <WhatsApp sx={{ color: '#25D366' }} />
                    <p>WhatsApp</p>
                </div>
                <div className="social-icon">
                    <FaMapMarkerAlt style={{ color: '#4285F4' }} />
                    <p>Maps</p>
                </div>
                <div className="social-icon">
                    <FaSnapchat style={{ color: '#FFFC00' }} />
                    <p>Snapchat</p>
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;
