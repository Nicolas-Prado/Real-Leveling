export default function Register(){
    return <>
        <label htmlFor="user">User: </label>
        <input type="text" name="user" id="user" />
        <label htmlFor="password">Password: </label>
        <input type="text" name="password" id="password" />

        <button type="submit">Submit</button>
    </>
}
