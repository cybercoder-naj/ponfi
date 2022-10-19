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
    container.appendChild(cardBuilder(newCardMsg))
  },
  editCard(card) {
    const newMessage = prompt("Enter your new message: ")
    const pMsg = card.querySelector("p")
    card.removeChild(pMsg)
    pMsg.innerText = newMessage
    card.appendChild(pMsg)
  }
}

const cardBuilder = (message) => {
  const newCard = document.createElement("div")
  newCard.className = "card"
  
  const editImg = document.createElement("img")
  editImg.setAttribute("src", "./assets/edit.png")
  editImg.setAttribute("alt", "edit")
  newCard.appendChild(editImg)
  
  const pMsg = document.createElement("p")
  pMsg.innerText = message
  newCard.appendChild(pMsg)

  newCard.addEventListener("click", () => handlers.editCard(newCard))

  return newCard
}

export default handlers