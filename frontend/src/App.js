import './App.css';
import React, { useState, useEffect } from 'react';
import getBlockchain from './ethereum';

function App() {
  const [taskStore, setTaskStore] = useState(undefined);
  const [data, setData] = useState('');
  const [inputTask, setInputTask] = useState('');

  useEffect(() => {
    const init = async () => {
      const { taskStore } = await getBlockchain();
      const data = await taskStore.readTask();
      setTaskStore(taskStore);
      setData(data);
    };
    init();
  }, [])

  const updateData = async e => {
    e.preventDefault();

    const data = inputTask;
    const tx = await taskStore.updateTask(data);
    await tx.wait();
    const newData = await taskStore.readTask();
    setData(newData);
  };

  if (typeof taskStore === 'undefined' || data === 'undefined') {
    return 'Loading...';
  }

  return (
    <div className='container'>
      <h1>Task Store (BSC Blockchain)</h1>
      
      <form className='add-form' onSubmit={(e) => updateData(e)}>
        <div className='form-control'>
          <label>Enter Task to be stored:</label>
          <input
            type='text'
            className='form-control'
            placeholder='Enter String to be stored'
            onChange = {(e)=>setInputTask(e.target.value)}
            />
        </div>
        <button
          type='submit'
          className='btn'
        >
          Submit
        </button>
      </form>

      <h3>Currently Stored Task: "{data.toString()}"</h3>
    </div>
  );
}

export default App;
