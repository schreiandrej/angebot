import { connectToDatabase } from '@/utils/dbConnection'
import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * TODO define Types for the request
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { db } = await connectToDatabase()

  const data = await req.body

  try {
    const dataToUpdate = await db.collection('preisliste').updateMany(
      { Datum: { $gt: data.date } },
      {
        $set: { ...data.price },
      }
    )

    if (!dataToUpdate) {
      return res
        .status(400)
        .json({ success: false, error: 'No Data to update!' })
    }
    res.status(200).json({ success: true, dataToUpdate })
  } catch (err) {
    console.log(err)

    res.status(400).json({ success: false, errorLevel: 'catched' })
  }
}
