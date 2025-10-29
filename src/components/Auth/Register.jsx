import { useContext, useState } from "react";
import UserContext from "../../contexts/User/UserContext";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const ctx = useContext(UserContext);
  const navigate = useNavigate();
  const { registerUser } = ctx;
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newUser.password !== newUser.confirmPassword) {
      return setErrorMessage("Las contrasenas no coinciden");
    }
    const response = await registerUser(newUser);
    console.log(response);
    if (response) {
      navigate("/iniciar-sesion");
    } else {
      return setErrorMessage("Hubo un error al registrarse");
    }
  };

  return (
    <>
      <section className="flex flex-col justify-center py-8 mx-auto">
        <h2 className="text-center text-3xl font-bold mt-8">Crear cuenta</h2>
        <p className="mt-2 text-center text-sm">
          ¿Ya tienes cuenta? &nbsp;
          <Link
            to="/iniciar-sesion"
            className="font-medium text-brand-light-purple underline"
          >
            Inicia sesion
          </Link>
        </p>
      </section>

      <section className="mt-8 px-4 mx-auto w-full max-w-md">
        <div>
          <form
            onSubmit={(event) => {
              handleSubmit(event);
            }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="username" className="form-label">
                Nombre de usuario
              </label>
              <input
                onChange={(event) => {
                  handleChange(event);
                }}
                name="username"
                type="text"
                className="form-input"
              />
            </div>

            <div>
              <label htmlFor="email" className="form-label">
                Correo Electronico
              </label>
              <input
                onChange={(event) => {
                  handleChange(event);
                }}
                name="email"
                type="email"
                className="form-input"
              />
            </div>

            <div>
              <label htmlFor="password" className="form-label">
                Contrasena
              </label>
              <input
                onChange={(event) => {
                  handleChange(event);
                }}
                name="password"
                type="password"
                required
                className="form-input"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="form-label">
                Confirma tu contrasena
              </label>
              <input
                onChange={(event) => {
                  handleChange(event);
                }}
                name="confirmPassword"
                type="password"
                required
                className="form-input"
              />
            </div>

            <div className="py-4">
                <button type="submit" className="form-button">
                  Crear cuenta
                </button>
            </div>

            <div>
              <p className="text-center text-red-800">{errorMessage}</p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
