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


    const Left = () => {
        posicao === 0 ? setPosicao(0) : setPosicao(parseInt(posicao + 11))
    }

    const Rigth = () => {
        posicao === -33 ? setPosicao(0) : setPosicao(parseInt(posicao - 11))
    }

    return (
        <>
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
                    <div className='conteiner-arrow-left' style={{ position: 'absolute', zIndex: "9999", backgroundColor: "#f2f2f2", width: 52, left: 0, height: "100%", display: 'flex', alignItems: 'center' }}>
                        <FontAwesomeIcon className='arrowLeft' style={{ fontSize: "2rem", cursor: "pointer", marginLeft: "10px", color: "#9d9d9dcf" }} icon={faArrowLeft} onClick={() => Left()} />
                    </div>
                    <div className='conteiner-arrow-right' style={{ position: 'absolute', zIndex: "9999", backgroundColor: "#f2f2f2", width: 50, right: 0, height: "100%", display: 'flex', alignItems: 'center' }}>
                        <FontAwesomeIcon className='arrowRigth' style={{ fontSize: "2rem", cursor: "pointer", marginRight: "10px", color: "#9d9d9dcf" }} icon={faArrowRight} onClick={() => Rigth()} />
                    </div>
                    <div className='conteiner-carrousel'>
                        <div className='carrousel' style={{ transform: `translateX(${posicao}%)` }} >
                            {data[0]?.map((e) => {
                                return (
                                    <div className='conteiner-card'>
                                        <div>
                                            <img src={`data:image/png;base64,${e?.imagem}`} />
                                            <div className='nome-produto'>{e?.nome}</div>
                                        </div>
                                        <div>
                                            <div className='preco-produto'>{e?.preco}</div>
                                            <div className='pagamento-produto'>À vista no PIX</div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            }


        </>
    );
}

export default Home;
