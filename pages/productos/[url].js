import { useState } from "react";
import Layout from "../../components/Layout";
import Image from 'next/image';
import styles from '../../styles/ProductoPage.module.css'
import { formatearDineroUSD } from '../../helpers'

function Producto({productoProp}) {

    const [ damaCaballero, setDamaCaballero ] = useState(0);

    const {titulo, imagen, precio, descripcion, color_franela} = productoProp[0];


    const calcularTallas = elementos => {
        let tallas = [];
        for (const key in elementos) {
            if(elementos[key]>0){
                if (key === 'S' || key === 'M' || key === 'L' || key === 'XL'){
                    tallas.push(key)
                } 
            }
        }
        return tallas;
    }
    const tallasCaballero = calcularTallas(color_franela.Caballero);
    const tallasDama = calcularTallas(color_franela.Dama);

  return (
    <Layout
        pagina={titulo}
        headerProps={false}
    >
        <div className="contenedor">
            <div className={styles.producto}>
                <div className={styles.imagenProducto}>
                    <Image layout='responsive' width={400} height={400} src={imagen[0].url} alt={`Imagen ${titulo}`} />
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
                                    tallasDama.map( talla =>(
                                        <p key={talla}>{talla}</p>
                                    ))
                                )
                                
                            ):(
                                tallasCaballero.length === 0 ? (
                                    <p className={styles.noDisponible}> No hay tallas de Caballero Disponibles</p>
                                ) : (
                                    tallasCaballero.map( talla =>(
                                        <p key={talla}>{talla}</p>
                                    ))
                                )
                            )}
                        </div>
                    </div>
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