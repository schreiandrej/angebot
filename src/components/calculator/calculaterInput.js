import { Input } from '@/components/base/forms/input'

export const CalcInput = ({ className, register, clearForm }) => {
  return (
    <div className='relative w-full'>
      <Input
        register={register}
        type='text'
        name='calc'
        autoComplete='off'
        inputStyles='w-full py-4 text-center'
        autoFocus
        placeholder='1 + 1'
      />
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        width='20'
        height='20'
        className='absolute right-3 absoluteY-center z-10 cursor-pointer text-gray-700 hover:text-gray-500'
        onClick={clearForm}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
        />
      </svg>
    </div>
  )
}
