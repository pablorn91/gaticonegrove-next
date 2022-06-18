import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import Alerta from "../../components/Alerta";
import Image from 'next/image';
import Link from "next/link";
import styles from '../../styles/ProductoPage.module.css'
import { formatearDineroUSD } from '../../helpers'

import useAuth from "../../hooks/useAuth";

function Producto({productoProp}) {

    //Determinar si se ha elegido Dama o Caballero
    const [ damaCaballero, setDamaCaballero ] = useState(0);

    const [ tallaSelected, settallaSelected ] = useState('');

    const [ cantidad, setCantidad ] = useState(1);

    const [ cantidadMax, setCantidadMax ] = useState(1);
    
    const [ alerta, setAlerta ] = useState({})

    const { auth, addToCart } = useAuth()

    useEffect(() => {
        settallaSelected('')
        setCantidad(1)
    },[damaCaballero])

    useEffect(()=>{
        const calcularMaxTalla = () => {
            setCantidad(1)
            const talla = 1;
                if (damaCaballero === 0) {
                        talla = tallasCaballero.find( elemento => {
                    if ( elemento.talla === tallaSelected ) return elemento
                   })
                }
                if (damaCaballero === 1) {
                    talla = tallasDama.find( elemento => {
                if ( elemento.talla === tallaSelected ) return elemento
               })
            }
            setCantidadMax(talla?.cantidad)
        }
        calcularMaxTalla();
    }, [tallaSelected])

    useEffect(() => {
        if(cantidad>cantidadMax) {

            setAlerta({
                msg: `La cantidad máxima de la talla seleccionada es ${cantidadMax}`,
                error: true
              })
              setTimeout(() => {
                setAlerta({})
              }, 5000);

            setCantidad(cantidadMax)
        }
    },[cantidad])

    const {titulo, imagen, precio, descripcion, color_franela, id } = productoProp[0];

    const calcularTallas = elementos => {
        let tallas = [];
        for (const key in elementos) {
            if(elementos[key]>0){
                if (key === 'S' || key === 'M' || key === 'L' || key === 'XL'){
                    tallas.push({ talla: key, cantidad : elementos[key]})
                } 
            }
        }
        return tallas;
    }
    const tallasCaballero = calcularTallas(color_franela.Caballero);
    const tallasDama = calcularTallas(color_franela.Dama);

    const handleTallaSelected = elemento => {
        settallaSelected(elemento.talla)
    }

    const handleAgregarCarrito = () => {

        //Validación
        if ( cantidad < 1) {
            setAlerta({
                msg: `Cantidad no válida`,
                error: true
              })
              setTimeout(() => {
                setAlerta({})
              }, 5000);
            return
        }

        //Crear datos para enviar a agregar al carrito
        const corte = damaCaballero ? 'Dama' : 'Caballero';
        const productId = `${id}-${damaCaballero ? 'Dama' : 'Caballero'}-${color_franela.Color}-${tallaSelected}`;
        const SelectedProduct = {
            id,
            imagen: imagen[0].url,
            titulo,
            precio,
            color_franela: color_franela.Color,
            corte,
            talla: tallaSelected,
            cantidad,
            productId
        }

        addToCart(SelectedProduct)
    }

    
    const { msg } = alerta;
  return (
    <Layout
        pagina={titulo}
        headerProps={false}
    >
        <div className={`${styles.contenedorProducto} contenedor`}>
            <div className={styles.producto}>
                <div className={styles.imagenProducto}>
                    <Image layout='responsive' width={300} height={300} src={imagen[0].url} alt={`Imagen ${titulo}`} />
                </div>
                <div className={styles.detallesProducto}>
                    <h3>{titulo}</h3>
                    <p>{formatearDineroUSD(precio)}</p>

                    <div className={styles.tallasDamaCaballero}>

                        <select
                            value={damaCaballero}
                            onChange={e => setDamaCaballero(parseInt(e.target.value))}
                        >
                            <option value='0'>Caballero</option>
                            <option value='1'>Dama</option>
                        </select>

                        <div className={styles.tallas}>
                        {damaCaballero ? (
                                
                                tallasDama.length === 0 ? (
                                    <p className={styles.noDisponible}> No hay tallas de Dama Disponibles</p>
                                ) : (
                                    tallasDama.map( elemento =>(
                                        <button 
                                            key={elemento.talla}
                                            onClick={() => handleTallaSelected(elemento)} 
                                            className={tallaSelected === elemento.talla ? styles.tallaSeleccionada : null}
                                        >{elemento.talla}</button>
                                    ))
                                )
                                
                            ):(
                                tallasCaballero.length === 0 ? (
                                    <p className={styles.noDisponible}> No hay tallas de Caballero Disponibles</p>
                                ) : (
                                    tallasCaballero.map( elemento =>(
                                        <button 
                                            key={elemento.talla}
                                            onClick={() => handleTallaSelected(elemento)} 
                                            className={tallaSelected === elemento.talla ? styles.tallaSeleccionada : null}
                                       >{elemento.talla}</button>
                                    ))
                                )
                            )}
                        </div>
                    </div>

                    <div className={styles.cantidadAgregarCarrito}>

                        <input 
                            disabled={ tallaSelected ? '' : true }
                            type='number'
                            className={styles.cantidad}
                            value={cantidad}
                            onChange={e => setCantidad(parseInt(e.target.value))} 
                            min='1'
                            max={cantidadMax}
                        />
                        {Object.values(auth).length !== 0 && tallaSelected !== '' ? ( 
                            <button 
                                className={styles.agregarAlCarrito}
                                onClick={handleAgregarCarrito}
                            >Agregar al carrito</button>
                           
                         ) :  (
                            <button disabled={true} className={`${styles.agregarAlCarrito} ${styles.inactivo}`} >Agregar al carrito</button>
                         )}
                        

                    </div>

                    {Object.values(auth).length === 0 && (
                        <Link href='/mi-cuenta/acceder-registrarse'>
                            <a className={styles.accederParaCarrito}>Accede Para Comenzar a Agregar Productos
                                </a>
                                </Link>
                    )}

                    { msg && <Alerta alerta={alerta}/>}

                </div>
            </div>
                <p className={styles.descripcion}>{descripcion}</p>
            
        </div>
    </Layout>
  )
}

export async function getServerSideProps({ query: { url }}) {
    const urlProducto = `${process.env.API_URL}/productos?url=${url}`;
    const respuesta = await fetch(urlProducto);
    const productoProp =await respuesta.json();
    return {
        props: {
            productoProp
        }
    }
}

export default Producto