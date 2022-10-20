import { Disclosure } from '@headlessui/react'

import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'

const subCategories = [
  { name: 'Design', href: '#' },
  { name: 'Management', href: '#' },
  { name: 'Marketing', href: '#' },
  { name: 'Made by CRCLS', href: '#' },
]

const filters = [
  {
    id: 'pricing',
    name: 'Pricing',
    options: [
      { value: '0', label: '0 ETH - 0.25 ETH', checked: false },
      { value: '0.25', label: '0.25 ETH - 0.5 ETH', checked: false },
      { value: '0.50', label: '0.5 ETH - 0.75 ETH', checked: false },
      { value: '0.75', label: '0.75+ ETH', checked: false },
    ],
  },
]

interface Props {
  className?: string
}

const FilterForm = ({ className }: Props) => {
  return (
    <form className={className}>
      <h3 className="sr-only">Categories</h3>
      <ul
        role="list"
        className="space-y-4 border-b border-neutral-200 pb-6 text-sm font-medium text-black"
      >
        {subCategories.map((category) => (
          <li key={category.name}>
            <a href={category.href}>{category.name}</a>
          </li>
        ))}
      </ul>
      {filters.map((section) => (
        <Disclosure
          as="div"
          key={section.id}
          className="border-b border-neutral-200 py-6"
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-neutral-400 hover:text-neutral-500">
                  <span className="font-medium text-black">{section.name}</span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <div className="space-y-4">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        defaultChecked={option.checked}
                        className="h-4 w-4 rounded border-neutral-300 text-neutral-600 focus:ring-neutral-500"
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className="ml-3 text-sm text-neutral-600"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </form>
  )
}

export default FilterForm
