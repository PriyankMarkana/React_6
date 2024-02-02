import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
let temp = '';
function App() {

  let [val, setval] = useState("");
  let [id, setid] = useState(0);
  let [arr, setarr] = useState([]);
  let [updt, setupdt] = useState(null);
  let [search, setsearch] = useState('');
  let [temp, settemp] = useState([]);
  const [searchtemp,setsearchtemp] = useState([])

  const add = () => {
    if (updt != null) {
      const temparr = arr;
      temparr[updt] = val;
      setarr(temparr);
      settemp(temparr)
      setupdt(null);
      setval("")
    }
    else {
      setarr([...arr, { id: id, chek: false, value: val }]);
      settemp([...arr, { id: id, chek: false, value: val }]);
      setsearchtemp([...arr])
      setid(id + 1);
      setval("");
    }
  }

  const del = (ind) => {
    let temp = arr.filter((index) => {
      return ind != index;
    })
    setarr(temp)
    settemp(temp)
  }

  const edit = (ind) => {
    setupdt(ind);
    setval(arr[ind]);
  }

  const check = (ele, ind) => {
    
    let temp = [...arr]
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].id === ind) {
        if (temp[i].chek === false) {
          temp[i].chek = true;
        }
        else {
          temp[i].chek = false;
        }
      }
    }
    setarr(temp)
    settemp(temp)
    
    console.log(temp)
  }

  const ser = () => {
    console.log(search)
    var data = temp.filter((ele) => {
      return ele.value === search ;
    })
    setarr(data);
  }


  const incom=()=>{
      let temp1 = temp.filter((ele) => {
        return (
          ele.chek === false
        )
      })
      setarr(temp1);
  }
  const com=()=>{
    let temp1 = temp.filter((ele) => {
      return (
        ele.chek === true
      )
    })
    setarr(temp1);
}
  const all = () => {
    setarr([...temp]);
  }


  return (
    <>
      <input type="text" value={val} onChange={(e) => setval(e.target.value)}></input><br></br>
      <input type="button" value='add' onClick={add} ></input><br></br><br></br>
      <input type='text' placeholder='search' onChange={(e) => { setsearch(e.target.value) }}></input>
       <input type='button' value="Search" onClick={() => ser()}></input>
      <br></br><br></br>
      <input type='button' value="Complete" onClick={(e) => com(e)}></input>
      <input type='button' value="Uncomplete" onClick={(e) => incom(e)}></input>
      <input type='button' value="All" onClick={(e) => all()}></input>
      <table border={1}>
        {
          arr.map((ele, ind) => {
            return (
              <tr key={ind}>
                <td><input type='checkbox' onChange={(e) => { check(ele.id, ind) }} checked={ele.chek} ></input></td>
                <td><input type='text' style={{ textDecoration: ele.chek === true ? 'line-through' : 'none' }} value={ele.value} readOnly></input></td>
                <td key={ind}><input type="button" value='Delete' onClick={() => del(ele, ind)}></input></td>
                <td><input type="button" value='Edit' onClick={() => edit(ind)}></input></td>
              </tr>
            )
          })
        }
      </table>
    </>
  );
}

export default App;
