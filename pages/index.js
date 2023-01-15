// import clientPromise from "../lib/mongodb";
import Layout from '../components/layout'
import Link from "next/link";
import { useSession } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react';
import clientPromise from '../lib/mongodb';
import { format } from 'date-fns';

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("communication");

    const data = await db.collection("messages").find({}).limit(100).toArray();

    return {
      props: { data: JSON.parse(JSON.stringify(data)) },
    };
  } catch (e) {
    console.log(e);
    return {
      props: { data: [{ date: "invalid", contents: "error loading messages" }] },
    };
  }
}

export default function Home({ data }) {
  const { data: session, status } = useSession()
  const [newMessage, setNewMessage] = useState('')
  const [messageList, setMessageList] = useState(data)

  const messageBoardScroll = useRef(null)

  const sendIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
    </svg>

  )

  async function addNewMessage(e) {
    e.preventDefault()
    const body = {
      date: format(new Date(), 'MM-dd-yyyy h:mm:ssbb'),
      contents: newMessage
    }
    try {
      fetch('/api/addMessage', {
        method: 'POST',
        body: JSON.stringify(body)
      })
    } catch (e) {
      console.log(e)
    } finally {
      setMessageList([...messageList, body])
      setNewMessage('')
    }
  }

  function onEnterPress(e) {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      if (newMessage) {
        addNewMessage(e)
      };
    }
  }

  useEffect(() => {
    if (messageBoardScroll.current) {
      messageBoardScroll.current.scrollTop = messageBoardScroll.current.scrollHeight
    }
    console.log(messageBoardScroll)
  }, [messageBoardScroll, messageList])

  return (
    <> <Layout title="Home">
      <div className="flex justify-center p-12">
        <div className="max-w-3xl text-lg leading-8">

          <h2>Message Board</h2>
          <div className="border-2 border-gray-500 rounded-xl">

            <div className="max-h-60 overflow-y-scroll" ref={messageBoardScroll}>
              {messageList.length > 0 ? (
                <ul>
                  {messageList.map(message => (
                    <li key={message.date} className="p-2">
                      <p className="text-sm text-gray-400">{message.date}</p>
                      <p className="text-2xl">{message.contents}</p>
                    </li>
                  ))}
                </ul>
              ) : <h2>No messages to show</h2>}

            </div>
            <form id="messageboard" className="flex gap-1 m-1">
              <textarea rows={1} className="flex-grow rounded-xl" value={newMessage} onChange={e => setNewMessage(e.target.value)} onKeyDown={onEnterPress} />
              {newMessage ?
                (<button type="submit" className="button" onClick={e => addNewMessage(e)}>{sendIcon}</button>)
                :
                (<button type="button" className="button-disabled" onClick={e => e.preventDefault()}>{sendIcon}</button>)}
            </form>
          </div>

          <h1 className="text-5xl">Welcome!</h1>
          <p className="text-xl">This project is currently under construction.</p>
        </div>
      </div>
    </Layout>
    </>
  );
}
