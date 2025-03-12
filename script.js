// Import Firebase modules from the CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCItFRdIz1FyfsR0LZabGdiz_4_kiZDPDU",
  authDomain: "pookie-146f9.firebaseapp.com",
  databaseURL: "https://pookie-146f9-default-rtdb.firebaseio.com",
  projectId: "pookie-146f9",
  storageBucket: "pookie-146f9.firebasestorage.app",
  messagingSenderId: "3887592866",
  appId: "1:3887592866:web:7741cd4ae2542272feeefb"
};

// Initialize Firebase and get a reference to the database
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Simple function to extract a basic device name from the user agent
function getDeviceName() {
  const ua = navigator.userAgent;
  let device = "Desktop";

  if (/mobile/i.test(ua)) {
    if (/android/i.test(ua)) {
      device = "Android";
    } else if (/iphone/i.test(ua)) {
      device = "iPhone";
    } else if (/ipad/i.test(ua)) {
      device = "iPad";
    } else if (/ipod/i.test(ua)) {
      device = "iPod";
    } else {
      device = "Mobile";
    }
  }
  return device;
}

// Function to track visitor stats
function trackVisitor(ipData) {
  const statsRef = ref(database, 'visits');
  const visitData = {
    ip: ipData.ip,
    userAgent: navigator.userAgent,
    device: getDeviceName(),
    timestamp: new Date().toISOString()
  };
  // Push the data to the Firebase Realtime Database
  push(statsRef, visitData)
    .then(() => console.log("Visitor stats saved successfully."))
    .catch((error) => console.error("Error saving visitor stats:", error));
}

// Fetch the visitor's IP address using a free API (ipify)
fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    trackVisitor(data);
  })
  .catch(error => console.error("Failed to fetch IP address:", error));

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
  const images = [
    'assets/pn1.png',
    'assets/pn2.png',
    'assets/pn3.png',
    'assets/pn4.png'
  ];

  let currentIndex = 0;
  const carouselImage = document.getElementById('carousel-image');

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
