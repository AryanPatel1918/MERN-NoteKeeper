export default function DeleteModal({ closeModal, deleteNote, noteTitle }) {
  return (
    <div onClick={closeModal} className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center">
        <div onClick={e => e.stopPropagation()} className="w-[60%] h-[200px] bg-slate-100 rounded-2xl flex justify-center items-center">
            <div className="w-[80%] flex flex-col justify-center items-center gap-6">
                <h2 className="text-black text-xl font-medium text-center">Are you sure you want to delete note "{noteTitle}"?</h2>
                <div className="w-full flex gap-8">
                    <button onClick={closeModal} className='flex-1 py-2 px-4 bg-gray-300 hover:bg-gray-400 text-gray-800 hover:text-gray-100 font-medium rounded-full cursor-pointer transition duration-200 ease-in-out'>Cancel</button>
                    <button onClick={deleteNote} className='flex-1 py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded-full cursor-pointer transition duration-200 ease-in-out'>Delete</button>
                </div>
            </div>
        </div>
    </div>
  )
}
