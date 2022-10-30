import Layout from '../../components/layout'
import ProductSelect from '../../components/productSelect'

export default function Entry(){
  return (
    <Layout title="Entry">
      <ProductSelect 
        dir="entry"
        active="null"
      />
      <h2 className="text-5xl m-auto p-10">Please choose a process type</h2>
    </Layout>
  )
}