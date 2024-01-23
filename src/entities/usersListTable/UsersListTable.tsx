// import { Table, TBody, TCell, THead, THeader, TRow } from '@/view/ui/Table/Table'
// import s from './UsersListTable.module.scss'
// import { CardType } from '@/api/services/decks/decks.types'
// import { CardFormsManager } from '@/view/modules/cards/components/CardsFormsManager/CardFormsManager'
// import { FilledRatingStar } from '@/view/assets'
// import { EmptyRatingStar } from '@/view/assets/icons/emptyRatingStar/EmptyRatingStar'

import s from './UsersListTable.module.scss'

import { DummyRowsType } from '@/pages/super-admin/users-list'
import { NewTable, TBody, TCell, THead, THeader, TRow } from '@/shared/ui'

type SelectedDeckTableType = {
  selectedDeckTableData: DummyRowsType[]
  userId: string
}

export const UsersListTable = ({ selectedDeckTableData, userId }: SelectedDeckTableType) => {
  return (
    <NewTable>
      <THead>
        <TRow>
          <THeader>UserID</THeader>
          <THeader>Username</THeader>
          <THeader>Profile link</THeader>
          <THeader>Date added</THeader>
          <THeader colSpan={2}>icons</THeader>
        </TRow>
      </THead>
      <TBody>
        {selectedDeckTableData.map(user => {
          return (
            <TRow key={user.userID}>
              <TCell>{user.userID}</TCell>
              <TCell>{user.profileLink}</TCell>
              <TCell>{user.userName}</TCell>
              <TCell>{new Date(user?.dateAdded).toLocaleDateString()}</TCell>
              <TCell>
                <div className={s.iconsContainer}>
                  icon
                  {/*<CardFormsManager type={'EDIT'} card={card} />*/}
                  {/*<CardFormsManager type={'DELETE'} card={card} />*/}
                </div>
              </TCell>
            </TRow>
          )
        })}
      </TBody>
    </NewTable>
  )
}

// React knows how to render arrays of JSX elements, treating each element as a separate child in the DOM.
// const drawStars = (numberOfFilledStars: number) => {
//   return Array(5)
//     .fill(<FilledRatingStar />, 0, numberOfFilledStars)
//     .fill(<EmptyRatingStar />, numberOfFilledStars, 5)
// }
// const drawStars = (numberOfFilledStars: number) => {
//   return Array(5)
//     .fill(null)
//     .map((_, index) => {
//       return index < numberOfFilledStars ? (
//         <FilledRatingStar key={index} />
//       ) : (
//         <EmptyRatingStar key={index} />
//       )
//     })
// }
