import '../App.css';
import { useState } from 'react';

// export default function App() {
//   const [state,setState] = useState({list:[]})
//   useEffect(()=>{
//   fetch('https://reqres.in/api/users?page=2')
//   .then(response => response.json())
//   .then(json => setState({list:[...json.data]}))
//   },[])

//   return (
//     <div className="App">
//     {
//     state.list.map((el,key)=>(
//       <div key={key}>
//         <h1>Users{key}</h1>
//         <img src={el.avatar} alt=""/>
//         <h1>{el.first_name}{" "}{el.last_name}</h1>
//         <p>{el.email}</p>
//       </div>
//     ))
//     }  
//     </div>
//   );
// }

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div data-test="component-app" className="App">
      <h1 data-test="counter-display">
        The counter is currently &nbsp;
        <span data-test="count">{count}</span>
      </h1>
      <button
        data-test="increment-button"
        onClick={() => { setCount(count + 1) }}
      >
        Increment Counter
      </button>
    </div>
  );
}

{/* component-app <h1 data-test="counter-display">
        The counter is currently&nbsp; 
        <span data-test="count">{count}</span>
      </h1>
      <button
        data-test="increment-button"
        onClick={() => setCount(count + 1)}
      >
        Increment counter
      </button> */}