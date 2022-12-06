import { useState, useEffect } from 'react'

export default function CheeseBatchEntry({ product, handleChange }) {
  const [childItem, setChildItem] = useState(product)
  const [firstLoad, setFirstLoad] = useState(true)

  function localChange(category, field, targetValue) {
    setChildItem({
      ...childItem, [category]: {
        ...childItem[category], [field]: targetValue
      }
    })
  }

  function localChangeArray(category, index, field, targetValue) {
    let tempArrayCopy = [...childItem[category]].map((item, i) => {
      if (i === index) {
        let newItem = { ...item, [field]: targetValue }
        return newItem
      } else {
        return item
      }
    })
    setChildItem({
      ...childItem, [category]: tempArrayCopy
    })
  }

  function addBatch(e) {
    e.preventDefault()
    let emptyBatch = {
      batchNum: (childItem.batches.length + 1),
      solids: "",
      pH: "",
      brix: "",
      passFail: "",
      signOff: "",
    }
    let newBatchArray = [...childItem.batches]
    newBatchArray.push(emptyBatch)
    // console.log(newBatchArray)
    setChildItem({
      ...childItem, batches: newBatchArray
    })
  }

  function addFermCheck(e) {
    e.preventDefault()
    let emptyFermCheck = {
      time: "",
      solids: "",
      pH: "",
      brix: "",
      temp: "",
      passFail: "",
      signOff: ""
    }
    let newFermCheckArray = [...childItem.batches]
    newBatchArray.push(emptyFermCheck)
    console.log(newFermCheckArray)
    setChildItem({
      ...childItem, fermQA: newFermCheckArray
    })
  }

  useEffect(()=>{
  // console.log(saveCompareItem)
  },[product])

  useEffect(() => {
    handleChange(childItem, firstLoad)
    setFirstLoad(false)
  }, [childItem])

  useEffect(() => {
     if (!childItem || JSON.stringify(product) !== JSON.stringify(childItem)) {
      setFirstLoad(true) }
    if (JSON.stringify(product) !== JSON.stringify(childItem) && product.lot === childItem.lot) {
      setFirstLoad(false)
    } 
    setChildItem(product)
  }, [product])

  return (
    <>
      <div className="flex justify-evenly gap-8 text-3xl font-bold text-blue-800 p-4">
        <h2>Product Type: <span className="text-orange-800">{childItem.productType}</span></h2>
        <h2> Lot: <span className="text-orange-800">{childItem.lot}</span></h2>
      </div>
      {/* <h3 className="text-2xl">UHT Ops</h3> */}
      {/* <table> */}
      {/*   <thead> */}
      {/*     <tr> */}
      {/*       <th> */}
      {/*         Ferm Tank Start Weight(lbs) */}
      {/*       </th> */}
      {/*       <th> */}
      {/*         Agitation Start */}
      {/*       </th> */}
      {/*       <th> */}
      {/*         Innoc Time */}
      {/*       </th> */}
      {/*       <th> */}
      {/*         Innoc By */}
      {/*       </th> */}
      {/*       <th> */}
      {/*         Flash Psi */}
      {/*       </th> */}
      {/*       <th> */}
      {/*         Agitation End */}
      {/*       </th> */}
      {/*     </tr> */}
      {/*   </thead> */}
      {/*   <tbody> */}
      {/*     <tr> */}
      {/*       <td><input type="text" value={childItem.ferm.tankStart} onChange={(e) => localChange('ferm', 'tankStart', e.target.value)}></input></td> */}
      {/*       <td><input type="time" value={childItem.ferm.agStart} onChange={(e) => localChange('ferm', 'agStart', e.target.value)}></input></td> */}
      {/*       <td><input type="time" value={childItem.ferm.innocTime} onChange={(e) => localChange('ferm', 'innocTime', e.target.value)}></input></td> */}
      {/*       <td><input type="text" value={childItem.ferm.innocBy} onChange={(e) => localChange('ferm', 'innocBy', e.target.value)}></input></td> */}
      {/*       <td><input type="text" value={childItem.ferm.flash} onChange={(e) => localChange('ferm', 'flash', e.target.value)}></input></td> */}
      {/*       <td><input type="time" value={childItem.ferm.agEnd} onChange={(e) => localChange('ferm', 'agEnd', e.target.value)}></input></td> */}
      {/*     </tr> */}
      {/*   </tbody> */}
      {/* </table> */}
    </>
  )
}
