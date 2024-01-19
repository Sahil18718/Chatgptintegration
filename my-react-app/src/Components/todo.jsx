import { useCallback, useState } from "react";

function Todo() {
    const [text,setText] = useState("");

    const handleChange = (e) =>{
        // console.log(e.target.value)
        setText(e.target.value)
    }

    return(
        <div>
            <div>
                <input
                placeholder="Add a tood list "
                value={text} 
                onChange={handleChange}/>
                <button>ADD</button>
                <p>{text}</p>
            </div>
        </div>
    ) 
}



use memo 
use useCallback

export default Todo;
