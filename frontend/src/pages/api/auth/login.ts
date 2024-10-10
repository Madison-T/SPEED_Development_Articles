import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type Data = {
  access_token?: string;
  message?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { username, password } = req.body;

  try {
    // Send the login request to the Nest.js backend
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      username,
      password,
    });

    // Return the JWT token if login is successful
    res.status(200).json(response.data);
  } catch {
    // Handle any errors and return a 401 status with an error message
    res.status(401).json({ message: 'Invalid credentials' });
  }
}
