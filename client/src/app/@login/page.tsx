'use client'
import { useEffect, useState } from "react"
import CharSlots from "../components/CharSlots"
import UserLogin from "../components/UserLogin"
import utils from "../styles/utils.module.scss"
import styles from "../styles/login.module.scss"

export default function Login() {
    const [userId, setUserId] = useState<string|null>("")

    useEffect(() => {
        if(typeof window !== "undefined"){
            setUserId(localStorage.getItem('userId'))
        }
    }, [userId])

    return(
        <div className={utils['centered-div']}>
            <div className={userId!=="" ? styles.uncompressed : styles.compressed}>
                {userId!==null
                    ? <CharSlots userId={userId} />
                    : <UserLogin setUserId={setUserId}/>
                }
            </div>
        </div>
    )
}
