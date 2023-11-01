const outerElements = document.querySelectorAll('.outer');

outerElements.forEach((outer) => {
    let gradientPercentage = 0;
    let direction = 1; // 1 for forward, -1 for backward

    function changeGradient() {
        const yellowHue = 60; // Hue for yellow
        const color1 = `hsla(${yellowHue + gradientPercentage}, 100%, 50%, 0.7)`; // Yellow to red
        const color2 = `hsla(${yellowHue + gradientPercentage + 60}, 100%, 50%, 0.7)`; // Yellow to red
        const gradient = `linear-gradient(to right, ${color1}, ${color2})`;

        // Set the background image to the gradient
        outer.style.backgroundImage = gradient;

        // Calculate the box-shadow color dynamically
        const glowColor = `hsla(${yellowHue + gradientPercentage}, 100%, 50%, 0.7)`;
        outer.style.boxShadow = `0 0 20px ${glowColor}`;

        // Apply blur filter using a CSS rule
        const blurFilterRule = `backdrop-filter: blur(50px);`; // Adjust the blur amount as needed
        outer.style.cssText += blurFilterRule;

        gradientPercentage += direction;

        // Check if we've reached the end
        if (gradientPercentage >= 300 || gradientPercentage <= 0) {
            direction *= -1; // Reverse direction at the end
        }
    }

    setInterval(changeGradient, 20); // Change gradient every 20 milliseconds for each div
});




const menuToggle = document.getElementById('menu-toggle');
const menuItems = document.querySelector('.menu-items');
const menuLinks = menuItems.querySelectorAll('a'); // Get all menu links

let isMenuOpen = false;

menuToggle.addEventListener('click', () => {
    if (isMenuOpen) {
        menuItems.classList.remove('show');
    } else {
        menuItems.classList.add('show');
    }
    isMenuOpen = !isMenuOpen;
});

// Add event listeners to menu links
menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
        // Close the menu
        menuItems.classList.remove('show');
        isMenuOpen = false;
    });
});




document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const offset = targetElement.getBoundingClientRect().top - (window.innerHeight / 5);
            window.scrollTo({
                top: window.scrollY + offset,
                behavior: 'smooth'
            });
        }
    });
});



