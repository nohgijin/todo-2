import { templateToElement } from '../utils/HtmlGenerator'
import '../../stylesheets/components/card.scss'
import { CARD_CLASS } from '../utils/Constants'

export default class Card {
  constructor(cardTitle) {
    this.cardTitle = cardTitle
    this.user = 'choibumsu'
    this.$target = ''

    this.init()
  }
}

Card.prototype.init = function () {
  this.setElements()
  this.bindEvent()
}

Card.prototype.setElements = function () {
  const template = `
    <div class='card'>
      <img class='document-icon' src='/static/images/document.svg') />
      <div class='content-container'>
        <div class='content-wrapper'>
          <div class='title'>${this.cardTitle}</div>
          <div class='added-by'>
            <span>Added by </span>
            <span class='strong'>${this.user}</span>
          </div>
        </div>
        <img class='${CARD_CLASS.REMOVE_BTN}' src='/static/images/remove-btn.svg' />
        </div>
    </div>
  `

  this.$target = templateToElement(template)
  this.$removeBtn = this.$target.querySelector(`.${CARD_CLASS.REMOVE_BTN}`)
}

Card.prototype.getTarget = function () {
  return this.$target
}

Card.prototype.bindEvent = function () {
  this.$removeBtn.addEventListener('click', () => {
    this.removeCard()
  })
}

Card.prototype.removeCard = function () {
  const isRemove = confirm('정말 삭제하시겠습니까?')

  if (isRemove) this.$target.remove()
}

