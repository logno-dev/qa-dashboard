import Layout from '../../components/layout'
import BatchLotSelector from '../../components/batchLotSelector'
import FermentedBatchEntry from '../../components/fermentedBatchEntry'
import clientPromise from '../../lib/mongodb'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("products");

    const data = await db.collection("batching").find({}).sort({ dateAdded: -1 }).limit(50).toArray();

    return {
      props: { data: JSON.parse(JSON.stringify(data)) },
    };
  } catch (e) {
    // console.log(e);
    return {
      props: { data: "error loading data" },
    };
  }
}


export default function BatchLot({ data }) {

  const router = useRouter()
  const { id } = router.query
  const [selectedLot, setSelectedLot] = useState(data[data.findIndex(e => e.lot === id)])
  const [saved, setSaved] = useState(true)
  const [changed, setChanged] = useState(false)

  useEffect(() => {
    setSelectedLot(data[data.findIndex(e => e.lot === id)])
  }, [id])

  useEffect(() => {
    // console.log(selectedLot)
  }, [selectedLot])


  useEffect(() => {
    const confirmationMessage = 'Changes you made may not be saved.';
    const beforeUnloadHandler = (BeforeUnloadEvent) => {
      (e || window.event).returnValue = confirmationMessage;
      return confirmationMessage; // Gecko + Webkit, Safari, Chrome etc.
    };
    const beforeRouteHandler = (url) => {
      if (router.pathname !== url && !confirm(confirmationMessage)) {
        // to inform NProgress or something ...
        router.events.emit('routeChangeError');
        // tslint:disable-next-line: no-string-throw
        throw `Route change to "${url}" was aborted (this error can be safely ignored). See https://github.com/zeit/next.js/issues/2476.`;
      }
    };
    if (!saved) {
      window.addEventListener('beforeunload', beforeUnloadHandler);
      router.events.on('routeChangeStart', beforeRouteHandler);
    } else {
      window.removeEventListener('beforeunload', beforeUnloadHandler);
      router.events.off('routeChangeStart', beforeRouteHandler);
    }
    return () => {
      window.removeEventListener('beforeunload', beforeUnloadHandler);
      router.events.off('routeChangeStart', beforeRouteHandler);
    };
  }, [!saved]);

  const Status = () => {
    if (changed && !saved) {
      return (
        <p>Please save your changes</p>
      )
    } else if (!changed && !saved) {
      return (
        <p>Saving...</p>
      )
    } else {
      return (
        <p>Up to date as of {format(new Date(), 'M-dd-yyyy h:mmaaa')}</p>
      )
    }
  }

  function updateItemFromChild(product, firstLoad) {
    setSelectedLot(product)
    if (!firstLoad) {
      setChanged(true)
      setSaved(false)
    }
  }

  async function updateItem(lot) {
    setChanged(false)
    try {
      await fetch('/api/updateLot', {
        method: 'PUT',
        lot: lot.lot,
        body: JSON.stringify(lot)
      })
    } catch (e) {
      console.log(e)
      console.log('saving...')
    } finally {
      setSaved(true)
    }
  }

  function handleSave(e, lot) {
    e.preventDefault()
    updateItem(lot)
  }

  return (
    <>
      <Layout title="Batching">
        <div className="two-column flex">
          <BatchLotSelector data={data} />
          <div className="data-entry flex flex-col items-center flex-grow border-slate-500 border-4 p-4">
            {selectedLot? (
              <>
                <FermentedBatchEntry product={selectedLot} handleChange={updateItemFromChild} />
                <button type="button" onClick={e => handleSave(e, selectedLot)} className="button">Save</button>
                <Status />
              </>
            ) :
              (<h2 className="text-3xl">Lot not found</h2>)
            }
          </div>
          <div className="flex-grow"></div>
        </div>
      </Layout>
    </>
  )
}
