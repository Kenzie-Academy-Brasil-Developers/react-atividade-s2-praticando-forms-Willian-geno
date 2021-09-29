import './App.css';
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from 'react';
 


function App() {

  const [istrue, setIsTrue] = useState(true)
  const [form, setForm] = useState({}); 
  
    const formSchema = yup.object().shape({
      name: yup.string().required("Mandatory name"),
      email: yup.string().required("Mandatory email").email("Email imvalido"),
      password: yup
        .string()
        .required("Mandatory password")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "senha invalida"),
      passawordComfirmation: yup
        .string()
        .required("Mandatory Comfirmation")
        .oneOf([yup.ref("password"),null],"Passawords must match"),
      cellphone: yup
        .string()
        .required("Mandatory cellphone")
        .matches(/^(\([0-9]{2}\))\s([0-9]{1})?([0-9]{4})-([0-9]{4})$/, "cellphone ivalid"),
      birthDate: yup
        .string()
        .required("Mandatory birth date")
        .matches(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/, "Birth Date invalid"),
      nationality: yup.string().required("Mandatory nationality"),
    })

  const { register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(formSchema)
  });

  const handleSubmitfunction = (date) => {
    setIsTrue(false);
    setForm(date);
  }

  console.log(errors)

  return (
    <div className="App">
      {istrue ? (
      <form className = "form" onSubmit = {handleSubmit(handleSubmitfunction)}>
        <input placeholder = "Username" {...register("name")} />
        {errors.name && errors.name.message}
        <input placeholder = "Email"{...register("email")}/>
        {errors.email && errors.email.message}
        <input placeholder = "Password(8 caracteres,letras, numeros e caracter especial)"{...register("password")}/>
        {errors.password && errors.password.message}
        <input placeholder = "Password comfirmation"{...register("passawordComfirmation")}/>
        {errors.passawordComfirmation && errors.passawordComfirmation.message}
        <input placeholder = "Cellphone ex: (00) 00000-0000"{...register("cellphone")}/>
        {errors.cellphone && errors.cellphone.message}
        <input placeholder = "Birth date ex: DD/MM/YYYY"{...register("birthDate")}/>
        {errors.birthDate && errors.birthDate.message}
        <input placeholder = "Nationality" {...register("nationality")}/>
        {errors.nationality && errors.nationality.message}
        <button type = "subimt"> Enviar </button>
      </form>
      ):(<div>
            <h1>Name: {form.name}</h1>
            <h1>Email: {form.email}</h1>
            <h1>Callphonr: {form.cellphone}</h1>
            <h1>Birth date: {form.birthDate}</h1>
            <h1>Vationality: {form.nationality}</h1>
       </div>
      )}
    </div>
  );
}

export default App;
