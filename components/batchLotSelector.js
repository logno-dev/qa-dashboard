import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { format } from 'date-fns'
import uuid from 'react-uuid'


export default function BatchLotSelector({ data }) {

  const [tankNum, setTankNum] = useState('')
  const [productType, setProductType] = useState('')
  const [valid, setValid] = useState(true)
  const [duplicate, setDuplicate] = useState(false)

  const router = useRouter()

  function resetErrors() {
    setValid(true)
    setDuplicate(false)
  }

  useEffect(() => {
    // console.log(data)
  }, [])

  async function addNewLot(e) {
    e.preventDefault()
    const lot = format(new Date(), 'MMddyyy') + '-' + tankNum
    if (
      !tankNum ||
      tankNum.length !== 4 ||
      !productType
    ) {
      setValid(false)
      return
    } else if (
      (data.findIndex(e => e.lot === lot)) !== -1
    ) {
      setDuplicate(true)
      return
    } else {
      let newProduct
      switch (productType) {
        case 'esl':
          newProduct = {
            lot,
            tankNum,
            productType,
            fermented: false,
          }
          break
        default:
          newProduct = {
            _id: uuid(),
            dateAdded: new Date(),
            lot,
            tankNum,
            productType,
            fermented: true,
            finalized: false,
            ferm: {
              tankStart: "",
              agStart: "",
              innocTime: "",
              innocBy: "",
              flash: "",
              agEnd: ""
            },
            batches: [
              {
                batchNum: 1,
                solids: "",
                pH: "",
                brix: "",
                passFail: "",
                signOff: "",
              }
            ],
            fermQA: [
              {
                time: "",
                solids: "",
                pH: "",
                brix: "",
                passFail: "",
                signOff: ""
              }
            ],
            transfer: {
              breakTime: "",
              pH: "",
              speed: "",
              temp: "",
              whiteMassWeight: "",
              holdTankWeightStart: "",
              holdTankWeightEnd: ""
            }
          }
      }
      let res = await fetch('http://localhost:3000/api/addLot', {
        method: 'POST',
        body: JSON.stringify(newProduct)
      })
      // res.json(res.ops[0])
      setTankNum('')
      setProductType('')
      return router.push(`/batching/${lot}`)
    }
  }



  return (
    <>
      <div className="item-selector p-4">
        <form className="flex flex-col gap-2  border-4 border-green-700 rounded-md p-2" onChange={resetErrors}>
          <div>Tank:<input type="text" value={tankNum} placeholder="####" onChange={(e) => setTankNum(e.target.value)}></input></div>
          <select value={productType} onChange={(e) => setProductType(e.target.value)}>
            <option value="">Select product type</option>
            <option value="yogurt">Yogurt</option>
            <option value="kefir">Kefir</option>
            <option value="tj-yogurt">TJ Yogurt</option>
            <option value="sour-cream">Sour Cream</option>
            <option value="esl">ESL</option>
            <option value="cheese">Cheese</option>
          </select>
          <button type="button" onClick={addNewLot} className="button">+ Add new lot</button>
          {valid ? null : <p className="text-red-700">*Please fill out all fields</p>}
          {duplicate ? <p className="text-red-700">*This lot already exists</p> : null}
        </form>
        <ul className="p-2">
          {data.map((item) => (
            <li key={item._id}><Link href={`/batching/${item.lot}`}>{item.lot}-{item.productType}</Link></li>
          ))}
        </ul>
      </div>
    </>
  )
}
