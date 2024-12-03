import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Phone, Email, Share } from "@mui/icons-material";
import { Instagram, Facebook, Telegram, YouTube } from "@mui/icons-material";
import { FaTiktok, FaMapMarkerAlt, FaSnapchat } from "react-icons/fa";
import { WhatsApp } from "@mui/icons-material";
import "./ProfileCard.css";  // Ensure you have this CSS file
import { Language as LanguageIcon } from "@mui/icons-material";

function Profile() {
    const { profileName } = useParams();  // Read profileName from the URL
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (profileName) {
            console.log('Profile Name:', profileName); // Log the profile name
            const fetchProfile = async () => {
                try {
                    console.log(profileName); // تحقق من قيمة profileName
                    const response = await fetch(`https://front-z982.onrender.com/${profileName}`);
                    const text = await response.text(); // Read the response as text
                    console.log(text);  // Log the raw response (HTML or JSON)

                    if (response.ok) {
                        const data = JSON.parse(text); // Parse the text as JSON
                        setProfile(data);
                    } else {
                        console.error("Profile not found");
                    }
                } catch (error) {
                    console.error("Error fetching profile:", error);
                }
            };
            fetchProfile();
        }
    }, [profileName]);

    const socialIcons = {
        website: <LanguageIcon sx={{ color: "inherit" }} />,  // Add the website icon here
        instagram: <Instagram sx={{ color: "#E1306C" }} />,
        facebook: <Facebook sx={{ color: "#1877F2" }} />,
        tiktok: <FaTiktok style={{ color: "#000000" }} />,
        telegram: <Telegram sx={{ color: "#0088cc" }} />,
        youtube: <YouTube sx={{ color: "#FF0000" }} />,
        whatsapp: <WhatsApp sx={{ color: "#25D366" }} />,
        maps: <FaMapMarkerAlt style={{ color: "#4285F4" }} />,
        snapchat: <FaSnapchat style={{ color: "#FFFC00" }} />,
    };

    const generateVCF = () => {
        const vCard = `
BEGIN:VCARD
VERSION:3.0
FN:${profile?.name || "Your Name"}
TEL:${profile?.phone || "Your Phone"}
EMAIL:${profile?.email || "Your Email"}
END:VCARD
        `;
        const blob = new Blob([vCard], { type: "text/vcard" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${profile?.name || "profile"}.vcf`;
        link.click();
    };

    return (
        <div>
            <div className="profile-card">
                <div className="header-image">
                    <img
                        src={profile?.headerImage || "https://via.placeholder.com/800x200"}
                        alt="Header"
                        className="header-img"
                    />
                </div>

                <div className="profile-header">
                    <img
                        src={profile?.profileImage || "https://via.placeholder.com/120"}
                        alt="profile"
                        className="profile-image"
                    />
                    <h2>{profile?.name || "Your Name"}</h2>
                    <p>{profile?.jobTitle || "Your Job Title"}</p>
                </div>

                {/* Actions: Phone, Email, Share */}
                <div className="profile-actions">
                    <button className="action-button">
                        <a href={`tel:${profile?.phone}`} style={{ color: 'inherit' }}>
                            <Phone sx={{ color: "inherit" }} />
                        </a>
                    </button>

                    <button className="action-button">
                        <a href={`mailto:${profile?.email}`} style={{ color: 'inherit' }}>
                            <Email sx={{ color: "inherit" }} />
                        </a>
                    </button>

                    <button
                        className="action-button"
                        onClick={() => {
                            const currentUrl = window.location.href; // Get the current page URL
                            navigator.clipboard.writeText(currentUrl) // Copy the URL to the clipboard
                                .then(() => {
                                    alert("URL copied to clipboard!"); // Notify the user
                                })
                                .catch((err) => {
                                    console.error("Failed to copy URL: ", err); // Handle error if any
                                    alert("Failed to copy URL!");
                                });
                        }}
                    >
                        <Share sx={{ color: "inherit" }} />
                    </button>
                </div>

                <button onClick={generateVCF} className="vcf-button">
                    Download VCF
                </button>

                {/* Social Links with Icons */}
                <div className="social-links">
                    {profile?.socialLinks && Object.entries(profile.socialLinks).map(([key, url]) => (
                        url ? (
                            <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="social-icon">
                                {socialIcons[key]}
                                <p>{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                            </a>
                        ) : null
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Profile;
