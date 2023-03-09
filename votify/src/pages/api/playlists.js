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
      const userEndpoint = `https://api.spotify.com/v1/users/${req.cookies.s_id}/playlists`;

    
      const access_token = req.cookies.sAT;

      const userHeaders = new Headers();
      userHeaders.append('Authorization', `Bearer ${access_token}`);
      userHeaders.append('Content-Type', 'application/json');

      const userRequestOptions = {
        method: 'GET',
        headers: userHeaders,
      };

      let data = 'test';
      if (access_token){
        const user = await fetch(userEndpoint, { ...userRequestOptions })
        data = await user.json();
      }

      res.status(200).json({data});

      break
    case 'POST':
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
