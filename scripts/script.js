document.addEventListener("DOMContentLoaded", () => {
  const loginContainer = document.getElementById("login-container");
  const signupContainer = document.getElementById("signup-container");
  const plannerContainer = document.getElementById("planner-container");
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const createAccountLink = document.getElementById("create-account-link");
  const loginLink = document.getElementById("login-link");
  const reservationForm = document.getElementById("reservation-form");
  const roomSelect = document.getElementById("room-select");
  const startTimeInput = document.getElementById("start-time");
  const endTimeInput = document.getElementById("end-time");
  const reservationsList = document.getElementById("reservation-items");

  // Define the rooms array
  const rooms = [
    "A300", "A301", "A302", "A303", "A304",
    "A305", "A306", "A307", "A308", "A309",
    "A310", "A311", "A312", "A313", "A314",
    "A315", "A316", "A317", "A318", "A319", "A320"
  ];

  // Populate the room dropdown dynamically
  rooms.forEach(room => {
    const option = document.createElement("option");
    option.value = room;
    option.textContent = room;
    roomSelect.appendChild(option);
  });

  createAccountLink.addEventListener("click", (e) => {
    e.preventDefault();
    loginContainer.style.display = "none";
    signupContainer.style.display = "block";
  });

  loginLink.addEventListener("click", (e) => {
    e.preventDefault();
    signupContainer.style.display = "none";
    loginContainer.style.display = "block";
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Here you would typically send a request to your server to authenticate the user
    console.log("Login attempted with:", { email, password });

    // Simulate successful login
    loginContainer.style.display = "none";
    plannerContainer.style.display = "block";
  });

  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("signup-confirm-password").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Here you would typically send a request to your server to create a new account
    console.log("Account creation attempted with:", { email, password });

    // Simulate successful account creation and login
    signupContainer.style.display = "none";
    plannerContainer.style.display = "block";
  });

  // Load and display reservations for the initially selected room
  roomSelect.addEventListener("change", displayReservations);
  
  reservationForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const selectedRoom = roomSelect.value;
    const startTime = startTimeInput.value;
    const endTime = endTimeInput.value;

    // Validate inputs
    if (!selectedRoom) {
      alert("Please select a room.");
      return;
    }

    if (new Date(`1970-01-01T${endTime}`) <= new Date(`1970-01-01T${startTime}`)) {
      alert("End time must be after start time.");
      return;
    }

    // Load reservations from localStorage for the selected room
    let reservations = JSON.parse(localStorage.getItem(`reservations_${selectedRoom}`)) || [];

    // Check for overlapping reservations
    if (reservations.some((reservation) =>
      !(new Date(`1970-01-01T${endTime}`) <= new Date(`1970-01-01T${reservation.start}`) ||
        new Date(`1970-01-01T${startTime}`) >= new Date(`1970-01-01T${reservation.end}`))
    )) {
      alert("This reservation conflicts with an existing reservation.");
      return;
    }

    // Add reservation for the selected room
    const newReservation = { start: startTime, end: endTime };
    reservations.push(newReservation);
    reservations.sort((a, b) => new Date(`1970-01-01T${a.start}`) - new Date(`1970-01-01T${b.start}`));

    // Save to localStorage and update UI
    localStorage.setItem(`reservations_${selectedRoom}`, JSON.stringify(reservations));
    displayReservations();

    // Reset form
    startTimeInput.value = "";
    endTimeInput.value = "";
  });

  // Display reservations in the list for the selected room
  function displayReservations() {
    const selectedRoom = roomSelect.value;
    reservationsList.innerHTML = "";

    if (!selectedRoom) return;

    const reservations = JSON.parse(localStorage.getItem(`reservations_${selectedRoom}`)) || [];

    reservations.forEach((reservation, index) => {
      const listItem = document.createElement("li");
      listItem.className = "reservation-item";
      listItem.innerHTML = `
        ${reservation.start} - ${reservation.end}
        <button class="delete-btn" data-index="${index}" data-room="${selectedRoom}">X</button>
      `;
      reservationsList.appendChild(listItem);
    });

    // Attach delete event listeners
    document.querySelectorAll(".delete-btn").forEach((btn) =>
      btn.addEventListener("click", deleteReservation)
    );
  }

  // Delete reservation
  function deleteReservation(e) {
    const selectedRoom = e.target.getAttribute("data-room");
    const index = parseInt(e.target.getAttribute("data-index"), 10);

    let reservations = JSON.parse(localStorage.getItem(`reservations_${selectedRoom}`)) || [];
    reservations.splice(index, 1);

    localStorage.setItem(`reservations_${selectedRoom}`, JSON.stringify(reservations));
    displayReservations();
  }

  // Display initial reservations when the page loads
  displayReservations();
});