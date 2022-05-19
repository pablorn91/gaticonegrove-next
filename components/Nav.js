import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineSearch, HiOutlineHeart, HiOutlineShoppingBag } from "react-icons/hi";
import styles from '../styles/Nav.module.css';

const Nav = () => {
  return (

        <div className='contenedor'>
             <nav className={styles.navegacionContenedor}>

                    <div className={styles.burgerMenu}>
                    Menu
                    </div>
                    <Image 
                            width={300}
                            height={70}
                            src="/img/logo.svg" 
                            alt={'Logo Gatico Negro'} 
                        /> 
          
                <div className={styles.navegacion}>
                    <div className={styles.enlaces}>
                        <Link href='#'>Tienda</Link>
                        <Link href='#'>Colecciones</Link>
                        <Link href='#'>Personalizar</Link>
                    </div>

                    <div className={styles.iconContenedor}>
                        <div className={styles.icono}>
                            <HiOutlineSearch/>
                        </div>
                        <div className={styles.icono}>
                            <HiOutlineHeart/>
                        </div>
                        <div className={styles.icono}>
                            <HiOutlineShoppingBag/>
                        </div>
                    </div>
                </div>

                
             </nav>
        </div>
  )
}

export default Nav