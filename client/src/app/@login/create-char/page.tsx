'use client'
export default function Page({
    searchParams//userid
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}){
    function handleSubmit(event: React.FormEvent<EventTarget>){
        event.preventDefault()

        const formData = new FormData(event.target as HTMLFormElement)

        const formJson = Object.fromEntries(formData.entries())
    }

    return <form onSubmit={handleSubmit}>
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
}
