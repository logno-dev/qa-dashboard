import { useState,useEffect } from 'react'

export default function FermentedBatchEntry({ product, handleChange }) {
  const [childItem, setChildItem] = useState(product)

  function localChange(field, targetValue) {
    setChildItem({
      ...childItem, ferm: {
        ...childItem.ferm, [field]: targetValue
      }
    })
  }

  useEffect(()=>{
    handleChange(childItem)
  },[childItem])

  return (
    <>
      <div className="flex justify-evenly gap-8 text-3xl font-bold text-blue-800 p-4">
        <h2>Product Type: <span className="text-orange-800">{childItem.productType}</span></h2>
        <h2> Lot: <span className="text-orange-800">{childItem.lot}</span></h2>
      </div>
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
            <td><input type="text" value={childItem.ferm.tankStart} onChange={(e) => localChange('tankStart', e.target.value)}></input></td>
            <td><input type="time" value={childItem.ferm.agStart} onChange={(e) => localChange('agStart', e.target.value)}></input></td>
            <td><input type="time" value={childItem.ferm.innocTime} onChange={(e) => localChange('innocTime', e.target.value)}></input></td>
            <td><input type="text" value={childItem.ferm.innocBy} onChange={(e) => localChange('innocBy', e.target.value)}></input></td>
            <td><input type="text" value={childItem.ferm.flash} onChange={(e) => localChange('flash', e.target.value)}></input></td>
            <td><input type="time" value={childItem.ferm.agEnd} onChange={(e) => localChange('agEnd', e.target.value)}></input></td>
          </tr>
        </tbody>
      </table>
      {/* <button type="button" onClick={e => handleSave(e, product)} className="button">Save</button> */}

    </>
  )
}
