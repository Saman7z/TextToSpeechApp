// vars
const fakeData = [
  {
    image: "./assets/drink.jpg",
    text: "I'm Thirsty",
  },
  {
    image: "./assets/food.jpg",
    text: "I'm Hungry",
  },
  {
    image: "./assets/tired.jpg",
    text: "I'm Tired",
  },
  {
    image: "./assets/hurt.jpg",
    text: "I'm Hurt",
  },
  {
    image: "./assets/happy.jpg",
    text: "I'm Happy",
  },
  {
    image: "./assets/angry.jpg",
    text: "I'm Angry",
  },
  {
    image: "./assets/sad.jpg",
    text: "I'm Sad",
  },
  {
    image: "./assets/scared.jpg",
    text: "I'm Scared",
  },
  {
    image: "./assets/outside.jpg",
    text: "I Want To Go Outside",
  },
  {
    image: "./assets/home.jpg",
    text: "I Want To Go Home",
  },
  {
    image: "./assets/school.jpg",
    text: "I Want To Go To School",
  },
  {
    image: "./assets/grandma.jpg",
    text: "I Want To Go To Grandmas",
  },
];
const container = document.querySelector(".carts");
let voices = [];
let voicesSelect = document.getElementById("voicesSelect");
let readBtn = document.getElementById("read-btn");
//
fakeData.forEach((item) => {
  let div = document.createElement("div");
  div.classList.add("cart");
  div.innerHTML = `
  <img src=${item.image} alt="cart-img" class="cart-img"/>
  <div class="cart-title-container"><span class="cart-title">${item.text}</span></div>
  `;
  div.addEventListener("click", () => {
    setTextMessage(item.text);
    speakText();
    div.classList.add("active");
    setTimeout(() => div.classList.remove("active"), 800);
  });
  container.appendChild(div);
});

// toggle any word functions
toggleAnyWord = () => {
  document
    .querySelector(".any-word-container")
    .classList.toggle("any-word-show");
};
// close any word functions
const closeAnyWord = () => {
  document
    .querySelector(".any-word-container")
    .classList.remove("any-word-show");
};
//get voices func

const getVoices = () => {
  voices = speechSynthesis.getVoices();

  voices.forEach((item, index) => {
    
    const option = document.createElement("option");
    option.value = item.name;
    option.innerHTML = `${item.name} __ ${item.lang} `;
    // if(item.name == "Google US English"){
    //   option.selected = "true"
    // }
    voicesSelect.appendChild(option);
    // if (item.lang){
    //   option.setAttribute("selected")
    // }
  });
};
//INIT
getVoices();
const msg = new SpeechSynthesisUtterance();

//set TExt message func
const setTextMessage = (txt) => {
  msg.text = txt;
};
// speak message func
const speakText = () => {
  speechSynthesis.speak(msg);
};
// setVoice function
const setVoice = (e) => {
  msg.voice = voices.find((item) => item.name == e.target.value);
};
//decideToCloseModal function
const decideToCloseModal = (e) => {
  if (
    document
      .querySelector(".any-word-container")
      .classList.contains("any-word-show")
  ) {
    let cl = e.target.classList;
    if (
      !cl.contains("btn") &&
      !cl.contains("top-section-btn") &&
      !cl.contains("any-word") &&
      !cl.contains("any-word-show") &&
      !cl.contains("any-word-container") &&
      !cl.contains("any-word-container") &&
      e.target.tagName != "TEXT" &&
      e.target.tagName != "TEXTAREA" &&
      e.target.tagName != "H2" &&
      e.target.tagName != "SELECT"
    ) {
      closeAnyWord();
    }
  }
};
//events
document
  .getElementById("toggle-anyword")
  .addEventListener("click", toggleAnyWord);
document
  .querySelector(".close-any-word-con")
  .addEventListener("click", closeAnyWord);
window.addEventListener("click", decideToCloseModal);
// console.log(speechSynthesis.getVoices())

// voices change

speechSynthesis.addEventListener("voiceschanged", getVoices);

//change select
voicesSelect.addEventListener("change", setVoice);
readBtn.addEventListener("click", () => {
  setTextMessage(document.getElementById("select-textarea").value);
  speakText();
});
