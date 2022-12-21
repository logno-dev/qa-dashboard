import { useState, useEffect } from 'react'
import clientPromise from '../../lib/mongodb'
import { useRouter } from 'next/router'
import Link from 'next/link'

export async function getServerSideProps() {
  try {
    const client = await clientPromise
    const db = client.db("authenticate")
    const tokens = await db.collection("tokens").find({}).toArray()
    return {
      props: {
        data: JSON.parse(JSON.stringify(tokens))
      }
    }
  } catch (e) {
    console.log(e)
    return {
      props: {
        data: false
      }
    }
  }

}

export default function ChangePassword({ data }) {
  const router = useRouter()
  const { token } = router.query
  const user = data[data.findIndex(item => item.token === token)]
  const email = user.email
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [valid, setValid] = useState(false)
  const [success, setSuccess] = useState(false)

  function validation() {
    if (password && password.length > 5 && password === confirmPassword) {
      setValid(true)
    } else {
      setValid(false)
    }
  }

  useEffect(() => {
    validation()
  }, [confirmPassword, password])

  async function handleSubmit(e) {
    e.preventDefault()
    const reqBody = {
      email: email,
      password: password
    }
    try {
      await fetch('/api/changePass', {
        method: 'PUT',
        body: JSON.stringify(reqBody)
      })
    } catch (error) {
      console.log(error)
    } finally {
      setSuccess(true)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-900">
      {success ? (
        <>
          <p className="text-3xl font-bold">Password changed successfully</p>
          <Link href='/' className="text-4xl font-bold button m-4">Return to Home Page</Link>
        </>
      ) : (
        <>

          {email ? (
            <form className="p-8 rounded-xl shadow-lg flex flex-col gap-2 bg-white" >
              <h2>Please set a new password</h2>
              <h4 className="text-gray-500">Passwords must be at least 6 characters long</h4>
              <label>Email:</label>
              <p className="text-lime-700">{email}</p>
              <label htmlFor="password">New Password:</label>
              <input className="p-2 rounded-md bg-gray-200" type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input className="p-2 rounded-md bg-gray-200" type="password" id="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
              {valid ? (
                <button type="button" className="button" onClick={e => handleSubmit(e)}>Submit</button>
              ) : (
                <button type="button" className="button-disabled hover:cursor-default" onClick={null}>Submit</button>
              )}
            </form>
          ) :
            (
              <p className="text-lg">Invalid Token</p>
            )}
        </>
      )}
    </div>
  )

}
