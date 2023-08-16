import { useMutation, useQuery } from "react-query"
import { SetStateAction, useState } from "react"
import styles from "../styles/components/userLogin.module.scss"
import { cookies } from "next/headers";

export default function UserLogin({ setUserId }: { setUserId: (value: SetStateAction<string | null>) => void }){
    const [isNew, setIsNew] = useState(false);

    const createUserMutation = useMutation({
        mutationFn: (newUser: { [k:string]: FormDataEntryValue }) => {
            return fetch('http://localhost:22194/users/', {
                method: "POST",
                body: JSON.stringify(newUser),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ELPSYKONGROO` 
                }
            }).then(res => res.json()).then((res) => {
                if(typeof window !== 'undefined')
                    localStorage.setItem("userId", res.id)
                setUserId(res.id)
            })
        }
    })

    const getUserMutation = useMutation({
        mutationFn: (user: { [k:string]: FormDataEntryValue }) => {
            return fetch(`http://localhost:22194/users?username=${user.username}&password=${user.password}`, {
                headers: {
                    'Authorization': `Bearer ELPSYKONGROO` 
                }
            }).then(res => res.json()).then((res) => {
                if(typeof window !== 'undefined')
                    localStorage.setItem("userId", res.id)
                setUserId(res.id)
            })
        }
    })

    function handleSubmit(event: React.FormEvent<EventTarget>) {
        event.preventDefault()

        const formData = new FormData(event.target as HTMLFormElement)

        const formJson = Object.fromEntries(formData.entries())

        if(isNew)
            createUserMutation.mutate(formJson)
        else
            getUserMutation.mutate(formJson)
    }

    return (
        <form onSubmit={handleSubmit} className={styles['user-form']}>
            <div>
                <label htmlFor="username">Username </label>  
                <input type="text" name="username" id="username" />
            </div>

            <div>
                <label htmlFor="password">Password </label>
                <input type="text" name="password" id="password"/>
            </div>

            <div>
                <input type="checkbox" name="isnew" id="isnew" />
                <label className={styles["is-new"]} htmlFor="isnew" onClick={() => setIsNew((prev) => !prev)}>New user ?</label>
            </div>

            <button type="submit">{!isNew ? "Login" : "Create"}</button>
        </form>
    )
}