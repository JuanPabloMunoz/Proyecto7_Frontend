import { useContext, useState } from "react";
import UserContext from "../../contexts/user/UserContext";
import { Link } from "react-router-dom";

const Login = () => {
  const ctx = useContext(UserContext);
  const { loginUser } = ctx;

  const [logUser, setLogUser] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setLogUser({
      ...logUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser(logUser);
    if (response) setErrorMessage(response);
    return;
  };

  return (
    <>
      <section className="flex flex-col justify-center py-8 mx-auto">
        <h2 className="text-center text-3xl font-bold mt-8">Iniciar sesión</h2>
        <p className="mt-2 text-center text-sm">
          ¿Aún sin cuenta? &nbsp;
          <Link
            to="/registro"
            className="font-medium text-brand-light-purple underline"
          >
            Regístrate
          </Link>
        </p>
      </section>

      <section className="mt-8 px-4 mx-auto w-full max-w-md">
        <div>
          <form
            className="space-y-6"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div>
              <label htmlFor="email" className="form-label">
                Correo electrónico
              </label>
              <input
                onChange={(evt) => {
                  handleChange(evt);
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
                onChange={(evt) => {
                  handleChange(evt);
                }}
                name="password"
                type="password"
                className="form-input"
              />
            </div>

            <div>
              <button type="submit" className="form-button">
                Acceder a tu cuenta
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

export default Login;
