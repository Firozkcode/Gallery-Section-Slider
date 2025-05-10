function openOverlay(img) {
    const overlay = document.getElementById('imageOverlay');
    const overlayImg = document.getElementById('overlayImage');
    
    // Get the clicked image's position and dimensions
    const rect = img.getBoundingClientRect();
    
    // Set initial position and size of overlay image to match clicked image
    overlayImg.style.position = 'fixed';
    overlayImg.style.top = rect.top + 'px';
    overlayImg.style.left = rect.left + 'px';
    overlayImg.style.width = rect.width + 'px';
    overlayImg.style.height = rect.height + 'px';
    overlayImg.style.transition = 'all 0.3s ease-in-out';
    overlayImg.style.transformOrigin = 'center';
    overlayImg.style.transform = 'scale(1)';
    overlayImg.style.opacity = '0';

    // Get all gallery images
    const galleryImages = document.querySelectorAll('.gallery-imgs img');
    // Find index of clicked image
    let currentImageIndex = Array.from(galleryImages).findIndex(image => image.src === img.src);
    

    // Add navigation buttons if they don't exist
    if (!document.getElementById('prevBtn')) {
        const prevBtn = document.createElement('button');
        prevBtn.id = 'prevBtn';
        prevBtn.innerHTML = '&#10094;'; // Left arrow
        prevBtn.className = 'nav-btn prev-btn';
        prevBtn.onclick = (e) => {
            e.stopPropagation();
            currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
            overlayImg.src = galleryImages[currentImageIndex].src;
        };
        overlay.appendChild(prevBtn);
    }
    
    if (!document.getElementById('nextBtn')) {
        const nextBtn = document.createElement('button');
        nextBtn.id = 'nextBtn';
        nextBtn.innerHTML = '&#10095;'; // Right arrow
        nextBtn.className = 'nav-btn next-btn';
        nextBtn.onclick = (e) => {
            e.stopPropagation();
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
            overlayImg.src = galleryImages[currentImageIndex].src;
        };
        overlay.appendChild(nextBtn);
    }

    // Start slideshow interval
    // window.sliderInterval = setInterval(() => {
    //     // Update image in slideshow
    //     currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    //     overlayImg.src = galleryImages[currentImageIndex].src;
    // }, 3000);
    
    // Force browser reflow to ensure initial state is set
    overlayImg.offsetHeight;
    
    // Set final state for zoom animation
    overlayImg.style.opacity = '1';
    overlayImg.style.transform = 'scale(1.5)';
    overlay.style.display = 'block';
    overlayImg.src = img.src;
    document.body.style.overflow = 'hidden';
    
    // Trigger animation to final centered position after a brief delay
    setTimeout(() => {
        overlayImg.style.position = 'absolute';
        overlayImg.style.top = '50%';
        overlayImg.style.left = '50%';
        overlayImg.style.width = '90%';
        overlayImg.style.height = 'auto';
        overlayImg.style.transform = 'translate(-50%, -50%)';
    }, 50);
}

function closeOverlay() {
    const overlay = document.getElementById('imageOverlay');
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Close overlay when pressing Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeOverlay();
    }
}); 
