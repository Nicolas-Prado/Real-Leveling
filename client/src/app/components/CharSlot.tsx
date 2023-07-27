import styles from "./../styles/components/charSlot.module.scss"

export default function CharSlot({
    userId,
    charId
}: {
    userId: number,
    charId: number
}){
    return (
        <div className={styles['char-slot']}>
            <h1>User: {userId} Char: {charId}</h1>
        </div>
    )
}