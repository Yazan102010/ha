import React, { useState, useEffect } from "react";
import { Phone, Email, Share } from "@mui/icons-material";
import { FaMapMarkerAlt, FaSnapchat, FaTiktok } from "react-icons/fa";
import { Instagram, Facebook, Telegram, YouTube, WhatsApp } from "@mui/icons-material";
import LanguageIcon from '@mui/icons-material/Language'; // For the website icon
import "./ProfileCard.css";

function ProfileDashboard() {
    // State to manage form fields and card data
    const [headerImage, setHeaderImage] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [name, setName] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [socialLinks, setSocialLinks] = useState({
        website: "",
        instagram: "",
        facebook: "",
        tiktok: "",
        telegram: "",
        youtube: "",
        whatsapp: "",
        maps: "",
        snapchat: ""
    });
    const [profileKey, setProfileKey] = useState("");  // State for profile name input
    const [isEditing, setIsEditing] = useState(false);  // Toggle editing state

    // Convert the name to a valid profile key format (e.g., "Yazan Abdo" -> "yazan-abdo")
    const generateProfileKey = (name) => {
        return name.trim().toLowerCase().replace(/\s+/g, '-');
    };

    // Fetch profile when profileKey changes
    useEffect(() => {
        if (profileKey) {
            const fetchProfile = async () => {
                try {
                    const response = await fetch(`https://front-z982.onrender.com/${profileKey}`);
                    if (response.ok) {
                        const data = await response.json();
                        setHeaderImage(data.headerImage);
                        setProfileImage(data.profileImage);
                        setName(data.name);
                        setJobTitle(data.jobTitle);
                        setPhone(data.phone);
                        setEmail(data.email);
                        setSocialLinks(data.socialLinks);
                    } else {
                        console.log("Error fetching profile");
                    }
                } catch (error) {
                    console.error("Error fetching profile:", error);
                }
            };

            fetchProfile();
        }
    }, [profileKey]);

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const profileData = {
            headerImage,
            profileImage,
            name,
            jobTitle,
            phone,
            email,
            socialLinks
        };

        try {
            const response = await fetch("https://front-z982.onrender.com/api/save-profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(profileData),
            });

            if (response.ok) {
                alert("Profile saved successfully!");
                setIsEditing(false);  // Exit editing mode after saving
            } else {
                const errorData = await response.json();
                alert(`Error saving profile: ${errorData.message}`);
            }
        } catch (error) {
            alert("Error saving profile! Please check your connection.");
        }
    };

    // Function to toggle editing mode
    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    // Function to handle "Create New Card" button
    const handleCreateNewCard = () => {
        // Reset fields to prepare for a new card
        setHeaderImage("");
        setProfileImage("");
        setName("");
        setJobTitle("");
        setPhone("");
        setEmail("");
        setSocialLinks({
            website: "",
            instagram: "",
            facebook: "",
            tiktok: "",
            telegram: "",
            youtube: "",
            whatsapp: "",
            maps: "",
            snapchat: ""
        });
        setProfileKey(""); // Clear profile key to ensure it's a new card
        setIsEditing(true);  // Set to editing mode
    };

    // Function to generate VCF file
    const generateVCF = () => {
        const vcfData = `
BEGIN:VCARD
VERSION:3.0
FN:${name}
ORG:${jobTitle}
TEL:${phone}
EMAIL:${email}
URL:${socialLinks.website || ''}
${socialLinks.instagram ? `X-Instagram:${socialLinks.instagram}` : ''}
${socialLinks.facebook ? `X-Facebook:${socialLinks.facebook}` : ''}
${socialLinks.tiktok ? `X-TikTok:${socialLinks.tiktok}` : ''}
${socialLinks.youtube ? `X-YouTube:${socialLinks.youtube}` : ''}
${socialLinks.whatsapp ? `X-WhatsApp:${socialLinks.whatsapp}` : ''}
${socialLinks.maps ? `X-Maps:${socialLinks.maps}` : ''}
${socialLinks.snapchat ? `X-Snapchat:${socialLinks.snapchat}` : ''}
END:VCARD
        `;
        const blob = new Blob([vcfData], { type: 'text/vcard' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${generateProfileKey(name)}.vcf`;
        a.click();
    };

    // Map for social media icons
    const socialIcons = {
        website: <LanguageIcon sx={{ color: "inherit" }} />,
        instagram: <Instagram sx={{ color: "#E1306C" }} />,
        facebook: <Facebook sx={{ color: "#1877F2" }} />,
        tiktok: <FaTiktok style={{ color: "#000000" }} />,
        telegram: <Telegram sx={{ color: "#0088cc" }} />,
        youtube: <YouTube sx={{ color: "#FF0000" }} />,
        whatsapp: <WhatsApp sx={{ color: "#25D366" }} />,
        maps: <FaMapMarkerAlt style={{ color: "#4285F4" }} />,
        snapchat: <FaSnapchat style={{ color: "#FFFC00" }} />,
    };

    return (
        <div className="dashboard">
            <h1>Profile Dashboard</h1>

            {/* Profile Key Input */}
            <label>
                Enter Profile Name (e.g., John Doe):
                <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        setProfileKey(generateProfileKey(e.target.value));  // Update profileKey dynamically
                    }}
                    placeholder="Enter profile name"
                />
            </label>
            <button onClick={() => setProfileKey(generateProfileKey(name))}>Fetch Profile</button>

            {/* Create New Card Button */}
            <button onClick={handleCreateNewCard} className="create-card-button">
                Create New Card
            </button>

            {/* Edit Button */}
            <button onClick={toggleEdit} className="edit-button">
                {isEditing ? "Cancel Edit" : "Edit Profile"}
            </button>

            {/* Form for editing profile */}
            {isEditing ? (
                <form onSubmit={handleSubmit} className="form-container">
                    {/* Header Image Section */}
                    <label>
                        Header Image URL:
                        <input
                            type="text"
                            value={headerImage}
                            onChange={(e) => setHeaderImage(e.target.value)}
                        />
                    </label>

                    {/* Profile Image Section */}
                    <label>
                        Profile Image URL:
                        <input
                            type="text"
                            value={profileImage}
                            onChange={(e) => setProfileImage(e.target.value)}
                        />
                    </label>

                    {/* Name and Job Title */}
                    <label>
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label>
                        Job Title:
                        <input
                            type="text"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                        />
                    </label>

                    {/* Phone and Email */}
                    <label>
                        Phone Number:
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Enter phone number"
                        />
                    </label>

                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                        />
                    </label>

                    {/* Social Media Links */}
                    {Object.keys(socialLinks).map((platform) => (
                        <label key={platform}>
                            {platform.charAt(0).toUpperCase() + platform.slice(1)} URL:
                            <input
                                type="text"
                                value={socialLinks[platform]}
                                onChange={(e) =>
                                    setSocialLinks({ ...socialLinks, [platform]: e.target.value })
                                }
                            />
                        </label>
                    ))}

                    <button type="submit">Save Profile</button>
                </form>
            ) : (
                // Display profile card while not editing
                <div className="profile-card">
                    <div className="header-image">
                        <img
                            src={headerImage || "https://via.placeholder.com/800x200"}
                            alt="Header"
                            className="header-img"
                        />
                    </div>

                    <div className="profile-header">
                        <img
                            src={profileImage || "https://via.placeholder.com/120"}
                            alt="profile"
                            className="profile-image"
                        />
                        <h2>{name || "Your Name"}</h2>
                        <p>{jobTitle || "Your Job Title"}</p>
                    </div>

                    {/* Actions: Phone, Email, Share */}
                    <div className="profile-actions">
                        <button className="action-button">
                            <a href={`tel:${phone}`} style={{ color: 'inherit' }}>
                                <Phone sx={{ color: "inherit" }} />
                            </a>
                        </button>

                        <button className="action-button">
                            <a href={`mailto:${email}`} style={{ color: 'inherit' }}>
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
                        {Object.entries(socialLinks).map(([key, url]) => (
                            url ? (
                                <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="social-icon">
                                    {socialIcons[key]}
                                    <p>{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                                </a>
                            ) : null
                        ))}
                    </div>

                    {/* VCF Download Button */}

                </div>
            )}
        </div>
    );
}

export default ProfileDashboard;
