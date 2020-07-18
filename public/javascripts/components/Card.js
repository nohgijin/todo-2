import { templateToElement } from '../utils/HtmlGenerator'
import EditCardModal from './Modal/EditCardModal'
import '../../stylesheets/components/card.scss'
import DeleteCardModal from './Modal/DeleteCardModal'
import { CARD_CLASS, EVENT, COLUMN_CLASS } from '../utils/Constants'

export default class Card {
  constructor({ id, title, username, nextCardId }) {
    this.$target = ''
    this.id = id
    this.title = title
    this.username = username
    this.nextCardId = nextCardId

    this.init()
  }

  init() {
    this.setElements()
    // this.bindEvent()
  }

  setElements() {
    this.template = `
      <div class='card' data-id='${this.id}'>
        <img class='document-icon' src='/static/images/document.svg') />
        <div class='content-container'>
          <div class='content-wrapper'>
            <div class='${CARD_CLASS.TITLE}'>${this.title}</div>
            <div class='added-by'>
              <span>Added by </span>
              <span class='strong'>${this.username}</span>
            </div>
          </div>
          <img class='${CARD_CLASS.REMOVE_BTN}' src='/static/images/remove-btn.svg' />
          </div>
      </div>
    `

    this.$target = templateToElement(this.template)
    this.$removeBtn = this.$target.querySelector(`.${CARD_CLASS.REMOVE_BTN}`)
  }

  bindEvent() {
    let clicks = 0
    const delay = 400
    this.$target.addEventListener('pointerdown', e2.bind(this))

    function e2(e) {
      clicks++

      setTimeout(function () {
        clicks = 0
      }, delay)

      if (clicks === 2) {
        this.editCard()
        clicks = 0
        return
      } else {
        this.onDragStartHandler(e)
      }
    }
  }

  editCard() {
    const modal = new EditCardModal(
      this.cardTitle,
      function edited(text) {
        this.cardTitle = text
        this.render()
      }.bind(this)
    )
    modal.showModal()
  }

  removeCard() {
    const modal = new DeleteCardModal(
      this.cardTitle,
      function deleted() {
        this.$target.remove()
        // this.emitter.emit(EVENT.REMOVE_CARD, this.id)
      }.bind(this)
    )
    modal.showModal()
  }

  render() {
    this.$target.querySelector('.title').innerText = this.cardTitle
  }

  getTarget() {
    return this.$target
  }

  getId() {
    return this.id
  }

  setNextCardId(nextCardId) {
    this.nextCardId = nextCardId
  }
}
