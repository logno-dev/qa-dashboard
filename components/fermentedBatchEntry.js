import { useState, useEffect } from 'react'

export default function FermentedBatchEntry({ product, handleChange }) {
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
    let emptyBatch =  {
                batchNum: (childItem.batches.length + 1),
                solids: "",
                pH: "",
                brix: "",
                passFail: "",
                signOff: "",
              }
    let newBatchArray = [...childItem.batches]
    newBatchArray.push(emptyBatch)
    console.log(newBatchArray)
    setChildItem({
      ...childItem, batches: newBatchArray
    })
  }

  useEffect(() => {
    handleChange(childItem, firstLoad)
    setFirstLoad(false)
  }, [childItem])

  useEffect(() => {
    setChildItem(product)
    setFirstLoad(true)
  }, [product])

  return (
    <>
      <div className="flex justify-evenly gap-8 text-3xl font-bold text-blue-800 p-4">
        <h2>Product Type: <span className="text-orange-800">{childItem.productType}</span></h2>
        <h2> Lot: <span className="text-orange-800">{childItem.lot}</span></h2>
      </div>
      <h3 className="text-2xl">UHT Ops</h3>
      <table>
        <thead>
          <tr>
            <th>
              Ferm Tank Start Weight
            </th>
            <th>
              Agitation Start
            </th>
            <th>
              Innoc Time
            </th>
            <th>
              Innoc By
            </th>
            <th>
              Flash Psi
            </th>
            <th>
              Agitation End
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="text" value={childItem.ferm.tankStart} onChange={(e) => localChange('ferm', 'tankStart', e.target.value)}></input></td>
            <td><input type="time" value={childItem.ferm.agStart} onChange={(e) => localChange('ferm', 'agStart', e.target.value)}></input></td>
            <td><input type="time" value={childItem.ferm.innocTime} onChange={(e) => localChange('ferm', 'innocTime', e.target.value)}></input></td>
            <td><input type="text" value={childItem.ferm.innocBy} onChange={(e) => localChange('ferm', 'innocBy', e.target.value)}></input></td>
            <td><input type="text" value={childItem.ferm.flash} onChange={(e) => localChange('ferm', 'flash', e.target.value)}></input></td>
            <td><input type="time" value={childItem.ferm.agEnd} onChange={(e) => localChange('ferm', 'agEnd', e.target.value)}></input></td>
          </tr>
        </tbody>
      </table>
      <h3 className="text-2xl">Raw Batching</h3>
      <table>
        <thead>
          <tr>
            <th>
              Batch #
            </th>
            <th>
              Solids
            </th>
            <th>
              pH
            </th>
            <th>
              Brix
            </th>
            <th>
              Pass/Fail
            </th>
            <th>
              Sign Off
            </th>
          </tr>
        </thead>
        <tbody>
          {childItem.batches.map((batch, i) => (
            <tr key={i}>
              <td>{batch.batchNum}</td>
              <td><input type="text" value={batch.solids} onChange={(e) => localChangeArray('batches', i, 'solids', e.target.value)}></input></td>
              <td><input type="text" value={batch.pH} onChange={(e) => localChangeArray('batches', i, 'pH', e.target.value)}></input></td>
              <td><input type="text" value={batch.brix} onChange={(e) => localChangeArray('batches', i, 'brix', e.target.value)}></input></td>
              <td><select value={batch.passFail} onChange={(e) => localChangeArray('batches', i, 'passFail', e.target.value)}>
                <option value="">---</option>
                <option value="pass">Pass</option>
                <option value="fail">Fail</option>
              </select></td>
              <td><input type="text" value={batch.signOff} onChange={(e) => localChangeArray('batches', i, 'signOff', e.target.value)}></input></td>
            </tr>
          ))}
          <tr>
            <td colSpan={6}>
              <button type="button" onClick={addBatch}>+Add new batch</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
