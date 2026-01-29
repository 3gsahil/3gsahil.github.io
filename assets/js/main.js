const navLinks = document.getElementById('navLinks');
const hamBtn = document.getElementById('hamBtn');

// 1. Module Loader - Added console logging to catch 404s
async function loadModule(id, fileName) {
    const target = document.getElementById(id);
    if (!target) return;
    try {
        const response = await fetch(fileName);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.text();
        target.innerHTML = data;
    } catch (err) {
        console.warn(`File missing: ${fileName}. Ensure it is in the root folder.`);
        target.innerHTML = `<div class="item glass-card liquid-glass"><p>Content for ${id} coming soon.</p></div>`;
    }
}

// 2. Initialize - Using DOMContentLoaded is safer than window.onload
document.addEventListener('DOMContentLoaded', () => {
    loadModule('experience', 'Experience.html');
    loadModule('certifications', 'Certifications.html');
    loadModule('projects', 'Projects.html'); 
    loadModule('music', 'Music.html');
    loadModule('movies', 'Movies.html');
    loadModule('Art', 'Art.html');

    // Apply persistent theme immediately
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }
});

// 3. Theme Toggle
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// 4. Mobile Menu Logic
function toggleMenu(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    navLinks.classList.toggle('open');
    hamBtn.classList.toggle('active'); // Optional: for animating burger to X
}

// Fixed Outside Click Logic
document.addEventListener('click', (e) => {
    // If menu is open AND click is not on the menu AND not on the button
    if (navLinks.classList.contains('open')) {
        const isClickInsideMenu = navLinks.contains(e.target);
        const isClickOnHam = hamBtn.contains(e.target);

        if (!isClickInsideMenu && !isClickOnHam) {
            navLinks.classList.remove('open');
            if(hamBtn) hamBtn.classList.remove('active');
        }
    }
});

// 5. Navigation Logic
function showSection(sectionId) {
    // 1. Close menu first for immediate feedback
    if (navLinks) {
        navLinks.classList.remove('open');
        if(hamBtn) hamBtn.classList.remove('active');
    }

    // 2. Handle scrolling
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 3. Switch Sections
    const sections = document.querySelectorAll('section');
    sections.forEach(sec => sec.classList.remove('active'));
    
    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.add('active');
    }

    // 4. Update Nav Items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        // Robust check: matches innerText or data-section attribute
        if (item.innerText.toLowerCase().trim() === sectionId.toLowerCase()) {
            item.classList.add('active');
        }
    });
}

function handleNavClick(sectionId) {
    showSection(sectionId);
}