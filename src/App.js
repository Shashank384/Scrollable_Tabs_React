import React from 'react';
import ScrollableTabs from "./component/ScrollableTabs"

const initialList = [
  {
    id: Math.random(),
    name: 'Tab 1',
  }
];
const App = () => {

  const [list, setList] = React.useState(initialList);
  const [count, setCount] = React.useState(2);

  function handleRemove(id) {
    if(list.length > 1){
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
    }
  }

 function handleAdd(){
    setCount(prevCount => prevCount + 1)
    const newList = list.concat({ id: Math.random(), name: `Tab ${count}`  });
    setList(newList);
  }

    return (
        <div style={{ maxWidth: 1000, marginLeft: '100px', marginRight: 'auto', marginTop: 64 }}>
            <ScrollableTabs handleAdd={handleAdd}>
              {
                list.map((item) => (
                  <div key={item.id}>
                      <div className="outer" style={{padding: 10}}>
                          <p>{item.name}</p>
                          {
                            list.length > 1 && 
                            <div className="button" 
                              onClick={() => handleRemove(item.id)}>X
                            </div>
                          }
                      </div>
                  </div>
                ))
              }
                  
            </ScrollableTabs>  
        </div>
    )
}

export default App