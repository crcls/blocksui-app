import { FC } from 'react'

const PrimitiveInput: FC = () => {
  return (
    <div className="cursor-move">
      <label
        htmlFor="email"
        className="block text-sm font-medium text-neutral-700"
      >
        Email
      </label>
      <div className="mt-1">
        <input
          type="email"
          name="email"
          id="email"
          className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-neutral-500 focus:ring-neutral-500 sm:text-sm"
          placeholder="you@example.com"
        />
      </div>
    </div>
  )
}

export default PrimitiveInput
