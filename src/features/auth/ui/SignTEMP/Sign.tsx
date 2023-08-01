// import { useState } from 'react'

// import Image from 'next/image'

// import { FormOption } from '../../../../../shared/ui/FormContainer/FormContainer'

// import styles from './Sign.module.scss'

// import githubIcon from '@/public/socialIcons/github-icon.svg'
// import googleIcon from '@/public/socialIcons/google-icon.svg'
// import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button'
// import Input, { InputType } from '@/shared/ui/Input/Input'

// interface IProps {
//   formOption: FormOption
// }

// function Sign({ formOption }: IProps) {
//   const [userName, setUserNAme] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [passwordConfirm, setPasswordConfirm] = useState('')

//   return (
//     <>
//       <div className={styles.socialIconContainer}>
//         <Image src={googleIcon} alt="google icon" />
//         <Image src={githubIcon} alt="github icon" />
//       </div>
//       {formOption === FormOption.SIGNUP && (
//         <Input
//           type={InputType.TEXT}
//           label="Username"
//           placeholder="Enter name"
//           callback={curr => setUserNAme(curr)}
//           value={userName}
//         />
//       )}
//       <Input
//         label="Email"
//         type={InputType.EMAIL}
//         placeholder="Enter email"
//         callback={curr => setEmail(curr)}
//         value={email}
//       />
//       <Input
//         label="Password"
//         type={InputType.PASSWORD}
//         placeholder="Enter password"
//         callback={curr => setPassword(curr)}
//         value={password}
//       />
//       {formOption === FormOption.SIGNUP && (
//         <Input
//           label="Password confirmation"
//           type={InputType.PASSWORD}
//           placeholder="Enter password"
//           callback={curr => setPasswordConfirm(curr)}
//           value={passwordConfirm}
//         />
//       )}
//       {formOption === FormOption.SIGNIN && (
//         <p className={styles.signInForgotText}>Forgot Password</p>
//       )}
//       {formOption === FormOption.SIGNIN && <Button size={ButtonSize.STRETCHED}>Sign In</Button>}
//       {formOption === FormOption.SIGNUP && (
//         <Button className={styles.signUpBtn} size={ButtonSize.STRETCHED}>
//           Sign Up
//         </Button>
//       )}
//       <p className={styles.helpText}>
//         {formOption === FormOption.SIGNUP && 'Do you have an account?'}
//         {formOption === FormOption.SIGNIN && 'Don’t have an account?'}
//       </p>
//       {formOption === FormOption.SIGNIN && (
//         <Button theme={ButtonTheme.CLEAR} size={ButtonSize.SMALL} className={styles.oppositeBtn}>
//           Sign Up
//         </Button>
//       )}
//       {formOption === FormOption.SIGNUP && (
//         <Button className={styles.oppositeBtn} theme={ButtonTheme.CLEAR} size={ButtonSize.SMALL}>
//           Sign In
//         </Button>
//       )}
//     </>
//   )
// }

// export default Sign
