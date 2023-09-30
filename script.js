let currentIndex = 0;
let lastScrollTime = 0;
const container = document.getElementById('picker-container');
const optionsList = document.getElementById('options');
const options = document.querySelectorAll('.option');

function selectOption(index) {
  currentIndex = index;  // Update the currentIndex
  options.forEach(option => option.classList.remove('selected'));
  options[index].classList.add('selected');
  const offsetTop = index * 100 - (container.offsetHeight / 2) + (options[0].offsetHeight / 2); 
  optionsList.style.transform = `translateY(${-offsetTop}px)`;
  console.log('Selected: ' + options[index].innerText);
  let containerSelected = document.querySelector(`.${options[index].innerText}`)
  let listOfAllDetails = document.querySelectorAll(".details")
  listOfAllDetails.forEach(listOfAllDetail => {
    if (listOfAllDetail.classList.contains('show')) {
      listOfAllDetail.classList.remove('show')
    }
  });
  containerSelected.classList.add("show")
}

function changeOption(direction) {
  let newIndex = currentIndex + direction;
  newIndex = Math.max(0, Math.min(newIndex, options.length - 1));
  selectOption(newIndex);
}

function onWheel(event) {
  const now = Date.now();
  if (now - lastScrollTime < 300) {  // Ignore if the last scroll event was within the last 300ms
    return;
  }
  lastScrollTime = now;  // Update the last scroll time

  const direction = event.deltaY > 0 ? 1 : -1;
  changeOption(direction);
  event.preventDefault();
}

container.addEventListener('wheel', onWheel);

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
    const direction = event.key === 'ArrowDown' ? 1 : -1;
    changeOption(direction);
    event.preventDefault();
  }
});

// Adjust the initial selected option and transform style
selectOption(0);
