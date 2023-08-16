import styles from "./../styles/components/charSlot.module.scss"

export default function CharSlot({
    name,
    level,
    title
}: {
    name:string,
    level:number,
    title:string
}){
    return (
        <div className={styles['char-slot']}>
            <h1>{name}, {title}</h1>
            <h2>{level}</h2>
        </div>
    )
}