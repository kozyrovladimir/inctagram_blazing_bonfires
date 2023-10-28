export type fieldGeneralInfo =
  | 'userName'
  | 'firstName'
  | 'lastName'
  | 'dateOfBirth'
  | 'city'
  | 'aboutMe'

// enum GeneralInfoFields {

//     SMALL = 'userName',
//     MIDDLE = 'firstName',
//     LARGE = 'lastName',
//     STRETCHED = 'dateOfBirth',
//     STRETCHED = 'city',
//     STRETCHED = 'aboutMe',

// }
export type GeneralInfoFields = [
  'userName',
  'firstName',
  'lastName',
  'dateOfBirth',
  'city',
  'aboutMe',
]
