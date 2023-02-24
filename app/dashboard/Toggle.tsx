'use client'

type ToggleProps = {
  delPost: () => void
  setToggle: (toggle: boolean) => void
}

export default function Toggle({ delPost, setToggle }: ToggleProps) {
  return (
    <div
      onClick={(e) => setToggle(false)}
      className="fixed bg-black/50 h-full w-full z-20 left-0 top-0"
    >
      <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
        <h3 className="text-2xl font-bold text-gray-700">
          Are you sure you want to delete this post? 😢
        </h3>
        <h3 className="text-xl text-red-400">
          This action cannot be undone and your post will be permanently{' '}
          <span className=" font-semibold text-2xl">Deleted</span>.
        </h3>
        <button className="bg-red-600 text-sm text-white py-3 px-4 rounded-lg" onClick={delPost}>
          Delete Post
        </button>
      </div>
    </div>
  )
}
