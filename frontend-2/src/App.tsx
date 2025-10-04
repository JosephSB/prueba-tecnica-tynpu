import { z } from "zod";
import "./App.css";
import { useForm } from "./hooks/useForm";

const FormSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .regex(/^[a-záéíóúñA-ZÁÉÍÓÚÑ\s]+$/, 'El nombre solo puede contener letras'),
  
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('El email no es válido'),
  
  age: z
    .string()
    .min(1, 'La edad es requerida')
    .transform((val) => parseInt(val))
    .refine((val) => !isNaN(val), 'La edad debe ser un número')
    .refine((val) => val >= 18, 'Debes ser mayor de 18 años')
    .refine((val) => val <= 120, 'Por favor ingresa una edad válida')
});

type UserForm = z.infer<typeof FormSchema>;

function App() {
  const { data, errors, handleChange, handleSubmit } = useForm<UserForm>(
    FormSchema,
    { name: "", email: "", age: NaN }
  );

  const submitForm = (form: UserForm) => {
    console.log("Datos válidos:", form);
  };

  return (
    <div className="app-main">
      <h1 className="form-title">Formulario de Registro</h1>
      <form className="form" onSubmit={handleSubmit(submitForm)}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">
            Nombre
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Ej. Joseph Silva"
            autoComplete="none"
            className="form-input"
            value={data.name} onChange={handleChange}
          />
          {errors.name && <p className="error-msg">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Ej. test@email.com"
            autoComplete="none"
            className="form-input"
            value={data.email} onChange={handleChange}
          />
          {errors.email && <p className="error-msg">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="age">
            Edad
          </label>
          <input
            id="age"
            name="age"
            type="number"
            placeholder="Ej. 25"
            autoComplete="none"
            value={data.age} onChange={handleChange}
            className="form-input"
          />
          {errors.age && <p className="error-msg">{errors.age}</p>}
        </div>

        <button type="submit" className="form-button">
          Registrar
        </button>
      </form>
    </div>
  );
}

export default App;
