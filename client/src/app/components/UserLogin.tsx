import { useMutation } from "react-query"
import { useState } from "react"
import styles from "../styles/components/userLogin.module.scss"

export default function UserLogin(){
    const [isNew, setIsNew] = useState(false);

    const userMutation = useMutation({
        mutationFn: (newUser: { [k:string]: FormDataEntryValue }) => {
            return fetch('./../api', {
                method: "POST",
                body: JSON.stringify(newUser),
            }).then(res => res.json()).then((res) => {
                if(typeof window !== 'undefined')
                    localStorage.setItem("userId", res.userId)
            })
        }
    })

    function handleSubmit(event: React.FormEvent<EventTarget>) {
        event.preventDefault()

        const formData = new FormData(event.target as HTMLFormElement)

        const formJson = Object.fromEntries(formData.entries())

        userMutation.mutate(formJson)
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

            <button type="submit">{!isNew ? "Submit" : "Create"}</button>
        </form>
    )
}