// Function to show a section and hide all others
function showSection(sectionId) {
    // 1. Hide all sections
    const allSections = document.querySelectorAll('main section');
    allSections.forEach((section) => {
        // We use the 'hidden' attribute as requested for simplicity
        section.hidden = true; 
    });

    // 2. Show the active section
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.hidden = false;
    }

    // 3. Update active state in the navbar for better UX
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach((link) => {
        link.classList.remove('nav-active');
    });
    const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('nav-active');
    }
}

// ** THIS IS THE LOGIC TO MAKE THE 'WHAT' PAGE LOAD FIRST (section2) **
// FIX: The zero-argument arrow function here already uses correct '()'
document.addEventListener('DOMContentLoaded', () => { 
    // Check for a specific section ID in the URL hash (e.g., /#section3)
    const hash = window.location.hash.substring(1);
    
    // Set the default section to 'section2' (What)
    const defaultSectionId = 'section2'; 
    
    if (hash && document.getElementById(hash)) {
        // If a valid hash exists, show that section
        showSection(hash);
    } else {
        // If no hash, or invalid hash, show the default 'what' section
        showSection(defaultSectionId);
    }
});

