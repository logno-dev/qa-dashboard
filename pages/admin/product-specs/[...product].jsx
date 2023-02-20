import { useSession } from "next-auth/react";
import AdminNav from "../../../components/admin/nav";
import Layout from "../../../components/layout";




export default function Admin() {

  const { data: session, status } = useSession()


  return (
    <Layout>
      {status === "authenticated" ? (
        <>
          {session.user.role === "admin" ? (
            <div className="body-wrapper">

              <AdminNav />

              <div className="flex items-stretch">
                <div className="bg-gray-500"></div>
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
