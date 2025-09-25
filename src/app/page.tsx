'use client'

import { Button, Form, InputNumber, List } from 'antd'
import { useState } from 'react'

import './page.scss'

const items = [{}]

const equipmentData = [
	{
		category: 'Infantry Equipment',
		items: [
			{
				key: 'infantry_equipment_1',
				label: 'Infantry Equipment 1',
				img_src: '/Infantry0.png',
			},
			{
				key: 'infantry_equipment_2',
				label: 'Infantry Equipment 2',
				img_src: '/Infantry1.png',
			},
			{
				key: 'infantry_equipment_3',
				label: 'Infantry Equipment 3',
				img_src: '/Infantry2.png',
			},
			{
				key: 'infantry_equipment_4',
				label: 'Infantry Equipment 4',
				img_src: '/Infantry3.png',
			},
		],
	},
	{
		category: 'Artillery',
		items: [
			{
				key: 'artillery_equipment_1',
				label: 'Artillery Equipment 1',
				img_src: '/Art_1_comintern.png',
			},
			{
				key: 'artillery_equipment_2',
				label: 'Artillery Equipment 2',
				img_src: '/Art_2_comintern.png',
			},
			{
				key: 'artillery_equipment_3',
				label: 'Artillery Equipment 3',
				img_src: '/Art_3_comintern.png',
			},
		],
	},
	{
		category: 'Tank Destroyers / AT',
		items: [
			{
				key: 'tank_destroyer_equipment_1',
				label: 'Tank Destroyer Equipment 1',
				img_src: '/AT_1_allies.png',
			},
			{
				key: 'tank_destroyer_equipment_2',
				label: 'Tank Destroyer Equipment 2',
				img_src: '/AT_2_allies.png',
			},
			{
				key: 'tank_destroyer_equipment_3',
				label: 'Tank Destroyer Equipment 3',
				img_src: '/AT_3_allies.png',
			},
		],
	},
	{
		category: 'Anti-Air',
		items: [
			{
				key: 'aa_gun_equipment_1',
				label: 'AA Gun Equipment 1',
				img_src: '/AA_1_allies.png',
			},
			{
				key: 'aa_gun_equipment_2',
				label: 'AA Gun Equipment 2',
				img_src: '/AA_2_allies.png',
			},
			{
				key: 'aa_gun_equipment_3',
				label: 'AA Gun Equipment 3',
				img_src: '/AA_3_allies.png',
			},
		],
	},
	{
		category: 'Trucks / Motorized',
		items: [
			{
				key: 'motorized_equipment_1',
				label: 'Motorized Equipment 1 (Generic Trucks)',
				img_src: '/Motorized_equipment_0.png',
			},
			{
				key: 'motorized_equipment_2',
				label: 'Motorized Equipment 2 (Later-Tier Motorized)',
				img_src: '/Motorized_equipment_1.png',
			},
		],
	},
	{
		category: 'Armored Cars',
		items: [
			{
				key: 'armored_car_equipment_0',
				label: 'Armored Car Equipment 0',
				img_src: '/Armored_car_equipment_0.png',
			},
			{
				key: 'armored_car_equipment_1',
				label: 'Armored Car Equipment 1',
				img_src: '/Armored_car_equipment_1.png',
			},
			{
				key: 'armored_car_equipment_2',
				label: 'Armored Car Equipment 2',
				img_src: '/Armored_car_equipment_2.png',
			},
			{
				key: 'armored_car_equipment_3',
				label: 'Armored Car Equipment 3',
				img_src: '/Armored_car_equipment_3.png',
			},
		],
	},
	{
		category: 'Mechanized Units',
		items: [
			{
				key: 'mechanized_equipment_1',
				label: 'Mechanized Equipment 1',
				img_src: '/Mechanized_equipment_1.png',
			},
			{
				key: 'mechanized_equipment_2',
				label: 'Mechanized Equipment 2',
				img_src: '/Mechanized_equipment_2.png',
			},
			{
				key: 'mechanized_equipment_3',
				label: 'Mechanized Equipment 3',
				img_src: '/Mechanized_equipment_3.png',
			},
		],
	},
	{
		category: 'Rocket Artillery',
		items: [
			{
				key: 'rocket_artillery_1',
				label: 'Rocket Artillery 1',
				img_src: '/Rocket_Art_1_allies.png',
			},
			{
				key: 'rocket_artillery_2',
				label: 'Rocket Artillery 2',
				img_src: '/Rocket_Art_2_allies.png',
			},
		],
	},
]

const aeCommand = 'add_equipment'

const openNativeNotification = (message: string, imgSrc: string | null) => {
	const notification = document.createElement('div')
	notification.className = 'native-notification'

	const content = document.createElement('div')
	content.style.display = 'flex'
	content.style.alignItems = 'center'
	content.style.gap = '0.5rem'

	if (imgSrc) {
		const img = document.createElement('img')
		img.src = `/items${imgSrc}`
		img.alt = 'Item Image'
		img.style.width = '50px'
		img.style.height = '50px'
		img.style.objectFit = 'contain'
		content.appendChild(img)
	}

	const text = document.createElement('span')
	text.innerText = message
	content.appendChild(text)

	notification.appendChild(content)
	document.body.appendChild(notification)

	setTimeout(() => {
		notification.classList.add('fade-out')
		notification.addEventListener('transitionend', () => {
			notification.remove()
		})
	}, 3000)
}

export default function Home() {
	const [count, setCount] = useState(1_000_000)

	return (
		<div className='page'>
			<main className='main'>
				<h1 className='title'>Hearts of Iron IV - Commands</h1>

				<Form className='count-form'>
					<Form.Item label='Count'>
						<InputNumber
							value={count}
							onChange={(value) => setCount(value || 0)}
							style={{ width: '100%' }}
						/>
					</Form.Item>

					<Button
						onClick={() => {
							setCount(1000)
						}}
					>
						1.000
					</Button>

					<Button
						onClick={() => {
							setCount(10_000)
						}}
					>
						10.000
					</Button>

					<Button
						onClick={() => {
							setCount(100_000)
						}}
					>
						100.000
					</Button>

					<Button
						onClick={() => {
							setCount(1_000_000)
						}}
					>
						1'000.000
					</Button>
				</Form>

				<List
					className='items-list'
					dataSource={equipmentData}
					renderItem={(category) => (
						<div
							className='item-category'
							key={category.category}
						>
							<span className='item-title'>{category.category}</span>

							<div className='items-container'>
								{category.items.map((item) => (
									<div
										key={item.key}
										onClick={() => {
											const command = `${aeCommand} ${item.key} ${count}`
											navigator.clipboard.writeText(command)
											openNativeNotification(`Copied: ${command}`, item.img_src)
										}}
										className='item-container'
									>
										{item.img_src && (
											<div
												style={{
													width: '103px',
													height: '50px',
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center',
													backgroundColor: '#f0f0f0',
												}}
											>
												<img
													src={`/items${item.img_src}`}
													alt={item.label}
													style={{
														maxWidth: '100%',
														maxHeight: '100%',
														objectFit: 'contain',
														// object padding of 0.5rem
														padding: '0.5rem',
													}}
												/>
											</div>
										)}

										<strong>{item.label}</strong>
									</div>
								))}
							</div>
						</div>
					)}
				/>
			</main>
		</div>
	)
}
