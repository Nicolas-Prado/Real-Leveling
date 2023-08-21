'use client'

import { useMutation } from "react-query"
import { useRef, useState } from "react"
import styles from "../../styles/createchar.module.scss"

export default function CreateChar({
    searchParams//userid
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}){
    const imgElementRef = useRef(null)
    const [ imgSrc, setImgSrc ] = useState<string|null>(null)

    const characterMutation = useMutation({
        mutationFn: (newCharacter: FormData) => {
            return fetch("http://localhost:22194/characters/improved", {
                method: "POST",
                body: newCharacter,
                headers: {
                    'Authorization': `Bearer ELPSYKONGROO` 
                }
            }).then(res => res.json()).then((res) => {
                console.log(res)
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
                <div className={styles['top-wrapper']}>
                    <div className={styles['image-wrapper']}>
                        <label htmlFor="image">
                            {!imgSrc
                                ? <span>+</span>
                                : <img src={imgSrc} ref={imgElementRef} alt="Character image"/>
                            }
                        </label>
                    </div>
                    <div className={styles['top-inputs-wrapper']}>
                        <div>
                            <input type="text" name="name" id="name"/>
                            <label htmlFor="name">Name</label>
                        </div>
                        <div>
                            <input type="text" name="title" id="title" value={"The weakest one"} readOnly/>
                            <label htmlFor="title">Title</label>
                        </div>
                        <div>
                            <input type="date" name="bornDate" id="bornDate" max={new Date().toISOString().slice(0,10)}/>
                            <label htmlFor="bornDate">Born date</label>
                        </div>
                    </div>
                </div>

                <div>
                    <textarea name="synopsis" id="synopsis" cols={30} rows={10}></textarea>
                    <label htmlFor="synopsis">Synopsis</label>
                </div>

                <button type="submit">Create</button>
            </form>
        </div>
    )
}
