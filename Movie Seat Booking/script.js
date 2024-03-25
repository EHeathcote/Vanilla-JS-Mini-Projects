const container = document.querySelector(".container");
//grab all seats in the row not occupied into a known list
const seats = document.querySelectorAll(".row .seat:not(.occupied");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

let ticketPrice = parseInt(movieSelect.value);
//save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

//update total and count and save seats to local storage
function updateSelectedCount() {
  // NodeList of selected seats
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const selectedSeatsCount = selectedSeats.length;

  // copy selected seats into an array and map to get array of seat indexes
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  //save selected seats index array
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
  //chagne inner text of count and total to match select
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

//movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  //save movie selected and price to local storage
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

//event listener for click on a seat
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});
