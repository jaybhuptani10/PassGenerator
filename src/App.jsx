import { useState,useCallback, useEffect, useRef } from "react"


function App() {
  const [length,setLength] = useState(8)
  const [numAllowed,setNumAllowed] = useState(false)
  const [charAllowed,setCharAllowed] = useState(false)
  const [pass,setPass] = useState("")

  const passRef = useRef(null)

  const passGenerator = useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwqyz"
    if(numAllowed) str+= "0123456789"
    if(charAllowed) str+= "!@#$%^&*+-`~"
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length +1)
      pass += str.charAt(char)
    }
    setPass(pass)
    

  },[length,numAllowed,charAllowed,setPass])

  const copyPassToClipboard = useCallback(()=> {
    passRef.current?.select();
    
    window.navigator.clipboard.writeText(pass)
  },[pass])

  useEffect(() => {passGenerator()},[length,numAllowed,charAllowed,passGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
        <div className="flex shadow rounded-lg overflow-hidden mb-1">
          <input type="text" value={pass} className="outline-none w-full py-1 px-3" placeholder="password" readOnly ref={passRef}>
          
          </input>
          <button onClick={copyPassToClipboard} className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input type="range" min={6} max={20} value={length} className="cursor-pointer"
            onChange={(e) => {setLength(e.target.value)}}/>
            <label>length: {length}</label>
            
          </div>
          <div className="flex items-center gap-x-1">
            <input
            type="checkbox"
            defaultChecked={numAllowed}
            id="numberInput"
            onChange={() => {setNumAllowed((prev) => !prev);}}
            ></input>
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={charAllowed} id="charInput"
            onChange={() => {setCharAllowed((prev => !prev));}}
            ></input>
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
