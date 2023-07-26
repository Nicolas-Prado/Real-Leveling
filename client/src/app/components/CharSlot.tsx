export default function CharSlot({
    userId,
    charId
}: {
    userId: number,
    charId: number
}){
    return <h1>User: {userId} Char: {charId}</h1>   
}