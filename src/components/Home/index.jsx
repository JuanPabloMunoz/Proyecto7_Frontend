import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <main className="text-center px-4 mt-24 mx-auto"> 
        <h1 className="text-5xl font-extrabold text-gray-900">
          Aplicación de Servicios Musicales
        </h1>
        <p className="mt-3 mx-auto text-gray-500">
          Accede al menú y revisa nuestros servicios.
        </p>
        <section className="mt-16 mx-auto max-w-md">
          <article>
            <Link to='/guitarras' className="btn-product">
              Ver el menú de servicios
            </Link>
            <img src="https://imgproxy.domestika.org/unsafe/w:820/plain/src://content-items/001/571/249/Captura_de_pantalla_2016-03-15_a_las_10.30.17_p.m.-original.png?1458099146" style={{ marginTop: '20px'}} alt=""/>
          </article>
        </section>
      </main>
    </>
  )
};

export default Home;
