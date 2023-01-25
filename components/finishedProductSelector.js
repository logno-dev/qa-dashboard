import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { format } from 'date-fns'
import uuid from 'react-uuid'


export default function FinishedProductSelector({ data }) {
  const router = useRouter()
  const [valid, setValid] = useState(true)
  const [duplicate, setDuplicate] = useState(false)
  const [addingProd, setAddingProd] = useState(false)
  const [productType, setProductType] = useState("")
  const [productSubType, setProductSubType] = useState("")
  const [size, setSize] = useState("")
  const [flavor, setFlavor] = useState("")


  function resetErrors() {
    setValid(true)
    setDuplicate(false)
  }

  useEffect(() => {
    setProductSubType("")
    setSize("")
    setFlavor("")
  }, [productType])

  useEffect(() => {
    if (productSubType === 'sourCream') {
      setSize('12')
      setFlavor('sourCream')
    }
  }, [productSubType])

  function validateInput(e) {
    e.preventDefault()

    if (flavor === "") {
      setValid(false)
      return
    }
    if (data.findIndex(e => e.id === (format(new Date(), 'MMddyy') + '-' + size + '-' + flavor)) !== -1) {
      setDuplicate(true)
      return
    }

    addProd()
  }

  async function addProd() {

    let newProd = {
      _id: uuid(),
      id: format(new Date(), 'MMddyy') + '-' + size + '-' + flavor,
      finalized: false,
      type: productType,
      subType: productSubType,
      size: size,
      flavor: flavor,
      enjoyBy: "",
      label: "",
      comments: [],
      shelfLife: {
        dateChecked: "",
        pH: "",
        seperation: "",
        taste: "",
        smell: "",
        appearance: "",
        spoil: "",
        passFail: "",
        signOff: ""
      },
      samples: [
        {
          fermCircuit: "",
          BME: "",
          enjoyBy: "",
          time: "",
          temp: "",
          solids: "",
          pH: "",
          brix: "",
          viscosityDayOne: "",
          viscosityFinal: "",
          label: "",
          passFail: "",
          signOff: "",
        }
      ]
    }

    if (!valid || duplicate) {
      return
    } else {

      setAddingProd(true)

      try {
        await fetch('/api/addFinishedProd', {
          method: 'POST',
          body: JSON.stringify(newProd)
        })
      } catch (e) {
        console.log(e)
      } finally {
        setAddingProd(false)
        setProductType("")
        return router.push(`/finished_product/${newProd.id}`)
      }
    }
  }




  return (
    <>
      <div className="body-wrapper overflow-y-scroll item-selector min-w-[20rem] p-4">
        <form className="flex flex-col gap-2  border-4 border-green-700 rounded-md p-2" onChange={resetErrors}>
          <select value={productType} onChange={(e) => setProductType(e.target.value)} >
            <option value="" >Select Product Type</option>
            <option value="fermented">Fermented</option>
            <option value="esl">ESL</option>
          </select>
          {productType ? (
            <>
              {productType == 'fermented' ? (
                <>
                  <select value={productSubType} onChange={e => setProductSubType(e.target.value)}>
                    <option value="">Select Sub Type</option>
                    <option value="yogurt">Yogurt</option>
                    <option value="sourCream">Sour Cream</option>
                    <option value="kefir">Kefir</option>
                  </select>

                  {(productSubType === "yogurt") ? (
                    <>
                      <select value={size} onChange={e => setSize(e.target.value)}>
                        <option value="">Select Size</option>
                        <option value="24">24oz</option>
                        <option value="5.3">5.3oz</option>
                        <option value="3.2">3.2oz</option>
                      </select>

                      {size ? (
                        <>
                          <select value={flavor} onChange={e => setFlavor(e.target.value)}>
                            <option value="">Select Flavor</option>

                            {size === '24' ? (
                              <>
                                <option value="plain">Plain</option>
                                <option value="vanilla">Vanilla</option>
                                <option value="unsVanilla">Unsweetened Vanilla</option>
                                <option value="honey">Honey Alternative</option>
                                <option value="tjPlain">TJ Plain</option>
                                <option value="canPlain">Canada Plain</option>
                                <option value="canUnsVanilla">Canada Unsweetened Vanilla</option>
                              </>
                            ) : null}

                            {size === '5.3' ? (
                              <>
                                <option value="plain">Plain</option>
                                <option value="vanilla">Vanilla</option>
                                <option value="strawberry">Strawberry</option>
                                <option value="blueberry">Blueberry</option>
                                <option value="peach">Peach</option>
                                <option value="tjVanilla">TJ Vanilla</option>
                                <option value="tjStrawberry">TJ Strawberry</option>
                              </>
                            ) : null}

                            {size === '3.2' ? (
                              <>
                                <option value="strawberry">Strawberry</option>
                                <option value="berryBerry">Berry Berry</option>
                                <option value="mango">Mango</option>
                                <option value="peach">Peach</option>
                              </>
                            ) : null}
                          </select>
                        </>
                      ) : null}


                    </>
                  ) : null}

                  {productSubType === "sourCream" ? (
                    <>
                      <p>Size: {size} oz</p>
                    </>
                  ) : null}

                  {productSubType === "kefir" ? (
                    <>
                      <select value={size} onChange={e => setSize(e.target.value)}>
                        <option value="">Select Size</option>
                        <option value="28">28oz</option>
                        <option value="12">12oz</option>
                        <option value="8">8oz</option>
                      </select>
                      {size ? (
                        <>
                          <select value={flavor} onChange={e => setFlavor(e.target.value)}>
                            <option value="">Select Flavor</option>
                            {size === '28' ? (
                              <>
                                <option value="plain">Plain</option>
                                <option value="vanilla">Vanilla</option>
                                <option value="strawberry">Strawberry</option>
                                <option value="blueberry">Blueberry</option>
                                <option value="mango">Mango</option>
                                <option value="canBlueberry">Canada Blueberry</option>
                                <option value="CanStrawberry">Canada Strawberry</option>
                              </>
                            ) : null}
                            {size === '8' ? (
                              <>
                                <option value="vanilla">Vanilla</option>
                                <option value="strawberry">Strawberry</option>
                                <option value="blueberry">Blueberry</option>
                                <option value="mango">Mango</option>
                              </>
                            ) : null}
                            {size === '12' ? (
                              <>
                                <option value="strawberry">Strawberry</option>
                                <option value="blackberry">Blackberry</option>
                                <option value="mangoPeach">Mango Peach</option>
                                <option value="mango">Mango</option>
                              </>
                            ) : null}
                          </select>
                        </>
                      ) : null}
                    </>
                  ) : null}
                </>
              ) : null}

              {productType === "esl" ? (
                <>
                  <select value={size} onChange={e => setSize(e.target.value)}>
                    <option value="">Select Size</option>
                    <option value="48">48oz</option>
                    <option value="12">12oz</option>
                  </select>
                  {size ? (
                    <>
                      <select value={flavor} onChange={e => setFlavor(e.target.value)}>
                        <option value="">Select Flavor</option>
                        {size === '48' ? (
                          <>
                            <option value="cashew">Cashewmilk</option>
                            <option value="oat">Oatmilk</option>
                          </>
                        ) : null}
                        {size === '12' ? (
                          <>
                            <option value="nutsAndVanilla">Nuts and Vanilla</option>
                            <option value="nutsAndCocoa">Nuts and Cocoa</option>
                          </>
                        ) : null}
                      </select>
                    </>
                  ) : null}
                </>
              ) : null}
            </>
          ) : null}

          {addingProd ?
            <button type="button" onClick={e => e.preventDefault()} className="button-disabled">Adding product...</button>
            :
            <button type="button" onClick={validateInput} className="button">+ Add new product</button>
          }
          {valid ? null : <p className="text-red-700">*Please fill out all fields</p>}
          {duplicate ? <p className="text-red-700">*This product already exists</p> : null}

        </form>
        <ul className="p-2">
          {data.map((item) => (
            <li key={item._id} className="p-2">
              <Link href={`/finished_product/${item.id}`} className={item.finalized ? "bg-gray-200 p-2 rounded-md hover:bg-gray-300" : "bg-blue-200 p-2 rounded-md hover:bg-blue-300"} >
                {item.id}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
