import { catsData } from "./data.js"

const emotionForm = document.getElementById('emotion-form')
const getImageBtn = document.getElementById('get-image-btn')
const memeModal = document.getElementById('meme-modal')
const modalCloseBtn = document.getElementById('meme-modal-close-btn')

// Function to get a unique list of emotions from the cat data
function getUniqueEmotions(cats) {
  const uniqueEmotions = []

  for (let cat of cats) {
    for (let emotion of cat.emotionTags) {
      if (!uniqueEmotions.includes(emotion)) {
        uniqueEmotions.push(emotion)
      }
    }
  }

  return uniqueEmotions
}

// Function to render emotion options as radio buttons in the form
function renderEmotionOptions(cats) {
  const emotions = getUniqueEmotions(cats)
  let radioButtonHTML = ''

  for (let emotion of emotions) {
    radioButtonHTML += `
    <div class="radio">
      <label for="${emotion}">${emotion}</label>
      <input type="radio" id="${emotion}" value="${emotion}" name="emotions"
      >
    </div>`
  }

  emotionForm.innerHTML = radioButtonHTML
}

// Function to highlight the selected radio option
function highlightSelectedEmotion(e) {
  const radioOptions = document.getElementsByClassName('radio')
  const selectedOption = document.getElementById(e.target.id)

  for (let radio of radioOptions) {
    radio.classList.remove('highlight')
  }

  selectedOption.parentElement.classList.add('highlight')
}

// Function to filter the cats based on the selected emotion and gif option
function getFilteredCats() {
  if (document.querySelector('input[type="radio"]:checked')) {
    const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
    const isGif = document.getElementById('gifs-only').checked

    const filteredCats = catsData.filter(function (cat) {
      if (isGif) {
        return cat.emotionTags.includes(selectedEmotion) && cat.isGif
      } else {
        return cat.emotionTags.includes(selectedEmotion)
      }
    })

    return filteredCats
  }
}

// Function to get a random cat from the filtered list
function getRandomCat() {
  const filteredCats = getFilteredCats()

  if (filteredCats.length === 1) {
    return filteredCats[0]
  } else {
    const randomIndex = Math.floor(Math.random() * filteredCats.length)
    return filteredCats[randomIndex]
  }
}

// Function to render the selected cat in the modal
function renderSelectedCat() {
  const selectedCat = getRandomCat()
  const memeModalBody = document.getElementById('meme-modal-body')

  memeModalBody.innerHTML = `
   <img class="cat-img" src="${selectedCat.image}" alt="${selectedCat.alt}">`

  memeModal.style.display = 'flex'
}

// Function to close the modal
function closeModal() {
  memeModal.style.display = 'none'
}


// Render the emotion options when the page loads
renderEmotionOptions(catsData)

// Event listeners
emotionForm.addEventListener('change', highlightSelectedEmotion)
getImageBtn.addEventListener('click', renderSelectedCat)
modalCloseBtn.addEventListener('click', closeModal)