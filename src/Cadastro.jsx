import { useState } from 'react'
import axios from 'axios'
import './App.css'

function Cadastro() { 
    

    return(
        <div className='login-box'>
           <input 
           type="text"
           name='nome'
            />
            <input 
            type="text"
            name='email'
             />
            <input 
            type="text" 
            name='senha'
            />
            <input
            type="text"
            name='perfil' 
            />
        </div>

    )
}