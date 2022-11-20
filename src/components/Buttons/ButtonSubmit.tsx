export const ButtonSubmit = () => {
  return (
    <button
      className={`bg-transparent font-semibold p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 active:border-gray-600 hover:border-gray-600 group w-1/2`}
      id='submitButton'
      title='Submit Button'
      type='submit'
      role='submit'
      name='submit-button'
      tabIndex={6}
    >
      <span>submit</span>
    </button>
  )
}
