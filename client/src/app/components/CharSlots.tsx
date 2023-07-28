"use client"
import { useEffect, useState } from "react"
import CharSlot from "./CharSlot"
import styles from "./../styles/components/charSlots.module.scss"
import Link from "next/link"

export default function CharSlots({ userId }: { userId: string }){

    const [charsId, setCharsId] = useState<number[]|null>(null)

    useEffect(() => { fetch("./../api").then(res => res.json()).then(res => setCharsId(res)) }, [])

    return(
        <>
            {Array.isArray(charsId)
                ? charsId?.map(charId => <CharSlot key={charId} userId={userId} charId={charId} />)
                : <p className={styles.loading}>Loading...</p>
            }
            <Link className={styles.link} href={"/register"}><span>+</span></Link>
        </>
    )
}