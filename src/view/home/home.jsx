import BuscarMes from '../../util/mes';
import { useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './style.scss'

const Home = () => {

    useEffect(() => {
        fetch("http://localhost:3001/listar")
            .then((res) => res.json())
            .then((data) => {
                setData(data)
            })
    }, [])

    const [data, setData] = useState([])
    const date = new Date();
    const mes = date.getMonth() + 1;
    const [posicao, setPosicao] = useState(0)

    return (
        <>
            {console.log(posicao)}
            {data?.length == 0 ?
                <div style={{ height: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ColorRing
                        visible={true}
                        height="130"
                        width="130"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                    />
                </div>
                :
                <div className='main-conteiner-cards'>
                    <div className='play-content'><div>{BuscarMes(mes)} TECH</div></div>
                    <div style={{ display: 'flex', alignItems: "center" }}>
                        <FontAwesomeIcon className='arrowLeft' icon={faArrowLeft} onClick={() => posicao == 0 ? setPosicao(0) : setPosicao(posicao + 290)} />
                        <div className='conteiner-carrousel'>
                            <div className='carrousel' style={{ transform: `translateX(${posicao}px)` }}>
                                {data[0]?.map((e) => {
                                    return (
                                        <div className='conteiner-card'>
                                            <img src={`data:image/png;base64,${e?.imagem}`} />
                                            <div className='nome-produto'>{e?.nome}</div>
                                            <div className='preco-produto'>{e?.preco}</div>
                                            <div className='pagamento-produto'>À vista no PIX</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <FontAwesomeIcon className='arrowRigth' icon={faArrowRight} onClick={() => posicao == -580 ? setPosicao(0) : setPosicao(posicao - 290)} />
                    </div>
                </div>
            }


        </>
    );
}

export default Home;
