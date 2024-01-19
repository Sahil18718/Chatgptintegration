import { useCallback, useState } from "react";

// title ,status: true , id

function Todo() {
    const [text,setText] = useState("");
    const [todlist,setTodolist] = useState()

    const handleChange = (e) =>{
        // console.log(e.target.value)
        setText(e.target.value)
    }

    const handleAdd=() =>{

    }

    return(
        <div>
            <div>
                <input
                placeholder="Add a tood list "
                value={text} 
                onChange={handleChange}/>
                <button onClick={handleAdd}>ADD</button>
                <p>{text}</p>
            </div>
        </div>
    ) 
}




export default Todo;
