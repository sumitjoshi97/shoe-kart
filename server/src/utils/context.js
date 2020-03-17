import { decodeToken } from './token'

async function getUser(req) {
  const authHeader = req.get('authorization')
  if (!authHeader) {
    return null
  }

  const token = authHeader.split(' ')[1]
  if (!token || token === '') {
    return null
  }

  try {
    const user = decodeToken(token)
    return user
  }
  catch (err) {
    return null
  }
}

export default getUser