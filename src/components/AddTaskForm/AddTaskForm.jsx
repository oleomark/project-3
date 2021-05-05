import React, { useState, useRef, useEffect } from 'react';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";


export default function AddTaskForm(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [invalidForm, setValidForm] = useState(true);
  const [formData, setFormData] = useState({
    userid: Number,
    title: '',
    description: '',
    startDate: startDate,
    endDate: (endDate),
  })

  const formRef = useRef();
  const startDateRef = useRef();
  console.log(startDateRef)

  useEffect(() => {
    formRef.current.checkValidity() ? setValidForm(false) : setValidForm(true);
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault()
    props.handleAddTask(formData);
  }

  const handleChange = (e) => {
    setFormData({
      ...formData, 
      startDate: startDate,
      [e.target.name]: e.target.value
    })
    console.log(e._d);
  }

  return (
    <>
      <h1>Add Task</h1>
      <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title (required)</label>
          <input
            className="form-control"
            name="title"
            value={ formData.title }
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description (required)</label>
          <input
            className="form-control"
            name="description"
            value={ formData.description }
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Select Start Date</label>
        <Datetime 
        ref={startDateRef}
        name="setStartDate"
        selected={startDate}
        onChange={date => setStartDate(date._d)}
        required
        />
        </div>
        <div>
          <label>Select End Date</label>
        <Datetime />
        </div>
          <input type="hidden" value={props.user._id}></input>
        <button
          type="submit"
          className="btn"
          disabled={invalidForm}
        >
          ADD TASK
        </button>
      </form>
    </>
  );
  
}