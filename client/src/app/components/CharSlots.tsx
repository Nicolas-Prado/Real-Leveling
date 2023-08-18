"use client"
import { useEffect, useState } from "react"
import CharSlot from "./CharSlot"
import styles from "./../styles/components/charSlots.module.scss"
import Link from "next/link"
import { useQuery } from "react-query"

export default function CharSlots({ userId }: { userId: string }){
    type Character = {
        id:number;
        name: string;
        level: number;
        title: string;
    }

    const [ characters, setCharacters ] = useState<Character[]|null>(null)

    const characterQuery = useQuery({
        queryKey: ["characters", userId],
        queryFn: () => {
            return fetch(`http://localhost:22194/characters/title?limit=3&page=1&userid=${userId}`, {
                headers: {
                    'Authorization': `Bearer ELPSYKONGROO` 
                }
            }).then(res => res.json()).then((res) => {
                const charactersJSON = res.results.map((charJson:{id:number, name:number, titles:{name:string}[]}) => {
                    return {
                        id:charJson.id,
                        name:charJson.name,
                        level:2,
                        title:charJson.titles[0].name
                    }
                })

                setCharacters(charactersJSON)
            })
        }
    })

    return(
        <>
            {Array.isArray(characters)
                ? characters.map(char => <CharSlot key={char.id} name={char.name} level={char.level} title={char.title} />)
                : <p className={styles.loading}>Loading...</p>
            }
            <Link className={styles.link} href={`/create-char?userid=${userId}`}><span>+</span></Link>
        </>
    )
}