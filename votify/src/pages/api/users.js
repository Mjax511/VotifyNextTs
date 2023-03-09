import dbConnect from '../../lib/dbconnect'
import User from '../../models/users'

export default async function handler (req, res) {
  const { method } = req
  await dbConnect()
  switch (method) {
    case 'GET':
      try {
        console.log(User)
        const users = await User.find({})
        res.status(200).json({ success: true, data: users })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        console.log('here s',JSON.stringify(req.body))
        console.log('plain req.body', req.body)

        const user = await User.create({... req.body})
        res.status(201).json({ success: true, data: user })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
