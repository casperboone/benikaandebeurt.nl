// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  success: boolean
}

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  console.log(parseInt(Array.isArray(req.query.year) ? req.query.year[0] : req.query.year))
  res.status(200).json({ success: parseInt(Array.isArray(req.query.year) ? req.query.year[0] : req.query.year) < 1996 })
}
