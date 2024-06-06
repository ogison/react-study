import React, { useEffect, useState } from 'react';
import "./Home.css";
import {collection, getDocs, deleteDoc, doc } from "firebase/firestore"
import {auth, db} from "../firebase"

const Home = (isAuth) => {
  const [postLists, setPostList] = useState([])

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(collection(db, "posts"));
      // console.log(data)
      // console.log(data.docs)
      // console.log(data.docs.map((doc) => ({doc})))
      // console.log(data.docs.map((doc) => ({...doc.data()})))
      setPostList(data.docs.map((doc) => ({...doc.data(), id:doc.id})))
    };
    getPosts()
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "posts", id))
    window.location.href = "/"
  }

  return (
    <div className='homePage'>
      {
        postLists.map((post) => {
          return (
            <div className="postContents" key={post.id}>
              <div className="postHeader">
                <h1>{post.title}</h1>
              </div>
              <div className="postTextgContainer">
                {post.postsText}
              </div>
              <div className="nameAndDeleteButton">
                <h3>@{post.author?.username}</h3>
                {post.author.id === auth.currentUser?.uid && (
                  <button onClick={() => handleDelete(post.id)}>削除</button>
                )}
              </div>
            </div>
          )
        })
      }
      
    </div>
  )
}

export default Home