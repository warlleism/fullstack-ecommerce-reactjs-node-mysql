import { ColorRing } from 'react-loader-spinner';
import { Context } from "../../context/provider";
import React, { useContext, useState } from 'react';
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '../header';

import './style.scss'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Detalhar = () => {

    const { dados } = useContext(Context);
    const { carrinho } = useContext(Context);
    const { setCarrinho } = useContext(Context);

    const arrayQtdEstrelas = []

    function Stars() {

        const estrelasQtd = localStorage.getItem("estrelas").length

        const valor = estrelasQtd

        for (let i = 0; i < valor; i++) {
            arrayQtdEstrelas.push(i)
        }
    }


    const funcCarrinho = async (id, nome, preco, quantidade) => {
        var nomedado = nome;
        var nomeReplaceSimples = nomedado.replace(/'/g, '');
        var nomeReplaceDupla = nomeReplaceSimples.replace(/"/g, "");
        console.log(nomeReplaceDupla)
        const res = await axios.post(`http://localhost:3001/carrinho/${parseInt(id)}/"${nomeReplaceDupla}"/"${preco}"/${quantidade}`)
        console.log(res)
    }

    return (
        <>

            {Stars()}
            <Header />
            {dados?.length == 0 ?
                <div style={{ height: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ColorRing
                        visible={true}
                        height="130"
                        width="130"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        colors={['#F9F871', '#691A55', '#AE3B59', '#E17053', '#FBB252']}
                    />
                </div>
                :
                <div className='main-container-detalhar'>
                    <div className='container-nome-preco-imagem'>
                        <div className='conteiner-produto-detalhar'>
                            <div className='conteiner-imagem'>
                                <img src={`data:image/png;base64,${localStorage.getItem("imagem") ? localStorage.getItem("imagem") : dados?.imagem}`} />
                            </div>
                            <div className='container-descricao'>
                                <div className='container-estrelas'>
                                    {
                                        arrayQtdEstrelas.map(() => {
                                            return (
                                                <FontAwesomeIcon style={{ fontSize: "2rem", cursor: "pointer", color: "#f8f830" }} icon={faStar} />
                                            )
                                        })
                                    }
                                </div>
                                <div className='nome-produto-detalhar'>{localStorage.getItem("nome") ? localStorage.getItem("nome") : dados?.nome}</div>
                                <div className='descricao-produto-detalhar'>{localStorage.getItem("descricao") ? localStorage.getItem("descricao") : dados?.descricao}</div>
                            </div>
                        </div>

                        <div className='container-produto-pagamento'>
                            <div className='preco-produto-detalhar'>{localStorage.getItem("preco") ? localStorage.getItem("preco") : dados?.preco}</div>
                            <div className='container-cep-calculo'>
                                <div style={{ marginTop: 40, marginBottom: 4, fontSize: 14 }}>Calcular frete e prazo </div>
                                <div className='container-cep-botao'>
                                    <input type="number" placeholder='digite seu CEP' />
                                    <button>Ok</button>
                                </div>
                            </div>
                            <Link to="/carrinho" className='botao-comprar' onClick={() => funcCarrinho(localStorage.getItem("id"), localStorage.getItem("nome"),
                                localStorage.getItem("preco"), 1)}><FontAwesomeIcon style={{ fontSize: "1.3rem", cursor: "pointer", color: "#ffff", marginRight: 10 }} icon={faCartShopping} />Comprar
                            </Link>
                            <div style={{ color: "#0000009f" }}>Este produto é vendido e entregue por Tecnolink.</div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default Detalhar;
