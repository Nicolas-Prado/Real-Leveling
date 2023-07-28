"use client"
import { useEffect, useState } from "react"
import CharSlot from "./CharSlot"
import styles from "./../styles/components/charSlots.module.scss"
import Link from "next/link"

export default function CharSlots(){
    const [userId, setUserId] = useState<number|null>(null)
    const [charsId, setCharsId] = useState<number[]|null>(null)

    useEffect(() => {
        if (typeof window !== "undefined"){
            const userId = localStorage.getItem("userId")
            setUserId(0)
            //if(userId!,=null){
                fetch("./../api").then(res => res.json()).then(res => setCharsId(Array.isArray(res) ? res : null)).then(() => setUserId(Number(userId)))
            //}
        }
    }, [])

    return(
        <div className={styles['centered-div']}>
            <div className={userId!==null ? styles.uncompressed : styles.compressed}>
                {typeof userId === "number"
                    ? charsId?.map(charId => <CharSlot key={charId} userId={userId} charId={charId} />)
                    : ""
                }
                <Link className={styles.link} href={"/register"}><span>+</span></Link>
            </div>
        </div>
    )
}