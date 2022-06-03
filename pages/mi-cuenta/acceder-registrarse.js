import { useState, useEffect } from 'react';
import Link from 'next/link'
import axios from 'axios';
import Layout from "../../components/Layout"
import Alerta from '../../components/Alerta';
import Spinner from '../../components/Spinner'
import useAuth from '../../hooks/useAuth'
import { useRouter } from 'next/router'

import styles from '../../styles/Formulario.module.css';

export default function AccederRegistrar() {

  const [ user, setUser ] = useState({
    email: '',
    password: ''
  });
  const [ newUser, setNewUser ] = useState({
    newName: '',
    newEmail: '',
    newPassword: '',
    repetirPassword: ''
  });

  const [ alerta, setAlerta ] = useState({})

  const { auth ,setAuth, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
      if (Object.values(auth).length !== 0) {
        router.push('./perfil')
      }
  },[auth])
 
  const handleOnChangeUser = e => {
      setUser({ ...user,
      [e.target.name]: e.target.value})
  }
  const handleOnChangeNewUser = e => {
      setNewUser({ ...newUser,
      [e.target.name]: e.target.value})
  }

  const handleSubmitNewUser = e => {
    e.preventDefault();
  
      if (Object.values(newUser).length < 3 || Object.values(newUser).includes('')) {
        setAlerta({
          msg: 'Todos los campos son obligatorios',
          error: true
        })
        setTimeout(() => {
          setAlerta({})
        }, 3000);
        return;
      }

      if(newUser.newPassword !== newUser.repetirPassword) {
        setAlerta({
          msg: 'Los passwords no coinciden',
          error: true
        })
        setTimeout(() => {
          setAlerta({})
        }, 3000);
        return;
      }

      createUser();

      setNewUser({
        newName: '',
        newEmail: '',
        newPassword: '',
        repetirPassword: ''
      })

      setTimeout(() => {
        setAlerta({})
      }, 3000);
  }

  const handleSubmitLogin = e => {
    e.preventDefault()
    if (Object.values(user).length < 2 || Object.values(user).includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true,
        login: true
      })
      setTimeout(() => {
        setAlerta({})
      }, 3000);
      return;
    }
     loginUser()

     setUser({
       email: '',
       password: ''
     })

     setTimeout(() => {
      setAlerta({})
    }, 3000);
  }

  const loginUser = async () => {
    
    try {
        const { data } = await axios.post('http://localhost:1337/auth/local', {
        identifier: user.email,
        password: user.password,
      });

      console.log(data);
      localStorage.setItem('token', data.jwt)
       setAuth({
         id : data.user.id,
         name : data.user.name,
         email : data.user.email,
       })
       setAlerta({
        msg: 'Accediendo... ',
        error: false,
        login: true
      })
    } catch (error) {
      console.log(error)
    }

    
  }

  const createUser = async () => {
   await axios
      .post('http://localhost:1337/auth/local/register', {
        name: newUser.newName,
        username: newUser.newEmail.split('@')[0],
        email: newUser.newEmail,
        password: newUser.newPassword,
      })
      .then(response => {
    
        console.log('User profile', response.data.user);
        console.log('User token', response.data.jwt);
        localStorage.setItem('token', response.data.jwt)
        setAuth({
          id : response.data.user.id,
          name : response.data.user.name,
          email : response.data.user.email,
        })

        setAlerta({
          msg: 'Usuario Creado',
          error: false
        })

      })
      .catch(error => {
        if (error.response.data?.message[0].messages[0].message === 'Email is already taken.')
        setAlerta({
          msg: 'El email ya está en uso',
          error: true
        })
        console.log('An error occurred:', error.response.data.message[0].messages[0].message);
      });
  }

    const { msg, login } = alerta;

    return(
        <Layout
        pagina='Login'
        headerProps={false}
      >

        {Object.values(auth).length !== 0 || loading ? <Spinner/> 
        :(<>
        
          <h2>Acceder</h2>
            {(msg && login) && <Alerta alerta={alerta}/>}
            <form
            onSubmit={handleSubmitLogin} 
            className={styles.formulario}
            >
            


              <div className={styles.campo}>
                  <label htmlFor='email'>Email:</label>
                  <input
                      id='email'
                      type='email'
                      placeholder='Email de Usuario'
                      name='email'
                      value={user.email}
                      onChange={ e => {handleOnChangeUser(e)}}
                  />
              </div>
              <div className={styles.campo}>
                  <label htmlFor='password'>Password:</label>
                  <input
                      id='password'
                      type='password'
                      placeholder='Password de Usuario'
                      name='password'
                      value={user.password}
                      onChange={ e => {handleOnChangeUser(e)}}
                  />
              </div>

              <input
                  type='submit'
                  value='Acceder'
                  className={styles.boton}
              />
            </form>

            <Link href='./olvide-password'>
              <p className={styles.olvideLink} >Olvidaste tu password?</p>
            </Link>


            <h2>Registrarse</h2>

            {(msg && !login) && <Alerta alerta={alerta}/>}
            <form
                onSubmit={handleSubmitNewUser} 
                className={styles.formulario}
            >

              <div className={styles.campo}>
                  <label htmlFor='newName'>Nombre:</label>
                  <input
                      id='newName'
                      type='text'
                      placeholder='Nombre de Usuario'
                      name='newName'
                      value={newUser.newName}
                      onChange={ e => {handleOnChangeNewUser(e)}}
                  />
              </div>
              
              <div className={styles.campo}>
                  <label htmlFor='newEmail'>Email:</label>
                  <input
                      id='newEmail'
                      type='email'
                      placeholder='Email de Usuario'
                      name='newEmail'
                      value={newUser.newEmail}
                      onChange={ e => {handleOnChangeNewUser(e)}}
                  />
              </div>

              <div className={styles.campo}>
                  <label htmlFor='newPassword'>Password:</label>
                  <input
                      id='newPassword'
                      type='password'
                      placeholder='Password de Usuario'
                      name='newPassword'
                      value={newUser.newPassword}
                      onChange={ e => {handleOnChangeNewUser(e)}}
                  />
              </div>

              <div className={styles.campo}>
                  <label htmlFor='repetir-password'>Repetir Password:</label>
                  <input
                      id='repetir-password'
                      type='password'
                      placeholder='Repetir Password'
                      name='repetirPassword'
                      value={newUser.repetirPassword}
                      onChange={ e => {handleOnChangeNewUser(e)}}
                  />
              </div>

              <input
                  type='submit'
                  value='Registrarse'
                  className={styles.boton}
              />
            </form>
        </>)}
          
      </Layout>
    )
}