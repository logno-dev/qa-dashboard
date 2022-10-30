import Layout from '../../components/layout'
import ProductSelect from '../../components/productSelect'

export default function Entry(){
  return (
    <Layout title="Entry">
      <ProductSelect 
        dir="entry"
        active="ESL"
      />
      <div className="bg-purple-700">
        <div className="bg-white rounded-md my-4 mx-auto max-w-[calc(100%-2rem)] p-4">ESL info here</div>
      </div>
    </Layout>
  )
}