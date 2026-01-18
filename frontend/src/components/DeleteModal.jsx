import { CircleX, Trash2 } from 'lucide-react'

export default function DeleteModal({ closeModal, deleteNote, noteTitle }) {
  return (
    <div onClick={closeModal} className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center">
        <div onClick={e => e.stopPropagation()} className="w-full mx-4 max-w-[400px] sm:max-w-[460px] bg-slate-100 rounded-lg px-6 sm:px-8 py-7 sm:py-8 flex flex-col items-center gap-4">
          <div className='bg-red-200 rounded-full p-2'>
            <Trash2 className='text-red-500 size-8 sm:size-10' />
          </div>
          <h2 className="text-black sm:text-lg font-medium text-center break-words">Are you sure you want to delete the note "{noteTitle}"?</h2>
          <div className="w-full flex gap-6 sm:gap-8 mt-2">
              <button onClick={closeModal} className='flex-1 py-1 sm:py-2 px-4 bg-gray-300 hover:bg-gray-400 text-gray-800 hover:text-gray-100 font-medium rounded-full cursor-pointer transition duration-200 ease-in-out'>Cancel</button>
              <button onClick={deleteNote} className='flex-1 py-1 sm:py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded-full cursor-pointer transition duration-200 ease-in-out'>Delete</button>
          </div>
        </div>
    </div>
  )
}
