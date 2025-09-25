'use client'

import { Button, Form, InputNumber, List } from 'antd'
import { useEffect, useState } from 'react'
import { equipmentData } from './equipmentData'

import './page.scss'

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
