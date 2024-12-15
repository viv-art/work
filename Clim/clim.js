const cursor = document.getElementById('cursor');

// Listen for mouse movement
document.addEventListener('mousemove', (e) => {
    // Move the cursor element to follow the mouse
    const mouseX = e.pageX;
    const mouseY = e.pageY;

    cursor.style.left = `${mouseX - cursor.offsetWidth / 2}px`; // Center the cursor
    cursor.style.top = `${mouseY - cursor.offsetHeight / 2}px`;

    // Change color based on mouse position
    const red = Math.round((mouseX / window.innerWidth) * 255);
    const pink = Math.round((mouseY / window.innerHeight) * 255);
    const blue = 255 - red;

    // Update cursor color dynamically
    cursor.style.backgroundColor = `rgb(${red}, ${pink}, ${blue})`;
});


const accordionItems = document.querySelectorAll('.value--accordion-item')

accordionItems.forEach((item) => {
    const accordionHeader = item.querySelector('.value--accordion-header')

    accordionHeader.addEventListener('click', () => {
        const openItem = document.querySelector('.accordion-open')

        toggleItem(item)

        if (openItem && openItem !== item) {
            toggleItem(openItem)
        }
    })
})

const toggleItem = (item) => {
    const accordionContent = item.querySelector('.value--accordion-content')

    if (item.classList.contains('accordion-open')) {
        accordionContent.removeAttribute('style')
        item.classList.remove('accordion-open')
    } else {
        accordionContent.style.height = accordionContent.scrollHeight + 'px'
        item.classList.add('accordion-open');
        const offset = 90; // Adjust the offset value as needed (e.g., 50px space)
        const itemTop = item.getBoundingClientRect().top + window.scrollY;

        window.scrollTo({
            top: itemTop - offset,
            behavior: 'smooth' // Smooth scrolling animation
        });
    }
};




let lastScrollTop = 0;
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');

// Detect scroll event to show/hide navbar and hamburger
window.addEventListener('scroll', function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop === 0) {
        // User is at the top of the page
        navbar.classList.remove('nav-hide'); // Show navbar
        navbar.classList.remove('nav-small');
        hamburger.classList.remove('show'); // Hide hamburger
    } else if (scrollTop > lastScrollTop) {
        // Scrolling down
        navbar.classList.add('nav-hide'); // Hide navbar
        navbar.classList.add('nav-small');
        hamburger.classList.add('show'); // Show hamburger
    } else {
        // Scrolling up
        navbar.classList.add('nav-hide'); // Show navbar
        navbar.classList.add('nav-small');
        hamburger.classList.add('show'); // Keep hamburger visible
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Prevent negative scroll values
});
function toggleDropdown() {
    dropdownMenu.classList.toggle('show');
}
// Close the dropdown menu when clicked anywhere inside the dropdown
function closeDropdown(event) {
    // Prevents the click from propagating to the dropdown itself
    if (event.target === dropdownMenu) {
        dropdownMenu.classList.remove('show');
    }
}

const button = document.querySelector('.animated-button');

// Create an IntersectionObserver to detect when the button is in view
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // If the button is in view, remove the 'hidden' class
            button.classList.remove('hidden');
        } else {
            // If the button is out of view, add the 'hidden' class
            button.classList.add('hidden');
        }
    });
}, {
    threshold: 0.5 // When at least 50% of the button is in view
});

// Start observing the button
observer.observe(button);


const myUniqueButton = document.querySelector('.animated-button1');
const myUniqueVideoCon = document.querySelector('.video-con');

// Unique personalized variable for drag state
let isMyVideoDragging = false;
let startX, scrollLeft;

// Show the button when the mouse enters the video container
myUniqueVideoCon.addEventListener('mouseenter', () => {
    myUniqueButton.style.display = 'block'; // Show the button
});

// Hide the button when the mouse leaves the video container
myUniqueVideoCon.addEventListener('mouseleave', () => {
    myUniqueButton.style.display = 'none'; // Hide the button
});

// Move the button to follow the cursor inside the video container
myUniqueVideoCon.addEventListener('mousemove', (event) => {
    if (isMyVideoDragging) return; // Do not move the button while dragging

    const containerRect = myUniqueVideoCon.getBoundingClientRect();
    const cursorX = event.clientX - containerRect.left;
    const cursorY = event.clientY - containerRect.top;

    const buttonWidth = myUniqueButton.offsetWidth;
    const buttonHeight = myUniqueButton.offsetHeight;

    // Position the button at the cursor while staying within the container bounds
    const maxX = containerRect.width - buttonWidth;
    const maxY = containerRect.height - buttonHeight;

    // Keep the button within the container, even when scrolling
    const newX = Math.min(Math.max(cursorX - buttonWidth / 2, 0), maxX);
    const newY = Math.min(Math.max(cursorY - buttonHeight / 2, 0), maxY);

    myUniqueButton.style.left = `${newX + myUniqueVideoCon.scrollLeft}px`; // Account for scroll position
    myUniqueButton.style.top = `${newY + myUniqueVideoCon.scrollTop}px`; // Account for scroll position
});

// Drag-to-Scroll functionality for video container
myUniqueVideoCon.addEventListener('mousedown', (event) => {
    isMyVideoDragging = true;
    startX = event.pageX - myUniqueVideoCon.offsetLeft;
    scrollLeft = myUniqueVideoCon.scrollLeft;
    myUniqueVideoCon.style.cursor = 'grabbing'; // Change cursor style
});

myUniqueVideoCon.addEventListener('mousemove', (event) => {
    if (!isMyVideoDragging) return;

    event.preventDefault();
    const x = event.pageX - myUniqueVideoCon.offsetLeft;
    const walk = x - startX; // Distance dragged
    myUniqueVideoCon.scrollLeft = scrollLeft - walk;
});

myUniqueVideoCon.addEventListener('mouseup', () => {
    isMyVideoDragging = false;
    myUniqueVideoCon.style.cursor = 'default'; // Reset cursor style
});

myUniqueVideoCon.addEventListener('mouseleave', () => {
    isMyVideoDragging = false;
    myUniqueVideoCon.style.cursor = 'default'; // Reset cursor style
});




const customCarousel = document.querySelector('.carousel');
const customCarouselTrack = document.querySelector('.carousel-track');
const customCarouselButton = document.querySelector('.custom-carousel-button'); // Unique class for the button

let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;
let autoScrollInterval;

// Ensure the button starts as hidden
customCarouselButton.style.display = 'none';

// Show the button when the mouse enters the carousel
customCarousel.addEventListener('mouseenter', () => {
    customCarouselButton.style.display = 'block';  // Show the button
    stopAutoScroll();
});

// Hide the button when the mouse leaves the carousel
customCarousel.addEventListener('mouseleave', () => {
    customCarouselButton.style.display = 'none';  // Hide the button
    startAutoScroll();
});

// Move the button to follow the cursor inside the carousel (directly under the cursor)
customCarousel.addEventListener('mousemove', (event) => {
    const containerRect = customCarousel.getBoundingClientRect(); // Get the carousel container's position
    const cursorX = event.clientX - containerRect.left; // Get the cursor X position relative to the carousel container
    const cursorY = event.clientY - containerRect.top; // Get the cursor Y position relative to the carousel container

    const buttonWidth = customCarouselButton.offsetWidth;
    const buttonHeight = customCarouselButton.offsetHeight;

    const maxX = containerRect.width - buttonWidth; // Max X position for the button within the container
    const maxY = containerRect.height - buttonHeight; // Max Y position for the button within the container

    // Position the button directly under the cursor
    const newX = Math.min(Math.max(cursorX - buttonWidth / 2, 0), maxX); // Horizontally center the button under the cursor
    const newY = Math.min(Math.max(cursorY + buttonHeight / 2, 0), maxY); // Vertically place the button below the cursor

    customCarouselButton.style.left = `${newX}px`; // Set button X position
    customCarouselButton.style.top = `${newY}px`; // Set button Y position
});

// Function to start auto-scrolling
function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
        currentTranslate -= 0.2;  // Slow down the scrolling
        if (Math.abs(currentTranslate) >= customCarouselTrack.scrollWidth - customCarousel.offsetWidth) {
            currentTranslate = 0;
        }
        customCarouselTrack.style.transform = `translateX(${currentTranslate}px)`;
    }, 50); // Adjust interval for slower movement
}

// Function to stop auto-scrolling
function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

// Event listeners for carousel interaction
customCarousel.addEventListener('mousedown', startDrag);
customCarousel.addEventListener('mousemove', dragging);
customCarousel.addEventListener('mouseup', endDrag);
customCarousel.addEventListener('mouseleave', endDrag);

customCarousel.addEventListener('touchstart', startDrag);
customCarousel.addEventListener('touchmove', dragging);
customCarousel.addEventListener('touchend', endDrag);

// Function to start dragging
function startDrag(e) {
    isDragging = true;
    startPos = getPositionX(e);
    prevTranslate = currentTranslate;
    cancelAnimationFrame(animationID);
    stopAutoScroll();
}

// Function to handle dragging
function dragging(e) {
    if (!isDragging) return;
    const currentPos = getPositionX(e);
    let movement = (currentPos - startPos) * 0.3;  // Slow down dragging
    currentTranslate = prevTranslate + movement;

    // Round the translate value for smoother animation
    currentTranslate = Math.round(currentTranslate);

    customCarouselTrack.style.transform = `translateX(${currentTranslate}px)`;
    animationID = requestAnimationFrame(dragging); // Smooth dragging with requestAnimationFrame
}

// Function to stop dragging
function endDrag() {
    isDragging = false;
    startAutoScroll();
}

// Get position of mouse or touch event
function getPositionX(e) {
    return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
}

// Start auto-scroll on page load
startAutoScroll();

const gridContainer = document.getElementById('grid-container');
const imageItem = document.getElementById('image-item');

window.addEventListener('scroll', () => {
    const containerTop = gridContainer.offsetTop;
    const containerBottom = gridContainer.offsetTop + gridContainer.offsetHeight;
    const scrollY = window.scrollY + window.innerHeight;

    if (scrollY > containerBottom) {
        // Image moves with the page after scrolling past the grid-container
        imageItem.style.position = "relative";
        imageItem.style.top = "0";
    } else if (scrollY > containerTop) {
        // Image sticks while text scrolls
        imageItem.style.position = "sticky";
        imageItem.style.top = "250px";
    }
});

document.addEventListener("DOMContentLoaded", function () {
    let preloader = document.getElementById("preloader");
    let phase1 = document.getElementById("phase1");
    let phase2 = document.getElementById("phase2");
    let phase3 = document.getElementById("phase3");
    let content = document.getElementById("content");

    // Disable scrolling during preloader
    document.body.style.overflow = "hidden";

    // Phase 1: Show Phase 1
    setTimeout(() => {
        phase1.style.opacity = 1;
    }, 100);

    // Phase 2: Show Phase 2 after Phase 1
    setTimeout(() => {
        phase1.style.opacity = 0;
        phase2.style.opacity = 1;
    }, 800);

    // Phase 3: Show Phase 3 after Phase 2
    setTimeout(() => {
        phase2.style.opacity = 0;
        phase3.style.opacity = 1;
    }, 1400);

    // Finish: Hide preloader and show content after Phase 3
    setTimeout(() => {
        phase3.style.opacity = 0;
        preloader.style.display = "none";
        content.style.display = "block";

        // Enable scrolling
        document.body.style.overflow = "auto";
    }, 7000);
});


window.onload = function () {
    // First movement: Staggered upward animation
    setTimeout(() => {
        const gridItems = document.querySelectorAll('.grid-item');
        gridItems.forEach((item, index) => {
            item.style.animation = `move-up 2s ease-out forwards ${index * 0.2}s`;
        });

        // Delay before transitioning to show the main content
        setTimeout(() => {
            // Second movement: All items move up together off-screen
            gridItems.forEach((item) => {
                item.style.animation = `move-reveal 2s ease-out forwards`;
            });

            // Reveal the main content after the grid transition
            setTimeout(() => {
                document.getElementById('main-content').classList.add('show-content');
            }, 2000); // Wait for the second movement to complete
        }, 3000); // Static delay after the first movement
    }, 1000); // Start staggered animation after initial load delay
};


let isVideoDragging = false; // Personalized variable for dragging state
let videoStartX; // Personalized variable for the starting X position
let initialLeft;
const videoContainero = document.getElementById('video-containero');

// Start dragging
videoContainero.addEventListener('mousedown', (e) => {
    isVideoDragging = true;
    videoStartX = e.clientX;
    initialLeft = videoContainero.getBoundingClientRect().left;
    videoContainero.style.cursor = 'grabbing';
    videoContainero.style.transition = 'none'; // Disable transition while dragging
});

// Drag the video
document.addEventListener('mousemove', (e) => {
    if (!isVideoDragging) return;

    const dx = e.clientX - videoStartX;
    videoContainero.style.left = `${initialLeft + dx}px`;
    videoContainero.style.transform = 'translate(0, -50%)'; // Maintain vertical centering
});

// Stop dragging
document.addEventListener('mouseup', () => {
    isVideoDragging = false;
    videoContainero.style.cursor = 'grab';
});

// Return to center when the cursor leaves the video container
videoContainero.addEventListener('mouseleave', () => {
    if (!isVideoDragging) {
        videoContainero.style.transition = 'all 0.5s ease'; // Smooth transition
        videoContainero.style.left = '50%'; // Center horizontally

        videoContainero.style.transform = 'translateX(-50%)'; // Ensure perfect centering
    }
});