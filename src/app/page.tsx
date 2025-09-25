'use client'

import { Button, Form, InputNumber, List, notification } from 'antd'
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
				img_src: '/items/Infantry0.png',
			},
			{
				key: 'infantry_equipment_2',
				label: 'Infantry Equipment 2',
				img_src: '/items/Infantry1.png',
			},
			{
				key: 'infantry_equipment_3',
				label: 'Infantry Equipment 3',
				img_src: '/items/Infantry2.png',
			},
			{
				key: 'infantry_equipment_4',
				label: 'Infantry Equipment 4',
				img_src: '/items/Infantry3.png',
			},
		],
	},
	{
		category: 'Artillery',
		items: [
			{
				key: 'artillery_equipment_1',
				label: 'Artillery Equipment 1',
				img_src: '/items/Art_1_comintern.png',
			},
			{
				key: 'artillery_equipment_2',
				label: 'Artillery Equipment 2',
				img_src: '/items/Art_2_comintern.png',
			},
			{
				key: 'artillery_equipment_3',
				label: 'Artillery Equipment 3',
				img_src: '/items/Art_3_comintern.png',
			},
		],
	},
	{
		category: 'Tank Destroyers / AT',
		items: [
			{
				key: 'tank_destroyer_equipment_1',
				label: 'Tank Destroyer Equipment 1',
				img_src: '/items/AT_1_allies.png',
			},
			{
				key: 'tank_destroyer_equipment_2',
				label: 'Tank Destroyer Equipment 2',
				img_src: '/items/AT_2_allies.png',
			},
			{
				key: 'tank_destroyer_equipment_3',
				label: 'Tank Destroyer Equipment 3',
				img_src: '/items/AT_3_allies.png',
			},
		],
	},
	{
		category: 'Anti-Air',
		items: [
			{
				key: 'aa_gun_equipment_1',
				label: 'AA Gun Equipment 1',
				img_src: '/items/AA_1_allies.png',
			},
			{
				key: 'aa_gun_equipment_2',
				label: 'AA Gun Equipment 2',
				img_src: '/items/AA_2_allies.png',
			},
			{
				key: 'aa_gun_equipment_3',
				label: 'AA Gun Equipment 3',
				img_src: '/items/AA_3_allies.png',
			},
		],
	},
	{
		category: 'Trucks / Motorized',
		items: [
			{
				key: 'motorized_equipment_1',
				label: 'Motorized Equipment 1 (Generic Trucks)',
				img_src: '',
			},
			{
				key: 'motorized_equipment_2',
				label: 'Motorized Equipment 2 (Later-Tier Motorized)',
				img_src: '',
			},
		],
	},
]

const aeCommand = 'add_equipment'

const openNotification = (message: string) => {
	notification.success({
		message: 'Command Copied',
		description: message,
		placement: 'topRight',
	})
}

export default function Home() {
	const [count, setCount] = useState(1_000_000)

	return (
		<div className='page'>
			<main className='main'>
				<h1 className='title'>Hearts of Iron IV - Commands</h1>

				<Form>
					<Form.Item label='Count'>
						<InputNumber
							value={count}
							onChange={(value) => setCount(value || 0)}
						/>
					</Form.Item>
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
											openNotification(`Copied: ${command}`)
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
													src={item.img_src}
													alt={item.label}
													style={{
														maxWidth: '100%',
														maxHeight: '100%',
														objectFit: 'contain',
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
