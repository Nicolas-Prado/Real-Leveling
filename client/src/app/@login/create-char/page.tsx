'use client'

import { useMutation } from "react-query"
import { useRef, useState } from "react"
import styles from "../../styles/createchar.module.scss"
import { useRouter } from "next/navigation"

export default function CreateChar({
    searchParams//userid
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}){
    const imgElementRef = useRef(null)
    const [ imgSrc, setImgSrc ] = useState<string|null>(null)

    const router = useRouter()

    const characterMutation = useMutation({
        mutationFn: (newCharacter: FormData) => {
            return fetch("http://localhost:22194/characters/improved", {
                method: "POST",
                body: newCharacter,
                headers: {
                    'Authorization': `Bearer ELPSYKONGROO` 
                }
            }).then(res => res.json()).then((res) => {
                if(res.status === 'success')
                    router.push('./')
            })
        }
    })

    function handleSubmit(event: React.FormEvent<EventTarget>){
        event.preventDefault()

        const formData = new FormData(event.target as HTMLFormElement)

        const titleName = formData.get('title')
        formData.delete('title')

        const titleDesc = "The weakest one joined in the world"
        const titleRequirements = "Join in real leveling"

        formData.append('userId', searchParams.userid as string)
        formData.append('titleName', titleName as string)
        formData.append('titleDesc', titleDesc),
        formData.append('titleRequirements', titleRequirements)

        characterMutation.mutate(formData)
    }

    return (
        <div className={styles['two-corner-border']}>
            <form onSubmit={handleSubmit} className={styles['char-form']}>                
                <input type="file" name="image" id="image" accept="image/*" onChange={(event) => {
                    const input = event.currentTarget.files
                    if (input){
                        const file = input[0]
                        const reader = new FileReader()

                        reader.onloadend = () => {
                            setImgSrc(typeof reader.result === "string" ? reader.result : null)
                        }

                        if (file) {
                            reader.readAsDataURL(file)
                        }
                    }
                }}/>
                <div className={styles['image-wrapper']}>
                    <label htmlFor="image">
                        {!imgSrc
                            ? <span>+</span>
                            : <img src={imgSrc} ref={imgElementRef} alt="Character image"/>
                        }
                    </label>
                </div>

                <div className={styles['minor-inputs']}>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name"/>
                </div>
                <div className={styles['minor-inputs']}>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" value={"The weakest one"} readOnly/>
                </div>
                
                <div className={styles['minor-inputs']}>
                    <label htmlFor="bornDate">Born date</label>
                    <input type="date" name="bornDate" id="bornDate" max={new Date().toISOString().slice(0,10)}/>
                </div>

                <div className={styles['synopsis-wrapper']}>
                    <label htmlFor="synopsis">Synopsis</label>
                    <textarea name="synopsis" id="synopsis" cols={30} rows={10}></textarea>
                </div>

                <div className={styles['button-wrapper']}>
                    <button type="submit">Create</button>
                </div>
            </form>
        </div>
    )
}
