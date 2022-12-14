import React, { useContext, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { Context } from "../../context/provider";
import { Spinner } from '../../styled/index';
import { useEffect } from 'react';
import Header from '../header';
import axios from 'axios';

import './style.scss'
import { Link } from 'react-router-dom';

const Carrinho = () => {

    const [valor, setValor] = useState()
    const [data, setData] = useState([]);
    const [acumulador, setAcumulador] = useState(0)
    const { mobileBar } = useContext(Context);

    useEffect(() => {
        fetch("http://localhost:3001/carrinho/listar")
            .then((res) => res.json())
            .then((data) => {
                setData(data)
            })
    }, [acumulador])

    const setarQuantidade = async (quantidade, id) => {
        if (quantidade < 1) {
            return
        }
        const res = await axios.post(`http://localhost:3001/carrinho/${quantidade}/${id}`)
        setAcumulador(acumulador + 1)
    }

    const deletarProduto = async (id) => {
        const res = await axios.delete(`http://localhost:3001/carrinho/deletar/${id}`)
        setAcumulador(acumulador - 1)
    }

    useEffect(() => {
        const reduceSalarios = data[0]?.reduce((valor, valorAtual) => valor + parseInt(valorAtual?.preco?.replace(/\D+/g, '')) * valorAtual?.quantidade, 0)
        let price = reduceSalarios?.toString()

        if (price?.length == 7) {
            price = price?.replace(/(\d{2})/, '$1,')
            price = price?.replace(/(\d{3}(?!$))/g, '$1.')
        }
        if (price?.length == 6) {
            price = price?.replace(/(\d{1})/, '$1,')
            price = price?.replace(/(\d{3}(?!$))/g, '$1.')
        }
        if (price?.length == 5) {
            price = price?.replace(/(\d{3})/, '$1,')
        }

        if (price?.length == 4) {
            price = price?.replace(/(\d{2})/, '$1,')
        }

        setValor(price)
        localStorage.setItem("valorTotal", price)
    }, [data])

    return (
        <>
            <Header acumulador={acumulador} />
            {data?.length == 0 ?
                <Spinner>
                    <ColorRing
                        visible={true}
                        height="130"
                        width="130"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        colors={['#F9F871', '#691A55', '#AE3B59', '#E17053', '#FBB252']}
                    />
                </Spinner>
                :
                <>
                    {mobileBar == false &&
                        (
                            <div className='main-container-carrinho'>
                                <div className='container-nome-preco-imagem'>
                                    {
                                        data[0]?.map((dados) => {
                                            return (
                                                <div className='conteiner-produto-carrinho'>
                                                    <div className='conteiner-imagem'>
                                                        <img src={`data:image/png;base64,${dados?.imagem}`} />
                                                    </div>
                                                    <div className='container-descricao'>
                                                        <div className='nome-produto-carrinho'>{dados?.nome}</div>
                                                    </div>
                                                    <div className='container-quantidade'>
                                                        <div className='quantidade'>
                                                            <div className='operadores' onClick={() => setarQuantidade(dados?.quantidade - 1, dados?.id)}>-</div>
                                                            <div>{dados?.quantidade}</div>
                                                            <div className='operadores' onClick={() => setarQuantidade(dados?.quantidade + 1, dados?.id)}>+</div>
                                                        </div>
                                                        <div onClick={() => deletarProduto(dados?.id)}>remover</div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className='container-preco-total'>
                                    <div className='resumo'>
                                        <div className='titulo-resumo'>Resumo do pedido</div>
                                        <div className='quantidade-produtos'>
                                            <div>{data[0]?.length} produtos</div>
                                            <div>R$ {valor == "0," ? 0 : valor}</div>
                                        </div>
                                    </div>
                                    <div className='resumo-valor-total'>
                                        <div>Total</div>
                                        <div>R$ {valor}</div>
                                    </div>
                                    <Link to="/comprar" className='botao-continuar' style={{ textDecoration: "none" }}>
                                        {
                                            valor == 0 ? <div style={{ color: "#ffff" }}>continuar</div> : <div style={{ color: "#ffff" }}>continuar</div>
                                        }

                                    </Link>
                                </div>
                            </div>
                        )
                    }
                </>
            }
        </>
    );
}

export default Carrinho;
