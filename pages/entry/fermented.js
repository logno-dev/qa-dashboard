import Layout from '../../components/layout'
import ProductSelect from '../../components/productSelect'

export default function Entry(){
  return (
    <Layout title="Entry">
      <ProductSelect 
        dir="entry"
        active="fermented"
      />
      <div className="bg-cyan-600">
        <div className="bg-white rounded-md my-4 mx-auto max-w-[calc(100%-2rem)] p-4">fermented info here</div>
      </div>
    </Layout>
  )
}