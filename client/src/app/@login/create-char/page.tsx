'use client'

import { QueryClientProvider, useMutation, QueryClient } from "react-query"

export default function Page({
    searchParams//userid
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}){
    const queryClient = new QueryClient()
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

        formData.append('userId', searchParams.userId as string)
        formData.append('titleName', titleName as string)
        formData.append('titleDesc', titleDesc),
        formData.append('titleRequirements', titleRequirements)

        characterMutation.mutate(formData)
    }

    return (
    <QueryClientProvider client={queryClient}>
        <form onSubmit={handleSubmit}>
            <input type="file" name="image" id="image"/>
            <label htmlFor="image">Image</label>

            <input type="text" name="name" id="name"/>
            <label htmlFor="name">Name</label>

            <input type="text" name="title" id="title" value={"The weakest one"} readOnly/>
            <label htmlFor="title">Title</label>

            <input type="date" name="bornDate" id="bornDate" max={new Date().toISOString().slice(0,10)}/>
            <label htmlFor="bornDate">Born date</label>

            <textarea name="synopsis" id="synopsis" cols={30} rows={10}></textarea>
            <label htmlFor="synopsis">Synopsis</label>

            <button type="submit">Create</button>
        </form>
    </QueryClientProvider>)
}
