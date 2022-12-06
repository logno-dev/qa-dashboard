import Layout from '../../components/layout'
import BatchLotSelector from '../../components/batchLotSelector'
import FermentedBatchEntry from '../../components/fermentedBatchEntry'
import CheeseBatchEntry from '../../components/cheeseBatchEntry'
import EslBatchEntry from '../../components/eslBatchEntry'
import InfoWidget from '../../components/infoWidget'
import SampleWidget from '../../components/widgets/sampleWidget'
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
  const [savedItem, setSavedItem] = useState(data[data.findIndex(e => e.lot === id)])

  useEffect(() => {
    setSelectedLot(data[data.findIndex(e => e.lot === id)])
    setSavedItem(data[data.findIndex(e => e.lot === id)])
    // console.log(selectedLot)
    // console.log(data[data.findIndex( e => e.lot === id)])
  }, [id])

  // useEffect(() => {
  //   console.log(selectedLot)
  // }, [selectedLot])


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
  }, [saved]);

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

  const ProductTypeDisplayCheck = ({ item }) => {
    if (item.fermented) {
      return (
        <FermentedBatchEntry product={item} handleChange={updateItemFromChild} />
      )
    } else if (item.productType === 'cheese') {
      return (
        <CheeseBatchEntry product={item} handleChange={updateItemFromChild} />
      )
    } else {
      return (
        <EslBatchEntry product={item} handleChange={updateItemFromChild} />
      )
    }
  }


  function updateItemFromChild(product, firstLoad) {
    setSelectedLot(product)
    if (JSON.stringify(savedItem) === JSON.stringify(product)) {
      setSaved(true)
      setChanged(false)
    } else if (!firstLoad) {
      setChanged(true)
      setSaved(false)
    } else if (firstLoad) {
      setChanged(false)
      setSaved(true)
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
      setSavedItem(selectedLot)
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
          <div className="data-entry flex flex-col items-center flex-grow p-4">
            {selectedLot ? (
              <>
                {/* <ProductTypeDisplayCheck item={selectedLot} /> */}
                {(selectedLot.fermented) ?
                  <FermentedBatchEntry product={selectedLot} handleChange={updateItemFromChild} />
                  : null
                }
                {(selectedLot.productType === 'esl') ?
                  <EslBatchEntry product={selectedLot} handleChange={updateItemFromChild} />
                  : null
                }
                {(selectedLot.productType === 'cheese') ?
                  <CheeseBatchEntry product={selectedLot} handleChange={updateItemFromChild} />
                  : null
                }
                <button type="button" onClick={e => handleSave(e, selectedLot)} className="button m-2">Save</button>
                <Status />
              </>
            ) :
              (<h2 className="text-3xl">Lot not found</h2>)
            }
          </div>
          <InfoWidget>
            <SampleWidget />
          </InfoWidget>
        </div>
      </Layout>
    </>
  )
}
