import { FC } from 'react'

interface Props {
  [x: string]: any
}

const Logo: FC<Props> = (props) => {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="32" cy="32" r="32" fill="black" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M50 14H14V50H50V14ZM12 12V52H52V12H12Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M42 22H22V42H42V22ZM20 20V44H44V20H20Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M34 30H30V34H34V30ZM28 28V36H36V28H28Z"
        fill="white"
      />
    </svg>
  )
}

export default Logo
