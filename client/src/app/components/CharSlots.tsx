"use client"
import { useEffect, useState } from "react"
import CharSlot from "./CharSlot"
import styles from "./../styles/components/charSlots.module.scss"
import Link from "next/link"
import StyledBorder from "./StyledBorder"

export default function CharSlots(){
    const [userId, setUserId] = useState<number|null>(null)
    const [charsId, setCharsId] = useState<number[]|null>(null)

    useEffect(() => {
        if (typeof window !== "undefined"){
            const userId = localStorage.getItem("userId");
            setUserId(0)
            //if(userId!=null){
                setUserId(Number(userId))

                fetch("./../api").then(res => res.json()).then(res => setCharsId(Array.isArray(res) ? res : null))
            //}
        }
    }, [])

    return <div className={styles['centered-div']}>
        <StyledBorder bg='url("/fullbg.gif")' border="1px solid white" borderSize="3px" borderRadius="15px" isUrl="true">
            <div className={userId!==null ? styles.uncompressed : styles.compressed}>
                {typeof userId === "number"
                    ? charsId?.map(charId => <CharSlot key={charId} userId={userId} charId={charId} />)
                    : ""
                }
                <Link href={"/register"}><button>New Char</button></Link>
            </div>
        </StyledBorder>
    </div>
}