import React, { useEffect, useState } from 'react'

// useEffect(callback,[dependency])

//TH1: useEffect(callback) được chạy lại mỗi lần re-render

//TH2: useEffect(callback,[]) chỉ chạy sau lần render đầu tiên

//TH3: useEffect(callback,[dependency]) chỉ chạy khi dependency thay đổi

// Chung: Đều chạy sau lần render đầu tiên
function DemoUseEffect() {
    const [count, setCount] = useState(0);
    const [count1, setCount1] = useState(0);

    //TH1:
    // useEffect(() => {
    //     console.log("TH1: useEffect(callback)");
    // },)
    //TH2:
    // useEffect(() => {
    //     console.log("TH2: useEffect(callback,[])");
    // },[])
    //TH3:
    useEffect(() => {
        console.log("TH3: useEffect(callback,[dependency])");
    }, [count])
    const addCount = () => {
        setCount(count + 1);
    }
    const addCount1 = () => {
        setCount1(count1 + 1);
    }
    return (
        <div>
            {console.log("render")}
            <h2>Count: {count}</h2>
            <button onClick={addCount}>Add count</button>

            <h2>Count1: {count1}</h2>
            <button onClick={addCount1}>Add count</button>
        </div>
    )
}

export default DemoUseEffect
