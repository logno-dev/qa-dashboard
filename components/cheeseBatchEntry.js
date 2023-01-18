import { useState, useEffect } from 'react'
import format from 'date-fns/format'
import Plus from './icons/plus'
import Ex from './icons/ex'

export default function CheeseBatchEntry({ product, handleChange }) {
  const [childItem, setChildItem] = useState(product)
  const [firstLoad, setFirstLoad] = useState(true)
  const [newComment, setNewComment] = useState()

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
      time: "",
      finishedpH: "",
      finishedMoisture: "",
      signOff: ""
    }
    let newBatchArray = [...childItem.batches]
    newBatchArray.push(emptyBatch)
    // console.log(newBatchArray)
    setChildItem({
      ...childItem, batches: newBatchArray
    })
  }

  function addComment() {
    let commentObject = {
      date: format(new Date(), 'MM-dd-yyy h:mmaa'),
      contents: newComment
    }

    let newCommentArray = [...childItem.comments]
    newCommentArray.push(commentObject)

    setChildItem({
      ...childItem, comments: newCommentArray
    })
    setNewComment("")
  }

  function removeEmptyLine(array, i, e) {
    e.preventDefault()
    let tempObject = { ...childItem }
    tempObject[array].splice(i, 1)
    setChildItem(tempObject)
  }


  useEffect(() => {
    handleChange(childItem, firstLoad)
    setFirstLoad(false)
  }, [childItem])

  useEffect(() => {
    if (!childItem || JSON.stringify(product) !== JSON.stringify(childItem)) {
      setFirstLoad(true)
    }
    if (JSON.stringify(product) !== JSON.stringify(childItem) && product.lot === childItem.lot) {
      setFirstLoad(false)
    }
    setChildItem(product)
    setNewComment("")
  }, [product])

  return (
    <>
      <div className="flex justify-evenly gap-8 text-3xl font-bold text-blue-800 p-4">
        <h2>Product Type: <span className="text-orange-800">{childItem.productType}</span></h2>
        <h2> Lot: <span className="text-orange-800">{childItem.lot}</span></h2>
      </div>
      <h3 className="text-2xl">Batch Data</h3>
      <table>
        <thead>
          <tr>
            <th>
              Batch #
            </th>
            <th>
              Time
            </th>
            <th>
              Finished pH
            </th>
            <th>
              Finished Moisture %
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
              <td>{childItem.finalized ? batch.time : <input type="time" value={batch.time} onChange={(e) => localChangeArray('batches', i, 'time', e.target.value)}></input>}</td>
              <td>{childItem.finalized ? batch.finishedpH : <input type="text" value={batch.finishedpH} onChange={(e) => localChangeArray('batches', i, 'finishedpH', e.target.value)}></input>}</td>
              <td>{childItem.finalized ? batch.finishedMoisture : <input type="text" value={batch.finishedMoisture} onChange={(e) => localChangeArray('batches', i, 'finishedMoisture', e.target.value)}></input>}</td>
              <td>{childItem.finalized ? batch.signOff : <input type="text" value={batch.signOff} onChange={(e) => localChangeArray('batches', i, 'signOff', e.target.value)}></input>}</td>
              {childItem.finalized ? null : (
                <td>
                  {(Object.values(batch).every(x => x === "")) ? (
                    <button type="button" onClick={(e) => removeEmptyLine("batches", i, e)} className="float-right text-red-600"><Ex /></button>
                  ) : null}
                </td>
              )}
            </tr>
          ))}
          {childItem.finalized ? null : (
            <tr>
              <td colSpan={6}>
                <button type="button" className="flex w-full justify-center font-extrabold text-green-500 hover:bg-green-500 hover:text-white rounded" onClick={addBatch}><Plus /></button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <ul>
        {childItem.comments.map((comment) => (
          <li key={comment.date}>{comment.date} - {comment.contents}</li>
        ))}
      </ul>
      {childItem.finalized ? null : (
        <div className="flex justify-center items-center">
          <textarea rows={4} cols={90} placeholder="comments..." value={newComment} onChange={(e) => setNewComment(e.target.value)} />
          <button type="button" className="button m-2" onClick={addComment} >Add<br />Comment</button>
        </div>
      )}
    </>
  )
}
