import handlers from "./handlers.js"

function setup() {
  const cards = document.querySelectorAll(".card")
  cards.forEach(card => {
    card.setAttribute("draggable", "true")
    
    card.addEventListener("dragstart", () => handlers.cardDragStart(card))
    card.addEventListener("dragend", () => handlers.cardDragEnd(card))

    const editButton = card.querySelector("img[alt=edit]")
    editButton.addEventListener("click", () => handlers.editCard(card))
  })

  const containers = document.querySelectorAll(".container")
  containers.forEach(container => {
    container.addEventListener("dragover", e => handlers.containerDragOver(e, container))

    const addCard = container.querySelector(".add-card")
    addCard.addEventListener("click", () => handlers.addNewCard(container))
  })
}

document.addEventListener("DOMContentLoaded", () => {
  setup()
})
