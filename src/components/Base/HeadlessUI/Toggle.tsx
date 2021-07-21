import { useState } from 'react'
import { Switch } from '@headlessui/react'

export const Toggle = () => {
  const [enabled, setEnabled] = useState(false)

  return (
    <Switch.Group>
      <Switch.Label>Enable notifications</Switch.Label>
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${
          enabled ? 'bg-blue-600' : 'bg-gray-700'
        } relative inline-flex h-5 rounded-full w-8 items-center focus:outline-none`}
      >
        <span
          className={`${
            enabled ? 'translate-x-4' : 'translate-x-0'
          } inline-block w-4 h-5 transform duration-300 ease-in-out bg-white rounded-full`}
        />
      </Switch>
    </Switch.Group>
  )
}
