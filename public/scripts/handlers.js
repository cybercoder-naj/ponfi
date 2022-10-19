import api from './api.js'

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
  },
  cardDragEnd(card) {
    card.classList.remove("dragging")
  },
  containerDragOver(e, container) {
    e.preventDefault()

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
    const newCardMsg = prompt("Please enter the card contents:")

    api.createCard({
      content: newCardMsg,
      category: container.dataset.category
    }).then(cardObj => {
      const newCard = cardBuilder(cardObj)
      container.appendChild(newCard)
    }).catch(alert)   
  },
  editCard(card) {
    const newContent = prompt("Enter your new message: ")
    
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
  
  const pMsg = document.createElement("p")
  pMsg.innerText = content
  newCard.appendChild(pMsg)

  newCard.addEventListener("click", () => handlers.editCard(newCard))

  return newCard
}

export default handlers