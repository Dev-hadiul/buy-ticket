import React, { useEffect, useState } from 'react'
import './home.css'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import { MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import { AiOutlinePlus } from 'react-icons/ai';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [info, setInfo] = useState({
    name: '',
    desCountry: '',
    date: '',
    className: '',
    guest: '',
  })
  const [error, setError] = useState('')
  const [ticket, setTicket] = useState([])


  const handleChange = (e) => {
    const {name, value} = e.target
    setInfo((prev)=> ({
      ...prev,
      [name]: value
    }))
  }

  
  const db = getDatabase();
  const handleClick = () => {
    if(!info.name || !info.desCountry || !info.date || !info.className || !info.guest){
      setError(() => {
        toast('🦄 Please Enter Your Data', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      })
    }
    else{
      set(push(ref(db, 'users')), {
        name: info.name,
        desCountry: info.desCountry,
        date: info.date,
        className: info.className,
        guest: info.guest,
      })
      .then(()=> {
        setInfo({
          name: '',
          desCountry: '',
          date: '',
          className: '',
          guest: ''
        })
      });
    }
  }

  useEffect(()=> {
    const starCountRef = ref(db, 'users');
    onValue(starCountRef, (snapshot) => {
      let dataArray = []
    snapshot.forEach((x)=>{
      dataArray.push({...x.val(), id: x.key})
    })
    setTicket(dataArray);
    });
  }, []);

  const handleDelete = (datadelete) => {
    remove(ref(db, 'users/' + datadelete))
  };

  return (
    <div className='all-data'>
      <ToastContainer/>
      <div className='bg-img'> 
        {/* <img src='./img/bg.jpg'/> */}
        <div className='main-div'>
          <div className='child-div'>
            <Grid container spacing={2}>
            <Grid className='destination' item xs={2}>
            <div className='destination-item' >
                <div className='des-head'>
                <h3>select Country</h3>
                </div>
                <div className='des-element'>
                <Select
                  className='des-input'
                  value={info.name}
                  onChange={handleChange}
                  labelId="demo-simple-select-helper-label"
                  label='Country'
                  name='name'
                  >
                  <MenuItem value={'Dhaka'}>Dhaka</MenuItem>
                  <MenuItem value={'England'}>England</MenuItem>
                  <MenuItem value={'Pakistan'}>Pakistan</MenuItem>
                </Select>
                </div>
              </div>
            </Grid>

            <Grid className='destination' item xs={2}>
            <div className='destination-item' >
                <div className='des-head'>
                <h3>Destination To</h3>
                </div>
                <div className='des-element'>
                <Select
                  className='des-input'
                  value={info.desCountry}
                  onChange={handleChange}
                  labelId="demo-simple-select-helper-label"
                  label='Country'
                  name='desCountry'
                  >
                  <MenuItem value={'Europe'}>Europe</MenuItem>
                  <MenuItem value={'Germen'}>Germen</MenuItem>
                  <MenuItem value={'Singapure'}>Singapure</MenuItem>
                </Select>
                </div>
              </div>
            </Grid>

            <Grid className='destination' item xs={2}>
            <div className='destination-item' >
                <div className='des-head'>
                  <h3>Journey Date</h3>
                </div>
                <div className='des-element'>
                  <TextField onChange={handleChange} name='date' value={info.date} className='des-input' type='date'  variant="standard" />
                </div>
              </div>
            </Grid>

            <Grid className='destination' item xs={2}>
            <div className='destination-item' >
                <div className='des-head'>
                  <h3>Guest</h3>
                </div>
                <div className='des-element'>
                <Select
                  className='des-input'
                  value={info.guest}
                  onChange={handleChange}
                  labelId="demo-simple-select-helper-label"
                  label='Country'
                  name='guest'
                  >
                  <MenuItem value={'economy'}>Economy</MenuItem>
                  <MenuItem value={'Premium Economy'}>Premium Economy</MenuItem>
                  <MenuItem value={'Business'}>Business</MenuItem>
                </Select>
                </div>
              </div>
            </Grid>

            <Grid className='destination' item xs={2}>
            <div className='destination-item' >
                <div className='des-head'>
                <h3>Class Name</h3>
                </div>
                <div className='des-element'>
                <Select
                  className='des-input'
                  value={info.className}
                  onChange={handleChange}
                  labelId="demo-simple-select-helper-label"
                  label='Country'
                  name='className'
                  >
                  <MenuItem value={'First Class'}>First Class</MenuItem>
                  <MenuItem value={'Second Class'}>Second Class</MenuItem>
                  <MenuItem value={'Last Class'}>Last Class</MenuItem>
                </Select>
                </div>
              </div>
            </Grid>


            <Grid className='destination' item xs={2}>
            <div className='destination-item' >
                <div className='des-element'>
                  <Button onClick={handleClick} className='btn' variant="outlined">
                    <AiOutlinePlus className='plus'/>
                    Book
                  </Button>
                </div>
              </div>
            </Grid>
            {
              error ? <p>{error}</p> : ''
            }

          </Grid>
          </div>
        </div>
      <div className='box'> 
        <div className='data-collection'>
        <Grid container spacing={2}>
        <Grid item xs={2}>
          <div className='sub-data'>
            <h3>Destination From</h3>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className='sub-data'>
            <h3>Destination To</h3>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className='sub-data'>
            <h3>Date</h3>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className='sub-data'>
            <h3>Guest</h3>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className='sub-data'>
            <h3>class Name</h3>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className='sub-data'>
            <h3>Delete</h3>
          </div>
        </Grid>
        </Grid>
        </div>
      </div>
      <div className='box-2'>
          {
            ticket.map((items, i)=> (
              <div className='child-box' key={i}>
              <Grid container spacing={2}>
              <Grid item xs={2}>
              <h4>{items.name}</h4>
              </Grid>
              <Grid item xs={2}>
              <h4>{items.desCountry}</h4>
              </Grid>
              <Grid item xs={2}>
              <h4>{items.date}</h4>
              </Grid>
              <Grid item xs={2}>
              <h4>{items.guest}</h4>
              </Grid>
              <Grid item xs={2}>
              <h4>{items.className}</h4>
              </Grid>
              <Grid item xs={2}>
                <div onClick={()=> handleDelete(items.id)} className='delete'>
                  <RiDeleteBin6Fill/>
                </div>
              </Grid>
            </Grid>
              </div>
            ))
          }
      </div>
      </div>
    </div>
  )
}

export default Home
