import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { format } from 'date-fns'
import uuid from 'react-uuid'


export default function BatchLotSelector({ data }) {

  const [tankNum, setTankNum] = useState('')
  const [productType, setProductType] = useState('')
  const [productSubType, setProductSubType] = useState('')
  const [valid, setValid] = useState(true)
  const [duplicate, setDuplicate] = useState(false)
  const [addingLot, setAddingLot] = useState(false)

  const router = useRouter()

  function resetErrors() {
    setValid(true)
    setDuplicate(false)
  }

  useEffect(() => {
    setAddingLot(false)
  }, [data])

  async function addNewLot(e) {
    e.preventDefault()
    const lot = format(new Date(), 'MMddyyy') + '-' + tankNum
    const altLot = format(new Date(), 'MMddyyy') + '-' + productSubType
    if (
      ((
        productType !== 'esl' &&
        productType !== 'cheese'
      )
        &&
        (!tankNum ||
          tankNum.length !== 4 ||
          !productType
        ))
      ||
      (
        (productType === 'esl' || productType === 'cheese')
        &&
        (!productSubType)
      )
    ) {
      setValid(false)
      return
    } else if (
      (((productType !== 'esl' && productType !== 'cheese') && ((data.findIndex(e => e.lot === lot)) !== -1)) ||
        ((productType === 'esl' || productType === 'cheese') && (data.findIndex(e => e.lot === altLot) !== -1))
      )
    ) {
      setDuplicate(true)
      return
    } else {
      let newProduct
      switch (productType) {
        case 'esl':
          newProduct = {
            _id: uuid(),
            dateAdded: new Date(),
            lot: altLot,
            tankNum,
            productType,
            fermented: false,
            finalized: false,
            batches: [
              {
                batchNum: 1,
                solids: "",
                pH: "",
                brix: "",
                passFail: "",
                signOff: ""
              }
            ]
          }
          break
        case 'cheese':
          newProduct = {
            _id: uuid(),
            dateAdded: new Date(),
            lot: altLot,
            tankNum,
            productType,
            fermented: false,
            finalized: false,
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
                temp: "",
                passFail: "",
                signOff: ""
              }
            ],
            transfer: {
              breakTimeStart: "",
              pH: "",
              speed: "",
              temp: "",
              whiteMassWeight: "",
              holdTankWeightStart: "",
              holdTankWeightEnd: "",
              breakTimeEnd: "",
              signOff: ""
            }
          }
      }
      setAddingLot(true)
      try {
        await fetch('/api/addLot', {
          method: 'POST',
          body: JSON.stringify(newProduct)
        })
      } catch (e) {
        console.log(e)
      } finally {
        setTankNum('')
        setProductType('')
        setProductSubType('')
        return router.push(`/batching/${newProduct.lot}`)
      }
    }
  }



  return (
    <>
      <div className="item-selector min-w-[20rem] p-4">
        <form className="flex flex-col gap-2  border-4 border-green-700 rounded-md p-2" onChange={resetErrors}>
          <select value={productType} onChange={(e) => setProductType(e.target.value)}>
            <option value="">Select product type</option>
            <option value="yogurt">Yogurt</option>
            <option value="kefir">Kefir</option>
            <option value="tj-yogurt">TJ Yogurt</option>
            <option value="sour-cream">Sour Cream</option>
            <option value="esl">ESL</option>
            <option value="cheese">Cheese</option>
          </select>
          {(productType === 'esl') ?
            (<select value={productSubType} onChange={(e) => setProductSubType(e.target.value)}>
              <option value="">Choose sub type</option>
              <option value="cashewmilk">Cashew Milk</option>
              <option value="oatmilk">Oat Milk</option>
              <option value="nutsAndVanilla">Nuts and Vanilla</option>
              <option value="nutsAndCocoa">Nuts and Cocoa</option>
            </select>)
            :
            null}
          {(productType === 'cheese') ?
            (<select value={productSubType} onChange={(e) => setProductSubType(e.target.value)}>
              <option value="">Choose sub type</option>
              <option value="whiteCheese">White Cheese</option>
              <option value="cheddar">Cheddar</option>
              <option value="parmesan">Parmesan</option>
            </select>)
            :
            null}

          {(productType && productType !== 'esl' && productType !== 'cheese') ?
            <div>Tank:<input type="text" value={tankNum} placeholder="####" onChange={(e) => setTankNum(e.target.value)}></input></div>
            :
            null
          }
          {addingLot ?
            <button type="button" onClick={e => e.preventDefault()} className="button-disabled">Adding lot...</button>
            :
            <button type="button" onClick={addNewLot} className="button">+ Add new lot</button>
          }
          {valid ? null : <p className="text-red-700">*Please fill out all fields</p>}
          {duplicate ? <p className="text-red-700">*This lot already exists</p> : null}
        </form>
        <ul className="p-2">
          {data.map((item) => (
            <li key={item._id} className="p-2"><Link href={`/batching/${item.lot}`} className={item.finalized? "bg-gray-200 p-2 rounded-md hover:bg-gray-300" : "bg-blue-200 p-2 rounded-md hover:bg-blue-300"} >{item.lot}-{item.productType}</Link></li>
          ))}
        </ul>
      </div>
    </>
  )
}
