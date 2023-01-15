import { useSession } from "next-auth/react";
import Layout from "../../components/layout";




export default function Admin() {

  const { data: session, status } = useSession()


  return (
    <Layout>
      {status === "authenticated" ? (
        <>
          {session.user.role === "admin" ? (
            <div className="body-wrapper">

              <div className="flex flex-col items-center">
                <h1>Admin Panel</h1>
              </div>

            </div>
          ) : (
            <div className="flex items-center justify-center">
              <h1>Access Denied</h1>
            </div>
          )}
        </>
      ) : null}
    </Layout>
  )
}
