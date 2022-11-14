import Head from "next/head";
import Image from "next/image";
import { useRef } from "react";
import styles from "../styles/Home.module.css";

import { getDayName } from "../src/utils";
import { useEffect, useState } from "react";

let nextId = 0;

export default function Home() {
  const [title, setTitle] = useState("");
  const [list, setList] = useState([]);

  let itemList;
  console.log(list);
  const initialRender = useRef(true);

  useEffect(() => {
    const persistedList = window.localStorage.getItem("MY_TODO_LIST");
    if (persistedList !== null) {
      setList(JSON.parse(persistedList));
    }
  }, []);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    window.localStorage.setItem("MY_TODO_LIST", JSON.stringify(list));
    console.log(JSON.stringify(list));
  }, [list]);

  return (
    <div className={styles.container}>
      <Head>
        <title>TODO List</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/list.png" />
      </Head>

      <main className={styles.main}>
        <h3 className={styles.h3}>{todayString}</h3>
        <h1 className={styles.h1}>{dayOfWeek}</h1>
        <p className={styles.description}>Stay Organised, Stay Calm</p>
        <div className={styles.grid}></div>

        {/* Return card of list items */}
        {list.map((item) => {
          console.log(`this one ${item.title} ${item.id}`);

          return item.title !== "" ? (
            <div key={`key ${item.title} ${item.id}`} className={styles.card}>
              <div
                key={`item ${item.id} ${item.title}`}
                id={item.id}
                title={item.title}
              >
                <h1> {item.title} </h1>
              </div>
              <button
                className={styles.button}
                onClick={() => {
                  let _delete = item.id;
                  setList(list.filter((item) => item.id !== _delete));
                }}
              >
                Complete
              </button>
            </div>
          ) : (
            <div key={`key ${item.title} ${item.id}`} className={styles.card}>
              <div
                key={`item ${item.id} ${item.title}`}
                id={item.id}
                title={item.title}
              >
                <h1>Relax</h1>
              </div>
              <button
                className={styles.button}
                onClick={() => {
                  let _delete = item.id;
                  setList(list.filter((item) => item.id !== _delete));
                }}
              >
                Complete
              </button>
            </div>
          );
        })}

        {/* Button for adding new items */}
        <input
          autoFocus
          value=""
          className={styles.input}
          maxLength={20}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Start Planning Your Day"
        />

        <button
          className={styles.add}
          onClick={() => {
            setTitle("");
            setList([
              ...list,
              { id: nextId++, title: title, isComplete: false },
            ]);
          }}
        >
          Add
        </button>
      </main>
    </div>
  );
}

/**
 * Getting todays date and formatting it
 * provides date and name of day
 */
const fullDate = new Date();
const todayString = fullDate.toLocaleDateString("en-US", {
  year: "2-digit",
  month: "2-digit",
  day: "2-digit",
});
const dayOfWeek = getDayName(fullDate.getDay());
