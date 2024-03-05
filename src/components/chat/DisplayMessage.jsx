import React from 'react'

function DisplayMessage({ userid, senderId, content }) {
  const messageClass = senderId === userid ? 'sender' : 'receiver'
  return (
    <div key={content} className={`${messageClass} mb-2 flex ${messageClass === 'sender' ? 'justify-end' : 'justify-start'}`}>
      <p className={`w-fit px-2 py-1 mx-4 my-1 rounded-xl bg-slate-200`}>{content}</p>
    </div>
  );
}

export default DisplayMessage