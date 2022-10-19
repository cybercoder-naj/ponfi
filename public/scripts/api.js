export default {
  async createCard(cardObj) {
    /* Code here */
    console.log('createCard() called with ', cardObj)

    return Promise.resolve({ _id: '1', ...cardObj})
  },
  async editCard(cardObj) {
    /* Code here */
    console.log('createCard() called with ', cardObj)

    return Promise.resolve(cardObj)
  }
}