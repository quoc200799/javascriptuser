import React, { useState, useEffect } from 'react'
import { searchByPage } from './DemoService'

function DemoCallApi() {
    const [list, setList] = useState([]);
    const [type, setType] = useState("posts");
    const [stylehi, setStylehi] = useState(null);


    useEffect(() => {
        search();
    }, [type, stylehi])
    const search = () => {
        let searchObject = {};
        searchByPage(searchObject, type)
            .then((res) => setList(res.data))
    };
    const handleType = (title) => {
        setType(title)
        setStylehi(type === title ? { color: "white", backgroundColor: "red" } : null);
    }
    return (
        <div>
            <button onClick={() => handleType("posts")} style={stylehi}>posts</button>
            <button onClick={() => handleType("photos")} style={stylehi}>photos</button>
            <button onClick={() => handleType("albums")} style={stylehi}> albums</button>

            <ul>
                {list.map(item =>
                    <li key={item?.id}>{item?.title}</li>
                )}
            </ul>
        </div>
    )
}

export default DemoCallApi
