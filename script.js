let currentIndex = 0;
let lastScrollTime = 0;
const container = document.getElementById('picker-container');
const optionsList = document.getElementById('options');
const options = document.querySelectorAll('.option');
let selected;

function disableScroll() {
  container.style.overflow = 'hidden';
}

function enableScroll() {
  container.style.overflow = '';
}

function selectOption(index) {
  currentIndex = index;
  options.forEach(option => option.classList.remove('selected'));
  options[index].classList.add('selected');

  const offsetTop = index * 100 - (container.offsetHeight / 2) + (options[0].offsetHeight / 2); 
  optionsList.style.transform = `translateY(${-offsetTop}px)`;
  
  console.log('Selected: ' + options[index].innerText);
  selected = options[index].innerText
  if (selected == "commit"){
    console.log("halo")
    setTimeout(()=>{
      setPosition()
    } ,20)
  }

  else if (selected == "web"){
    setTimeout(()=>{
      setPosition()
    } ,20)
  }
  
  let containerSelected = document.querySelector(`.${options[index].innerText}`)
  let listOfAllDetails = document.querySelectorAll(".details")
  listOfAllDetails.forEach(listOfAllDetail => {
    if (listOfAllDetail.classList.contains('show')) {
      listOfAllDetail.classList.remove('show')
    }
  });
  containerSelected.classList.add("show")

  enableScroll();  // Re-enable scrolling after selecting an option
}

function changeOption(direction) {
  disableScroll();  // Disable scrolling when changing options
  let newIndex = currentIndex + direction;
  newIndex = Math.max(0, Math.min(newIndex, options.length - 1));
  selectOption(newIndex);
}

function onWheel(event) {
  const now = Date.now();
  if (now - lastScrollTime < 300) {
    return;
  }
  lastScrollTime = now;

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

document.querySelectorAll('.copy').forEach(button => {
  button.addEventListener('click', () => {
    let siblingTextElement = [...button.parentNode.children].find(child => child.classList.contains('text'));
    if (siblingTextElement) {
      let span = siblingTextElement.querySelector('span');
      if (span) {
        navigator.clipboard.writeText(span.innerText)
          .then(() => console.log('Text copied!'))
          .catch(err => console.error('Error in copying text: ', err));
      } else {
        console.error('No span element found.');
      }
    } else {
      console.error('No sibling .text element found.');
    }
  });
});

function copyFeedback(event) {
  let copyElement = event.target;
  let rect = copyElement.getBoundingClientRect();
  let copiedText = document.createElement('div');
  copiedText.innerHTML = "Copied";
  copiedText.classList.add('copied');
  copiedText.style.left = rect.left + "px";
  copiedText.style.top = rect.top + "px";
  document.body.appendChild(copiedText);
  setTimeout(() => {
    copiedText.style.opacity = 0;
  }, 100);  // Initiate fade-out right away
  setTimeout(() => {
    document.body.removeChild(copiedText);
  }, 1000);  // Remove after fade-out
}

let textCommit = document.querySelector(".textCommit")
let textWeb = document.querySelector(".textWeb")
let illustrationCommit = document.querySelector(".commitIllustration")
let illustrationWeb = document.querySelector(".webIllustration")

// Function to set the position of the SVGs
function setPosition() {
  const textCommitRect = document.querySelector(".textCommit").getBoundingClientRect();
  const textWebRect = document.querySelector(".textWeb").getBoundingClientRect();

  const illustrationCommit = document.querySelector(".commitIllustration");
  const illustrationWeb = document.querySelector(".webIllustration");

  // Position the commitIllustration SVG
  illustrationCommit.style.position = "absolute";
  illustrationCommit.style.left = `${(textCommitRect.x + textCommitRect.width+30)}px`;
  illustrationCommit.style.top = `${textCommitRect.y + textCommitRect.height-160}px`;

  // Position the webIllustration SVG
  illustrationWeb.style.position = "absolute";
  illustrationWeb.style.left = `${textWebRect.x + textWebRect.width-120}px`;
  illustrationWeb.style.top = `${textWebRect.y + textWebRect.height-200}px`;
}

// Update positioning on window resize
window.addEventListener("resize", setPosition);

