 async function getCurrentUser(){

    try{
        const response = await fetch("http://localhost:3001/profile", {withCredentials: true}, {
        method: "post",
        headers: {"Content-Type": "application/json"},
    })  

    console.log(response)

    } catch(err){
        console.log(err)
    }        
}

