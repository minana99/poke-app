import React, { useEffect, useState } from 'react'


const Card = ({ pokemon }) => {

	const [isBack, setIsBack] = useState(false)
	useEffect(() => {
	}, [])
	const changeImg = () => {
		setIsBack(!isBack)
	}
	return (
		<div className='card'>
			<div className="cardImg">
				<h3>ポケモンの名前：{pokemon.name}</h3>
				<div className="cardTypes">
					タイプ
					{pokemon.types.map((type,id) => {
						return <div key={id}>
										<span className="typeWild">{type.type.name}</span>
									</div>
					})
					}
				</div>
				{
					isBack ?
						<img src={pokemon.sprites.back_default} alt="" />
						: <img src={pokemon.sprites.front_default} alt="" />
				}
				<button className="btn btn-primary" onClick={changeImg}>むきをかえる</button>
			</div>
		</div>
	)
}

export default Card