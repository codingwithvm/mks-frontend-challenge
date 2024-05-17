import React, { useEffect, useState } from 'react'
import styles from '@/styles/main.module.scss'
import { Product } from './Main'
import { formattedPrice } from '@/utils/formattedPrice'

interface ShoppingCartProps {
    isOpen: boolean
    ToggleCart: () => void
    cartItems: Product[]
    cartTotal: number
    SetCartItems: any
}

const ShoppingCart = ({ isOpen, ToggleCart, cartItems, cartTotal, SetCartItems }: ShoppingCartProps) => {


    const deleteProduct = (index: number)  => {
        const productIndex = cartItems.findIndex(i => i.index === index)
        SetCartItems(cartItems.splice(productIndex, 1))
    }

    return (
        <aside className={`${styles.shoppingCart} ${isOpen ? styles.open : ''}`}>
            <div className={styles.shoppingCartHeader}>
                <h1>Carrinho de compras</h1>
                <button className={styles.closeButton} onClick={ToggleCart}>
                    X
                </button>
            </div>
            <ul className={styles.shoppingCartProducts}>
                {cartItems && cartItems.map((item, index) => (
                    <>
                        <div className={styles.closeButtonCart} onClick={() => deleteProduct(index)}><span>X</span></div>
                        <li key={index} className={styles.shoppingCartProduct}>
                            <img src={item.photo} alt={item.name} width={46} />
                            <span>{item.name}</span>
                            <div className={styles.itemQuantity}>
                                <span>Qtd</span>
                                <div className={styles.quantity}>
                                    <button>-</button>
                                    <span className={styles.itemQuantityNum}>1</span>
                                    <button>+</button>
                                </div>
                            </div>
                            <h2 className={styles.itemPrice}>R${formattedPrice(item.price)}</h2>
                        </li>
                    </>
                ))}
            </ul>
            <div className={styles.shoppingCartFooter}>
                <div className={styles.cartTotal}>
                    <div>Total:</div>
                    <div>R${cartTotal}</div>
                </div>
                <div className={styles.buyButton}>
                    Finalizar Compra
                </div>
            </div>
        </aside>
    )
}

export default ShoppingCart