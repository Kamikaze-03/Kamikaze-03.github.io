document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll to the #portfolio section
    const scrollDownLink = document.querySelector('.scroll-down');
    if (scrollDownLink) {
      scrollDownLink.addEventListener('click', (event) => {
        event.preventDefault();
        const portfolioSection = document.querySelector('#portfolio');
        if (portfolioSection) {
          portfolioSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  
    // Carousel functionality for images
    // Add/remove file names here if you have more or fewer PNGs
    const images = [
      'assets/pn1.png',
      'assets/pn2.png',
      'assets/pn3.png'
    ];
  
    let currentIndex = 0;
    const carouselImage = document.getElementById('carousel-image');
  
    // Function to show image by index
    function showImage(index) {
      carouselImage.src = images[index];
    }
  
    // Automatically cycle through images every 4 seconds
    setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    }, 4000);
  
    // Show the first image initially
    showImage(currentIndex);
  });