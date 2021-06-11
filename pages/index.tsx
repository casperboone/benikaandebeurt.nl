import { useRouter } from 'next/dist/client/router'
import { FormEvent, useEffect, useRef, useState } from 'react'

export default function Home() {
  const router = useRouter()

  const [year, setYear] = useState('')

  const redirect = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    router.push(`/jaar/${year}`)
  }

  const inputElement = useRef<HTMLInputElement>(null)
  useEffect(() => { 
    console.log(2)
    if (inputElement && inputElement.current) {
      console.log(1)
      inputElement.current.focus()
    } 
  }, [])

  return (
    <div className="h-full flex items-center justify-center">
      <form onSubmit={redirect} className="w-full flex justify-center">
        <input type="text" ref={inputElement} className="h-24 w-2/3 text-center text-4xl outline-none" placeholder="In welk jaar ben je geboren?" value={year} onChange={e => setYear(e.target.value)} />
      </form>
    </div>
  )
}
