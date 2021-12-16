import axios from 'axios'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'

export default function Year() {
  const { slug } = useRouter().query
  useEffect(() => { setYear(slug?.[0]) }, [slug])

  const [year, setYear] = useState(slug?.[0])

  const [available, setAvailable] = useState(undefined)

  useEffect(() => {
    (async () => {
      const url = process && process.env.NODE_ENV === 'development'
        ? `/api/dev/${year}`
        : `/cors-proxy/vaccinatie/programma/booster/${year}/NEE`

      const response = await axios.get(url)
      
      if ('success' in response.data) {
        setAvailable(response.data.success)
      } else {
        // TODO: Display error
      }
    })()
  }, [year])

  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex flex-col justify-center items-center ">
        <div className="text-4xl mb-12">
          { available === undefined ? <Spinner /> : (available ? 'Ja' : 'Nee') }
        </div>
        <a href="/" className="border-b border-dashed border-gray-800">
          &laquo; Check een ander jaar
        </a>
      </div>
    </div>
  )
}

function Spinner() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className="animate-spin h-8 w-8 text-black"
      viewBox="0 0 24 24"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        className="opacity-25"
      ></circle>
      <path
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        className="opacity-75"
      ></path>
    </svg>
  );
}
