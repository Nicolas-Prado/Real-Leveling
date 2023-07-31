'use client'
import { useEffect, useState } from "react"
import CharSlots from "../components/CharSlots"
import UserLogin from "../components/UserLogin"
import utils from "../styles/utils.module.scss"
import styles from "../styles/login.module.scss"
import { QueryClient, QueryClientProvider } from "react-query"

export default function Login() {
    const queryClient = new QueryClient()

    const [userId, setUserId] = useState<string|null>("")

    useEffect(() => {
        if(typeof window !== "undefined"){
            setUserId(localStorage.getItem('userId'))
        }
    }, [])

    return(
        <div className={utils['centered-div']}>
            <div className={userId!=="" ? styles.uncompressed : styles.compressed}>
                <QueryClientProvider client={queryClient}>
                    {userId!==null
                        ? <CharSlots userId={userId} />
                        : <UserLogin />
                        
                    }
                </QueryClientProvider>
            </div>
        </div>
    )
}
