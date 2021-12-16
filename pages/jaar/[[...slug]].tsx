import axios from 'axios'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'

export default function Year() {
  const { slug } = useRouter().query
  useEffect(() => { setYear(slug?.[0]) }, [slug])

  const [year, setYear] = useState(slug?.[0])

  const [available, setAvailable] = useState(false)

  useEffect(() => {
    (async () => {
      const url = process && process.env.NODE_ENV === 'development'
        ? `/api/dev/${year}`
        : `/cors-proxy/vaccinatie/programma/booster/${year}/NEE`

      const response = await axios.get(url)
      
      console.log(response.data)

      if ('success' in response.data) {
        setAvailable(response.data.success)
      } else {
        // TODO: Display error
      }
    })()
  }, [year])

  return (
    <div className="h-full flex items-center justify-center text-4xl">
      { available ? 'Ja' : 'Nee' }
    </div>
  )
}
