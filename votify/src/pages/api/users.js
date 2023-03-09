import dbConnect from '../../lib/dbconnect'
import User from '../../models/users'

export default async function handler (req, res) {
  const { method } = req
  await dbConnect()
  switch (method) {
    case 'GET':
      // try {
      //   const users = await User.find({})
      //   res.status(200).json({ success: true, data: users })
      // } catch (error) {
      //   res.status(400).json({ success: false })
      // }
      const userEndpoint = 'https://api.spotify.com/v1/me';

    
      const access_token = req.cookies.sAT;

      const userHeaders = new Headers();
      userHeaders.append('Authorization', `Bearer ${access_token}`);
      userHeaders.append('Content-Type', 'application/json');

      const userRequestOptions = {
        method: 'get',
        headers: userHeaders,
      };

      let data = 'test';
      if (access_token){
        const user = await fetch(userEndpoint, { ...userRequestOptions })
        data = await user.json();
      }

      console.log('inside api', data)

      res.status(200).json({data});

      break
    case 'POST':
      try {
        console.log('plain req.body', req.body)
        console.log(req.body.access_token)
        const {access_token, refresh_token, spotify_id} = req.body;

        const newUser = {access_token, refresh_token, spotify_id};

        const user = await User.create(newUser)
        res.status(201).json({ success: true, data: user })
      } catch (error) {
        console.log('creation failed')
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
