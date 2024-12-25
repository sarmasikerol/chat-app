import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import Message from "../components/Message";

const ChatPage = ({ room, setRoom }) => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  // mesajı veritabanı na kaydet
  const handleSubmit = async (e) => {
    e.preventDefault();

    //mesaj boşmu kontrol et
    if (text.trim() === "") return;

    // mesaj document'in kaydedileceği kolleksiyonun referansını al
    const messagesCol = collection(db, "messages");

    // referansı alınan kolleksiyona document'ı ekle
    await addDoc(messagesCol, {
      text,
      room,
      author: {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL,
      },
      createdAt: serverTimestamp(),
    });

    // formu temizle
    setText("");
  };

  // mevcut  odada gönderilen mesajları anlık olarak al
  useEffect(() => {
    // 1) abone olunacak kolleksiyonun referansını al
    const messagesCol = collection(db, "messages");

    // onSnapshot: anlık olarak kolleksiyondaki değişimleri izler. Koleksiyon her değiştiğinde callback fn tetikler ve bu fn parametre olarak koleksiondaki veriyi alır.
    onSnapshot(messagesCol, (data) => {
      let temp = [];

      // data(): dökümanın içersindeki veriye erğişmemizi sağlar
      data.docs.forEach((doc) => {
        temp.push(doc.data());
      });

      // mesajaları state'e aktar
      setMessages(temp);
    });
  }, []);

  return (
    <div className="chat-page">
      <header>
        <p>{auth.currentUser.displayName}</p>

        <p>{room}</p>

        <button onClick={() => setRoom(null)}>Farklı Oda</button>
      </header>



      <main>
        {messages.length < 1 ? (
          <div>
            <p>Sohbete ilk mesajı gönderin</p>
          </div>
        ) : (
          messages.map((data, key) => <Message key={key} data={data} />)
        )}
      </main>



      <form onSubmit={handleSubmit} className="message-form">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="mesajınızı yazınız"
          type="text"
        />
        <button type="submit">Gönder</button>
      </form>
    </div>
  );
};

export default ChatPage;
