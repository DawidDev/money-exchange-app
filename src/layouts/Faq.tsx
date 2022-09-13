import React from 'react'

const Faq = () => {
    const element = localStorage.getItem("watchedList");
    //console.log(localStorage)
    localStorage.clear()
    
    console.log(element)
    return(
        <>
        FAQ</>
    )
}

export default Faq