function Register(){

    return (
        <>
            <form>
                <label for="username">Username</label><br/>
                <input type="text" id="username" placeholder="Username"></input><br/><br/>

                <label for="email">Email Address</label><br/>
                <input type="email" id="email" placeholder="Email Address"></input><br/><br/>

                <label for="password">Password</label><br/>
                <input type="password" id="password" placeholder="Password"></input><br/>

                <input type="submit" value="Submit"></input>
            </form>
        </>
    )

}

export default Register