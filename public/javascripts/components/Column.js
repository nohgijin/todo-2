import { templateToElement } from '../utils/HtmlGenerator'
import { COLUMN_CLASS, CARD_CLASS, EVENT } from '../utils/Constants'
import { Emitter } from '../utils/EventEmitter'
import '../../stylesheets/components/column.scss'
import CardForm from './CardForm'
import Card from './Card'
import EditColumnModal from './Modal/EditColumnModal'
export default class Column {
  constructor({ columnTitle, cardDatas }) {
    this.$target = ''
    this.columnTitle = columnTitle
    this.cardDatas = cardDatas
    this.cardList = []
    this.emitter = new Emitter()

    this.init()
  }

  init() {
    this.setElements()
    this.render()
    this.bindEvent()
  }

  setElements() {
    const template = `
      <section class='${COLUMN_CLASS.COLUMN}'>
        <div class='title-bar'>
          <div class='title-wrapper'>
            <div class='${COLUMN_CLASS.CARD_COUNT}'>${this.cardList.length}</div>
            <div class='${COLUMN_CLASS.TITLE}'>${this.columnTitle}</div> 
          </div>
          <div class='btn-wrapper'>
            <img class='${COLUMN_CLASS.ADD_BTN}' src='/static/images/plus-btn.svg' alt='add-btn' />
            <img class='${COLUMN_CLASS.REMOVE_BTN}' src='/static/images/remove-btn.svg' alt='remove-btn' />
          </div>
        </div>
        <div class='${COLUMN_CLASS.CARD_FORM_SLOT}'></div>
        <div class='${COLUMN_CLASS.CONTENT_CONTAINER}'></div>
      </section>
    `

    this.$target = templateToElement(template)
    this.$cardCount = this.$target.querySelector(`.${COLUMN_CLASS.CARD_COUNT}`)
    this.$contentContainer = this.$target.querySelector(
      `.${COLUMN_CLASS.CONTENT_CONTAINER}`
    )

    this.cardDatas.forEach((cardData) => this.addCard(cardData))
    this.setCardCount()
  }

  render() {
    const $columnContainer = document.querySelector(
      `.${COLUMN_CLASS.CONTAINER}`
    )
    $columnContainer.appendChild(this.$target)
  }

  bindEvent() {
    const $cardAddBtn = this.$target.querySelector(`.${COLUMN_CLASS.ADD_BTN}`)
    $cardAddBtn.addEventListener('click', () => {
      this.toggleCardForm()
    })
    this.$target.addEventListener('dblclick', () => {
      this.editColumn()
    })

    this.emitter.on(EVENT.ADD_CARD, this.insertOneCard.bind(this))
    this.emitter.on(EVENT.REMOVE_CARD, this.removeOneCard.bind(this))
  }

  addCard({ id, cardTitle, username, columnIndex }) {
    const newCard = new Card(this.emitter, id, cardTitle, username, columnIndex)
    this.cardList.push(newCard)
    this.$contentContainer.prepend(newCard.getTarget())
  }

  setCardCount() {
    const newCardCount = this.$target.querySelectorAll(`.${CARD_CLASS.CARD}`)
      .length
    this.$cardCount.innerHTML = newCardCount
  }

  setCardSequence() {
    this.cardList.forEach((card, index) => {
      card.columnIndex = index + 1
    })
  }

  toggleCardForm() {
    const $cardFormSlot = this.$target.querySelector(
      `.${COLUMN_CLASS.CARD_FORM_SLOT}`
    )

    if ($cardFormSlot.innerHTML) {
      $cardFormSlot.innerHTML = ''
      return
    }

    const cardForm = new CardForm(this.emitter)
    $cardFormSlot.appendChild(cardForm.$target)
  }

  editColumn() {
    const modal = new EditColumnModal(this.columnTitle, (edited) => {
      this.columnTitle = edited
      this.show()
    })
    modal.showModal()
  }

  show() {
    this.$target.querySelector(
      `.${COLUMN_CLASS.TITLE}`
    ).innerText = this.columnTitle
  }

  insertOneCard(cardData) {
    //api 호출 후 id 받기
    cardData.id = 1
    cardData.columnIndex = this.cardList.length + 1
    this.addCard(cardData)
    this.setCardCount()
  }

  removeOneCard(cardId) {
    const removeIndex = this.cardList.findIndex((card) => card.id === cardId)
    this.cardList.splice(removeIndex, 1)
    this.setCardCount()
    this.setCardSequence()
  }
}
