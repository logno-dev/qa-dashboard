import { useEffect, useState } from 'react'

export default function NewLotModal({handleSubmit, currentDate}) {
    // const [date, setDate] = useState(currentDate)
    const [isOpen, setIsOpen] = useState(false)
    const [newLot, setNewLot] = useState()

    function localSubmit(e) {
        handleSubmit(newLot)
        setIsOpen(false)
    }


    // useEffect(()=>{
    //     const date = new Date()
    //     const formatedDate = (date.getMonth() + 1).toString().padStart(2, '0') + date.getDate().toString().padStart(2, '0') + date.getFullYear().toString().slice(-2)
    //     setDate(formatedDate)
    // },
    // [])

    return (
        <>
            {isOpen
            ?<div className="flex">
                <input type="number" placeholder="Ferm Tank#" onChange={(e)=>setNewLot({...newLot, lot:`${currentDate}-${e.target.value}`})}></input>
                <select onChange={(e)=>setNewLot({...newLot, type:e.target.value})}>
                    <option value={null}>-select mass type-</option>
                    <option value="yogurt">Yogurt</option>
                    <option value="kefir">Kefir</option>
                    <option value="sour-cream">Sour Cream</option>
                </select>
                <button type="button" onClick={localSubmit}>Add Lot</button>
            </div>
            :<button type="button"  onClick={()=>setIsOpen(true)}>Add New Lot</button>}
        </>
    )
}
