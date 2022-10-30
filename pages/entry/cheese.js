import Layout from '../../components/layout'
import ProductSelect from '../../components/productSelect'

export default function Entry(){
  return (
    <Layout title="Entry">
      <ProductSelect 
        dir="entry"
        active="cheese"
      />
      <div className="bg-indigo-700">
        <div className="bg-white rounded-md my-4 mx-auto max-w-[calc(100%-2rem)] p-4">Cheese info here</div>
      </div>
    </Layout>
  )
}