import { useContext, useEffect } from "react"
import GuitarContext from '../../../contexts/Guitar/GuitarContext'
import { Link } from "react-router-dom";

const GuitarList = () => {
  const ctx = useContext(GuitarContext);
  const { guitars, getGuitars } = ctx;

  useEffect(() => {
    getGuitars();
  }, [])
  return (
    <>
      <section className="max-w-7xl mx-auto py-16 px-8 grid grid-cols-1 gap-y-4 gap-x-12 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-2 flex-column">
        {guitars.length === 0 ? (
          <p>No hay guitarras</p>
        ) : (
          guitars.map(guitar => {
            return (
              <div key={guitar._id} className="border flex flex-col">
                <div className="bg-gray-200">
                  <Link to={`/guitarras/${guitar.slug}`} state={{ guitar }}>
                    <img
                      src={guitar.img}
                      alt={guitar.description}
                      className="w-full h-96 object-center object-cover"
                    />
                  </Link>
                </div>
                <div className="flex-1 p-4 space-y-2 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900">{guitar.name}</h3>
                  <p className="text-gray-500 pb-8">{guitar.description}</p>
                  <Link to={`/guitarras/${guitar.slug}`} state={{ guitar }} className="btn-product">
                    <button type="button" className="w-full">
                      Ver guitarra
                    </button>
                  </Link>
                </div>
              </div>
            )
          })
        )}
      </section>
    </>
  )
}

export default GuitarList