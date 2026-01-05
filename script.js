// DOM Elements
const profileCard = document.getElementById('profileCard');
const profileName = document.getElementById('profileName');
const profileTitle = document.getElementById('profileTitle');
const profileBio = document.getElementById('profileBio');
const profileImage = document.getElementById('profileImage');
const contactBtn = document.getElementById('contactBtn');

// Input Elements
const nameInput = document.getElementById('nameInput');
const titleInput = document.getElementById('titleInput');
const bioInput = document.getElementById('bioInput');
const imageInput = document.getElementById('imageInput');
const contactEmail = document.getElementById('contactEmail');

// Color Options
const colorOptions = document.querySelectorAll('.color-option');

// Style Options
const styleButtons = document.querySelectorAll('.style-btn');

// Initialize the profile card with current values
function initializeCard() {
    // Set initial values
    profileName.textContent = nameInput.value;
    profileTitle.textContent = titleInput.value;
    profileBio.textContent = bioInput.value;
    profileImage.src = imageInput.value;
    contactBtn.href = `mailto:${contactEmail.value}`;
    
    // Set active color
    const activeColor = document.querySelector('.color-option.active').getAttribute('data-color');
    updateAccentColor(activeColor);
    
    // Set active style
    const activeStyle = document.querySelector('.style-btn.active').getAttribute('data-style');
    updateCardStyle(activeStyle);
}

// Update accent color
function updateAccentColor(color) {
    // Update CSS custom property
    document.documentElement.style.setProperty('--primary-color', color);
    
    // Calculate darker shade for secondary color
    const darkerColor = adjustColor(color, -30);
    document.documentElement.style.setProperty('--secondary-color', darkerColor);
    
    // Update contact button
    contactBtn.style.backgroundColor = color;
    
    // Update active color indicator
    colorOptions.forEach(option => {
        option.classList.remove('active');
        if (option.getAttribute('data-color') === color) {
            option.classList.add('active');
        }
    });
}

// Update card style
function updateCardStyle(style) {
    // Remove all style classes
    profileCard.classList.remove('default', 'minimal', 'elegant');
    
    // Add selected style class
    profileCard.classList.add(style);
    
    // Update active style button
    styleButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-style') === style) {
            btn.classList.add('active');
        }
    });
}

// Helper function to adjust color brightness
function adjustColor(color, amount) {
    const clamp = (val) => Math.min(Math.max(val, 0), 255);
    
    if (color.startsWith('#')) {
        color = color.slice(1);
        const num = parseInt(color, 16);
        const r = clamp((num >> 16) + amount);
        const g = clamp(((num >> 8) & 0x00FF) + amount);
        const b = clamp((num & 0x0000FF) + amount);
        return `#${(b | (g << 8) | (r << 16)).toString(16).padStart(6, '0')}`;
    }
    return color;
}

// Add animation class to indicate update
function addUpdateAnimation(element) {
    element.classList.add('updated');
    setTimeout(() => {
        element.classList.remove('updated');
    }, 300);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the card
    initializeCard();
    
    // Name input event
    nameInput.addEventListener('input', function() {
        profileName.textContent = this.value;
        addUpdateAnimation(profileName);
    });
    
    // Title input event
    titleInput.addEventListener('input', function() {
        profileTitle.textContent = this.value;
        addUpdateAnimation(profileTitle);
    });
    
    // Bio input event
    bioInput.addEventListener('input', function() {
        profileBio.textContent = this.value;
        addUpdateAnimation(profileBio);
    });
    
    // Image input event
    imageInput.addEventListener('input', function() {
        profileImage.src = this.value;
        addUpdateAnimation(profileImage);
    });
    
    // Contact email input event
    contactEmail.addEventListener('input', function() {
        contactBtn.href = `mailto:${this.value}`;
    });
    
    // Color options events
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            updateAccentColor(color);
            addUpdateAnimation(profileCard);
        });
    });
    
    // Style buttons events
    styleButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const style = this.getAttribute('data-style');
            updateCardStyle(style);
            addUpdateAnimation(profileCard);
        });
    });
    
    // Image error handling
    profileImage.addEventListener('error', function() {
        this.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80';
        imageInput.value = this.src;
    });
});

// Export card as HTML (for advanced use)
function exportCardHTML() {
    const cardHTML = profileCard.outerHTML;
    const styleRules = Array.from(document.styleSheets)
        .filter(sheet => sheet.href === null || sheet.href.includes(window.location.origin))
        .map(sheet => {
            return Array.from(sheet.cssRules || sheet.rules)
                .map(rule => rule.cssText)
                .join('');
        })
        .join('');
    
    const fullHTML = `<!DOCTYPE html>
<html>
<head>
    <style>${styleRules}</style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    ${cardHTML}
</body>
</html>`;
    
    return fullHTML;
}

// Log export function to console for debugging
console.log('To export the card as standalone HTML, call exportCardHTML()');