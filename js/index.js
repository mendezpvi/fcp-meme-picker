import { catsData } from "./data.js";

const radiosWrap = document.getElementById("radios-wrap")
const getImgBtn = document.getElementById("get-img-btn")
const closeBtn = document.getElementById("close-btn")
const memeModal = document.getElementById("meme-modal")
const memeModalInner = document.getElementById("meme-modal-inner")

radiosWrap.addEventListener("change", highlightCheckedOption)
getImgBtn.addEventListener("click", renderMeme)
closeBtn.addEventListener("click", closeModal)

function highlightCheckedOption(e) {
  const radios = document.getElementsByClassName("radio")
  for (let radio of radios) {
    radio.classList.remove("isChecked")
  }
  document.getElementById(e.target.id).parentElement.classList.add("isChecked")
}

function closeModal() {
  memeModal.classList.remove("show-modal")
  memeModal.style.display = "none"
}

function renderMeme() {
  const catObject = getSingleCatObject()
  memeModal.style.display = "block"
  memeModalInner.innerHTML = `<img src="${catObject.image}" alt="${catObject.alt}">`
}

function getSingleCatObject() {
  const catsArr = getMatchingCatsArr()
  if (catsArr.length === 1) {
    return catsArr[0]
  } else {
    let newIndex = Math.floor( Math.random() * catsArr.length )
    return catsArr[newIndex]
  }
}

function getMatchingCatsArr() {
  const radioSelec = document.querySelector("input[type='radio']:checked")
  const checkboxSelec = document.querySelector("input[type='checkbox']:checked")
  if (radioSelec) {
    let radioValue = radioSelec.value
    const matchingCatsArr = catsData.filter(function(cat) {
      if (checkboxSelec) {
        return cat.emotionTags.includes(radioValue) && cat.isGif
      } else {
        return cat.emotionTags.includes(radioValue)
      }
    })
    return matchingCatsArr
  }
}


function renderEmotionsRadios(cats) {
  const emotionsAll = getEmotions(cats)
  let radioItems = ''
  for (let emotion of emotionsAll) {
    radioItems += `
      <div class="radio">
        <label for="${emotion}">${emotion}</label>
        <input type="radio" id="${emotion}" value="${emotion}" name="emotions">
      </div>
    `
  }
  radiosWrap.innerHTML = radioItems
}

function getEmotions(cats) {
  const emotionsArr = []
  for (let cat of cats) {
    for (let emotion of cat.emotionTags) {
      if (!emotionsArr.includes(emotion)) {
        emotionsArr.push(emotion)
      }
    }
  }
  return emotionsArr
}

renderEmotionsRadios(catsData)
