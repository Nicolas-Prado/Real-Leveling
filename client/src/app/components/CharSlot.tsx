import styles from "./../styles/components/charSlot.module.scss"

export default function CharSlot({
    userId,
    charId
}: {
    userId: string,
    charId: number
}){
    return (
        <div className={styles['char-slot']}>
            <h1>Username, Title</h1>
            <h2>Level</h2>
        </div>
    )
}