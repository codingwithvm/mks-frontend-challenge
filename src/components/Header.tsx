import styles from '@/styles/main.module.scss'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Product } from './Main'

interface HeaderProps {
    toggleCart: () => void
    cartItems: Product[]
}

const Header = ({ toggleCart, cartItems }: HeaderProps) => {
    const [cartItemCount, setCartItemCount] = useState(0)

    useEffect(() => {
        const num = cartItems.length
        setCartItemCount(num)
    }, [cartItemCount])

    return (
        <header
            className={styles.header}
        >
            <motion.div
                className={styles.logo}
                initial={{ marginTop: -200, opacity: 0 }}
                animate={{ marginTop: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <h1>MKS</h1>
                <div>Sistemas</div>
            </motion.div>
            <motion.button
                className={styles.cart}
                initial={{ marginTop: -200, opacity: 0 }}
                animate={{ marginTop: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                onClick={toggleCart}
            >
                <Image alt='cart' src='/cart.png' width={19} height={18} />
                <div>{cartItemCount}</div>
            </motion.button>
        </header>
    )
}

export default Header