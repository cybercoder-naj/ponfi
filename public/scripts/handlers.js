import api from './api.js'

let draggedOverContainer = null

/**
 * handlers is a JavaScript object that contains all the action functions (or handlers).
 * When the functions are invoked, they perform a specific task such as modifying class 
 * names on HTML elements, placing elements after the Drag&Drop, adding and edit new cards.
 * 
 * DO NOT TAMPER WITH THIS FUNCTION !!
 */
const handlers = {
  cardDragStart(card) {
    card.classList.add("dragging")
    draggedOverContainer = card.parentElement
  },
  cardDragEnd(card) {
    card.classList.remove("dragging")
    api.editCard({
      _id: card.dataset.id,
      content: card.querySelector('p').innerText,
      category: draggedOverContainer.dataset.category
    }).then(cardObj => {
      draggedOverContainer = null
    }).catch(alert)
  },
  containerDragOver(e, container) {
    e.preventDefault()
    draggedOverContainer = container

    const getDragAfterElement = (container, y) => {
      const notDraggedCards = [...container.querySelectorAll(".card:not(.dragging)")]
      return notDraggedCards.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child }
        } else return closest
      }, { offset: Number.NEGATIVE_INFINITY }).element
    }

    const afterElement = getDragAfterElement(container, e.clientY)
    const draggedCard = document.querySelector(".dragging")
    if (afterElement == undefined) {
      container.appendChild(draggedCard)
    } else {
      container.insertBefore(draggedCard, afterElement)
    }
  },
  addNewCard(container) {
    const newCardContent = prompt("Please enter the card contents:")
    if (newCardContent === null || newCardContent == '')
      return

    api.createCard({
      content: newCardContent,
      category: container.dataset.category
    }).then(cardObj => {
      const newCard = cardBuilder(cardObj)
      container.appendChild(newCard)
    }).catch(alert)   
  },
  addExistingCard(container, card) {
    const newCard = cardBuilder(card)
    container.appendChild(newCard)
  },
  editCard(card) {
    const newContent = prompt("Enter your new message: ", card.querySelector('p').innerText)
    if (newContent === null || newContent == '')
      return
    
    api.editCard({
      _id: card.dataset.id,
      content: newContent,
      category: card.parentElement.dataset.category
    }).then(cardObj => {
      const pTag = card.querySelector("p")
      card.removeChild(pTag)
      pTag.innerText = cardObj.content
      card.appendChild(pTag)
    }).catch(alert)
  }
}

/**
 * This function builds a new Card element with the required inner tags and contents.
 * 
 * DO NOT TAMPER WITH THIS FUNCTION !!
 * 
 * @param {string} message the contents of the card
 * @returns The card element
 */
const cardBuilder = ({content, _id}) => {
  const newCard = document.createElement("div")
  newCard.className = "card"
  newCard.dataset.id = _id
  
  const editImg = document.createElement("img")
  editImg.setAttribute("src", "./assets/edit.png")
  editImg.setAttribute("alt", "edit")
  newCard.appendChild(editImg)
  
  const pTag = document.createElement("p")
  pTag.innerText = content
  newCard.appendChild(pTag)

  editImg.addEventListener("click", () => handlers.editCard(newCard))

  newCard.setAttribute("draggable", "true")  
  newCard.addEventListener("dragstart", () => handlers.cardDragStart(newCard))
  newCard.addEventListener("dragend", () => handlers.cardDragEnd(newCard))

  return newCard
}

export default handlers