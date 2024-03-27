function SignIn(){

    return (
        <>
            <form>
                <label for="username">Username or Email Address</label>
                <input type="text" id="username" placeholder="Username or Email Address"></input>
                <label for="password">Password</label>
                <input type="password" id="password" placeholder="Password"></input>
            </form>
        </>
    )

}

export default SignIn