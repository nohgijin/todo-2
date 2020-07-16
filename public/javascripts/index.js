import { closeModal } from './components/Modal/Modal'
import { toggleSidebar } from './components/SideBar'
import './components/Card'
import './components/CardForm'
import Column from './components/Column'
import './components/DeleteCardModal'
import './components/EditCardModal'
import './components/EditColumnModal'
import './components/Header'
import './components/LoginForm'
import './components/SideBarCard'
import '../stylesheets/common/base.scss'

const tempColumns = [
  {
    columnTitle: 'To Doooooo!',
    cardCount: 3,
  },
  {
    columnTitle: 'In Progess~',
    cardCount: 3,
  },
  {
    columnTitle: 'Done!!!',
    cardCount: 3,
  },
]

tempColumns.forEach((column) => {
  new Column(column)
})
