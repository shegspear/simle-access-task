import React, {useState, useEffect} from 'react'
import { db } from '../firebase-config';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import "./Styles.css"
import { useNavigate } from 'react-router-dom';

const Edit = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    sector: '',
  });
  const [errors, setErrors] = useState({}); 
  const category = collection(db, 'sectors');
  const users = collection(db, 'Users');
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState('');

  const onEnterValue = ({name, value}) => {
    setForm({...form, [name]: value});

    console.log(name, value)

    if(value !== '') {

      if(name === 'name') {

        if(value.length < 3) {
          setErrors(prev => {return {...prev, [name]: `please minimum of 3 characters`}});
          console.log(errors)
        } else {
          setErrors(prev => {return {...prev, [name]: null}});
        }

      } else if (name === 'sector') {

        setErrors(prev => {return {...prev, [name]: null}});

      }

    } 
  }

  async function updateData() {
    const userRef = doc(db, "Users", userId);
    setLoading(true);
    try {
      await updateDoc(userRef, {
        name: form.name,
        sector: form.sector,
      })
     setLoading(false);
    } catch(err) {
      setLoading(false);
      console.log(err)
    }
  }

  function submit(e) {
    e.preventDefault();

    if(form.sector === '') {
      setErrors(prev => {return {...prev, sector: `this field is required`}});
    }

    if (form.name === '') {
      setErrors(prev => {return {...prev, name: `this field is required`}});
    } else {
      updateData();
    }

  };

  const getSectors = async() => {
    setLoading(true);
    try {
      const res = await getDocs(category);
        res.docs.forEach((doc) => {
          // console.log(doc.data().dataSectors);
          setSectors(doc.data().dataSectors)
        });
        setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err)
    }
  }

  const getUser = async() => {
    const userId = localStorage.getItem('userId');
    setUserId(userId);
    setLoading(true);
    try {
      const res = await getDocs(users);
      // console.log(res.docs)
        res.docs.forEach((doc) => {
          console.log(doc.id)
          if(doc.id == userId) {
            console.log('found it ', doc.data());
            setForm(doc.data())
          } else {
            console.log('not found')
          }
          // setSectors(doc.data().dataSectors)
        });
        setLoading(false);
    } catch(err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.removeItem('userId')
    navigate('/', { replace: true });
  }

  useEffect(() => {
    getSectors();
    getUser();
  }, [])
  
  return (
    <>
    <p className='title'>
        Please feel free to edit your name and sector
    </p>
    <form class="frosted-glass">

      <div className='input-cont'>
        <input 
          type={'text'}
          placeholder={'Name'}
          className="name-input"
          value={form.name}
          onChange={(e) => {
            const value =  e.target.value;
            onEnterValue({name: 'name', value})
          }}
        />

        {errors.name && (<p className='error-text'>{errors.name}</p>)}
      </div>

      {
        loading ? (
          <div id="loading"></div>
        ) : (
          <div className='input-cont'>
            <select 
              className='options-input' 
              name="sectors" 
              id="sectors"
              onChange={(e) => {
                const value =  e.target.value;
                onEnterValue({name: 'sector', value})
              }}
            >
              <option style={{color: '#000'}} value="">{form.sector}</option>
                {
                  sectors.map((cur, i) => (
                    <option style={{color: '#000'}} key={i} value={cur}>{cur}</option>
                  ))
                }
            </select>

            {errors.sector && (<p className='error-text'>{errors.sector}</p>)}
          </div>
        )
      }

      <div 
        style={{
          display: 'flex', 
          justifyContent: 'space-between', 
          flexDirection: 'row',
          width: '100%'
        }}>
        <button className='save-btn' onClick={submit}>
          Update
        </button>

        <button className='save-btn' onClick={logout}>
          Logout
        </button>
      </div>

    </form>
   </>
  )
}

export default Edit