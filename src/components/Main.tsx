import styles from '@/styles/main.module.scss'
import { Skeleton } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { formattedPrice } from '@/utils/formattedPrice'

export interface Product {
    index: number
    id: number
    name: string
    description: string
    photo: string
    price: string
}


export default React.memo(({ setCartItems }: any) => {
    const [cartTotal, setCartTotal] = useState(0)

    const Products = () => {
        const { isPending, error, data } = useQuery<{ products: Product[] }>({
            queryKey: ['products'],
            queryFn: () =>
                fetch('https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products?page=1&rows=8&sortBy=id&orderBy=ASC').then(res => res.json())
        })

        if (isPending) return (
            Array.from(new Array(8)).map((_, index) => (
                <li key={index} className={styles.productItem}>
                    <div className={styles.productItemImage}>
                        <Skeleton variant="rectangular" width={111} height={138} />
                    </div>
                    <div className={styles.productItemBody}>
                        <div className={styles.productInfo}>
                            <Skeleton variant="text" width={192} sx={{ fontSize: '1rem' }} />
                        </div>
                        <Skeleton variant="text" width="80%" height={20} />
                        <Skeleton variant="text" width="90%" height={20} />
                    </div>
                </li>
            ))
        )

        if (error) return 'An error has ocurred' + error.message

        const handleAddToCart = (product: Product) => {
            data.products.map((item, index) => item.index = index)

            setCartItems((item: any) => {
                const newItems = [...item]
                newItems.unshift(product)
                return newItems
            })
        }

        return (
            data.products.map((product, index) => (
                <motion.li
                    key={product.id}
                    className={styles.productItem}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                    <motion.div
                        className={styles.productItemImage}
                        initial={{ opacity: 0, y: 20, scale: 0.5 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.16 }}
                    >
                        <img width={111} height={138} alt={product.name} src={product.photo} />
                    </motion.div>
                    <div className={styles.productItemBody}>
                        <div className={styles.productInfo}>
                            <h1 className={styles.productTitle}>
                                {product.name}
                            </h1>
                            <p className={styles.productPrice}>
                                R${formattedPrice(product.price)}
                            </p>
                        </div>
                        <p className={styles.productDescription}>
                            {product.description}
                        </p>
                    </div>
                    <div className={styles.productItemBottom}>
                        <Image alt='shopping-bag' src='/shopping-bag.png' width={12} height={13.5} />
                        <div onClick={() => handleAddToCart(product)}>COMPRAR</div>
                    </div>
                </motion.li>
            ))
        )
    }

    return (
        <main>
            <section className={styles.productGrid}>
                <ul>
                    <Products />
                </ul>
            </section>
        </main>
    )
})