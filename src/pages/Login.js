import React, {useState, useEffect} from 'react'
import "./Styles.css"
import { db } from '../firebase-config';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    sector: '',
    terms: false,
  });
  const [errors, setErrors] = useState({}); 
  const category = collection(db, 'sectors');
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(false);

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

      } else if (name === 'terms') {

        setErrors(prev => {return {...prev, [name]: null}});

      } else if (name === 'sector') {

        setErrors(prev => {return {...prev, [name]: null}});

      }

    } 
  }

  async function saveData() {
    setLoading(true);
    try {
      const usersCollectionRef = collection(db, 'Users');
      const docRef = await addDoc(usersCollectionRef, {
        name: form.name,
        sector: form.sector,
        termsAgreement: form.terms, 
      })
      localStorage.setItem('userId', docRef.id);
      navigate('/edit', { replace: false });
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
    } 

    if (form.terms === false) {
      setErrors(prev => {return {...prev, terms: `this field is required`}});
    } else {
      saveData();
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

  useEffect(() => {
    getSectors();
  }, [])

  return (
   <>
    <p className='title'>
        Please enter your name and select your sector
    </p>
    <form className="frosted-glass">

      <div className='input-cont'>
        <input 
            type={'text'}
            placeholder={'Name'}
            className="name-input"
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
              <option style={{color: '#000'}} value=""></option>
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

      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '100%', marginBottom: 30}}>
        <div className='input-cont-aux'>
          <input 
              type={'checkbox'}
              className="check-box"
              onChange={() => {
                const value =  !form.terms;
                onEnterValue({name: 'terms', value})
              }}
          />
          <p className='terms-text'>Agree to terms</p>
        </div>

        {errors.terms && (<p className='error-text'>{errors.terms}</p>)}
      </div>

      <div 
        style={{
          display: 'flex', 
          justifyContent: 'flex-start', 
          flexDirection: 'row',
          width: '100%'
        }}>
        <button className='save-btn' onClick={submit}>
          Save
        </button>
      </div>

    </form>
   </>
  )
}

export default Login;