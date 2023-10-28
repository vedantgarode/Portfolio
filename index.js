// script.js
const outerElements = document.querySelectorAll('.outer');

outerElements.forEach((outer) => {
    let gradientPercentage = 0;
    let direction = 1; // 1 for forward, -1 for backward

    function changeGradient() {
        const yellowHue = 60; // Hue for yellow
        const redHue = 0;    // Hue for red

        const color1 = `hsla(${yellowHue + gradientPercentage}, 100%, 50%, 0.7)`; // Yellow to red
        const color2 = `hsla(${yellowHue + gradientPercentage + 60}, 100%, 50%, 0.7)`; // Yellow to red
        const gradient = `linear-gradient(to right, ${color1}, ${color2})`;
        outer.style.backgroundImage = gradient;

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
menuToggle.addEventListener('click', () => {
    menuItems.classList.toggle('show');
});
