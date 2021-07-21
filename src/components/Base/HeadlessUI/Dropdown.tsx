import { Menu, Transition } from '@headlessui/react'

export const Dropdown = () => {
  return (
    <Menu>
      {({ open }) => (
        <>
          <Menu.Button className='flex flex-row items-center gap-2 p-4'>
            {({ open }) => (
              <>
                <span>More options</span>
                <ChevronRightIcon
                  className={`${open ? 'transform rotate-90' : ''}`}
                />
              </>
            )}
          </Menu.Button>
          <Transition
            show={open}
            enter='transition duration-1000 ease-out'
            enterFrom='transform scale-95 opacity-0'
            enterTo='transform scale-100 opacity-100'
            leave='transition duration-1000 ease-out'
            leaveFrom='transform scale-100 opacity-100'
            leaveTo='transform scale-95 opacity-0'
          >
            <Menu.Items static className='flex flex-col items-center'>
              <div className='px-4 py-3'>
                <p className='text-sm leading-5'>Signed in as</p>
                <p className='text-sm font-medium leading-5 truncate'>
                  tom@example.com
                </p>
              </div>
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={`${active ? 'text-hover' : 'bg-base text-base'}`}
                    href='/account-settings'
                  >
                    Account settings
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={`${active ? 'text-hover' : 'bg-base text-base'}`}
                    href='/account-settings'
                  >
                    Documentation
                  </a>
                )}
              </Menu.Item>
              <Menu.Item disabled>
                <span className='opacity-50'>
                  Invite a friend (coming soon!)
                </span>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}

export const ChevronRightIcon = ({ className }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      width='10'
      height='10'
      className={`${className}`}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M9 5l7 7-7 7'
      />
    </svg>
  )
}
