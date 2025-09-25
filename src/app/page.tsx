'use client'

import { Button, Form, InputNumber, List } from 'antd'
import { useEffect, useState } from 'react'

import './page.scss'

const items = [{}]

const equipmentData = [
	{
		category: 'Infantry Equipment',
		items: [
			{
				key: 'infantry_equipment_0',
				label: 'Infantry Equipment 1',
				img_src: '/Infantry0.png',
			},
			{
				key: 'infantry_equipment_1',
				label: 'Infantry Equipment 2',
				img_src: '/Infantry1.png',
			},
			{
				key: 'infantry_equipment_2',
				label: 'Infantry Equipment 3',
				img_src: '/Infantry2.png',
			},
			{
				key: 'infantry_equipment_3',
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
				key: 'anti_tank_equipment_0',
				label: 'Tank Destroyer Equipment 1',
				img_src: '/AT_1_allies.png',
			},
			{
				key: 'anti_tank_equipment_1',
				label: 'Tank Destroyer Equipment 2',
				img_src: '/AT_2_allies.png',
			},
			{
				key: 'anti_tank_equipment_2',
				label: 'Tank Destroyer Equipment 3',
				img_src: '/AT_3_allies.png',
			},
		],
	},
	{
		category: 'Anti-Air',
		items: [
			{
				key: 'anti_air_equipment_0',
				label: 'AA Gun Equipment 1',
				img_src: '/AA_1_allies.png',
			},
			{
				key: 'anti_air_equipment_1',
				label: 'AA Gun Equipment 2',
				img_src: '/AA_2_allies.png',
			},
			{
				key: 'anti_air_equipment_2',
				label: 'AA Gun Equipment 3',
				img_src: '/AA_3_allies.png',
			},
		],
	},
	{
		category: 'Trucks / Motorized',
		items: [
			{
				key: 'motorized_equipment_0',
				label: 'Motorized Equipment 1 (Generic Trucks)',
				img_src: '/Motorized_equipment_0.png',
			},
			{
				key: 'motorized_equipment_1',
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
	{
		category: 'Support Equipment',
		items: [
			{
				key: 'support_equipment_1',
				label: 'Support Equipment',
				img_src: '/Support_Equipment.png',
			},
		],
	},
	{
		category: 'Trains',
		items: [
			{
				key: 'train_equipment_1',
				label: 'Train Equipment 1',
				img_src: '/Train_equipment_1.png',
			},
			{
				key: 'train_equipment_2',
				label: 'Train Equipment 2',
				img_src: '/Train_equipment_2.png',
			},
			{
				key: 'train_equipment_3',
				label: 'Train Equipment 3',
				img_src: '/Train_equipment_3.png',
			},
		],
	},
	{
		category: 'Amphibious Mechs',
		items: [
			{
				key: 'amphibious_mech_1',
				label: 'Amphibious Mech 1',
				img_src: '/Generic_amphibious_mech_1.png',
			},
			{
				key: 'amphibious_mech_2',
				label: 'Amphibious Mech 2',
				img_src: '/Generic_amphibious_mech_2.png',
			},
		],
	},
	{
		category: 'Motorized Rocket Units',
		items: [
			{
				key: 'motorized_rocket_unit',
				label: 'Motorized Rocket Unit',
				img_src: '/Motorized_rocket_unit.png',
			},
		],
	},
]

const aeCommand = 'add_equipment'

const openNativeNotification = (message: string, imgSrc: string | null) => {
	const notification = document.createElement('div')
	notification.className = 'native-notification'

	const content = document.createElement('div')
	content.className = 'native-notification-content'

	if (imgSrc) {
		const img = document.createElement('img')
		img.src = `/items${imgSrc}`
		img.alt = 'Item Image'
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
	const [history, setHistory] = useState<string[]>([])

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const savedHistory = localStorage.getItem('commandHistory')
			setHistory(savedHistory ? JSON.parse(savedHistory) : [])
		}
	}, [])

	useEffect(() => {
		if (typeof window !== 'undefined') {
			localStorage.setItem('commandHistory', JSON.stringify(history))
		}
	}, [history])

	const addToHistory = (command: string) => {
		setHistory((prev) => [command, ...prev.slice(0, 9)]) // Keep only the last 10 commands
	}

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
							formatter={(value) =>
								`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
							}
							parser={(value) => parseInt(value?.replace(/\./g, '') || '0', 10)}
						/>
					</Form.Item>

					{[1000, 10000, 100000, 1000000].map((val) => (
						<Button
							key={val}
							onClick={() => setCount(val)}
							style={{
								fontWeight: 'bold',
							}}
						>
							{val.toLocaleString('de-DE')}
						</Button>
					))}
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
											const command = `${aeCommand} ${count} ${item.key}`
											navigator.clipboard.writeText(command)
											openNativeNotification(command, item.img_src)
											addToHistory(command)
										}}
										className='item-container'
									>
										{item.img_src && (
											<div className='item-image-container'>
												<img
													src={`/items${item.img_src}`}
													alt={item.label}
													className='item-image'
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

				<section className='history-section'>
					<section>History</section>

					<List
						dataSource={history}
						renderItem={(command) => <List.Item>{command}</List.Item>}
					/>
				</section>
			</main>
		</div>
	)
}
