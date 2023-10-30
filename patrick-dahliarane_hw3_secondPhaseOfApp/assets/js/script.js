"use strict";
// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector(
      "[data-testimonials-title]"
    ).innerHTML;
    modalText.innerHTML = this.querySelector(
      "[data-testimonials-text]"
    ).innerHTML;

    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

const form = document.getElementById("userForm");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const firebaseConfig = {
    apiKey: "AIzaSyBdiAFJoJmsDKVVYb4MLkHJpiyF8UzJyXs",
    authDomain: "portfolio-db3ba.firebaseapp.com",
    databaseURL: "https://portfolio-db3ba-default-rtdb.firebaseio.com",
    projectId: "portfolio-db3ba",
    storageBucket: "portfolio-db3ba.appspot.com",
    messagingSenderId: "798674082628",
    appId: "1:798674082628:web:dbabd5f5349cdb349b5511",
    measurementId: "G-RNGLRPDKP9",
  };

  // // Initialize Firebase
  // const app = firebase.initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app); // This line is not needed unless you specifically want to use Firebase Analytics

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const location = document.getElementById("location").value;

  // Get a reference to the Firebase database (Realtime Database)
  const database = app.database();

  // Push the data to the database
  const portfolioRef = database.ref("portfolio");
  portfolioRef.push({
    name: name,
    email: email,
    location: location,
  });

  // Clear the form fields
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("location").value = "";
});

// Function to show the "Thank You" message and hide it after a few seconds
function showThankYou() {
  var thankYouMessage = document.getElementById("thankYouMessage");
  var userForm = document.getElementById("userForm");

  // Show the "Thank You" message
  thankYouMessage.style.display = "block";

  // Clear the form fields
  userForm.reset();

  // Set a timer to hide the message after a few seconds (e.g., 3 seconds)
  setTimeout(function () {
    thankYouMessage.style.display = "none";
  }, 3000); // 3000 milliseconds (3 seconds)
}

// Event listener for form submission
document.getElementById("userForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the default form submission

  // Handle the form submission (you can add additional validation here)
  // For example, you can use AJAX to submit the form data to the server
  // Once the form is successfully submitted, call the showThankYou() function
  // to display the "Thank You" message for a few seconds and clear the form fields.
  showThankYou();
});

// Add scroll animation to the bottom section
window.addEventListener("scroll", function () {
  var bottomContent = document.querySelector(".bottom-content");
  var topPosition = bottomContent.getBoundingClientRect().top;

  if (topPosition < window.innerHeight - 100) {
    bottomContent.classList.add("scrolled");
  }
});

// Sample investment data
const investmentData = {
  labels: ["Stocks", "Bonds", "Other"],
  datasets: [
    {
      label: "Apple",
      data: [5000, 2000, 1000],
      backgroundColor: "rgba(75, 192, 192, 0.6)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
      icon: "fab fa-apple", // Add Font Awesome class for Apple logo
    },
    {
      label: "Meta",
      data: [3000, 1500, 800],
      backgroundColor: "rgba(255, 99, 132, 0.6)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
      icon: "fab fa-facebook", // Add Font Awesome class for Meta (Facebook) logo
    },
    {
      label: "Tesla",
      data: [2000, 1000, 200],
      backgroundColor: "rgba(255, 206, 86, 0.6)",
      borderColor: "rgba(255, 206, 86, 1)",
      borderWidth: 1,
      icon: "fab fa-tesla", // Add Font Awesome class for Tesla logo
    },
  ],
};

// Get the chart canvas element
const chartCanvas = document
  .getElementById("investment-chart")
  .getContext("2d");

// Create a chart using Chart.js
new Chart(chartCanvas, {
  type: "bar",
  data: investmentData,
  options: {
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: "white",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "white",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
      datalabels: {
        display: true,
        color: "white",
        align: "end",
        anchor: "end",
        formatter: (value, context) => {
          return context.dataset.icon
            ? `<i class="${context.dataset.icon}"></i>`
            : "";
        },
      },
    },
  },
});
