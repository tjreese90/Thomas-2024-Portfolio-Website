import AnimatedLetters from '@components/AnimatedLetters/AnimatedLetters';
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './contact.scss';
import emailjs from '@emailjs/browser';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GOOGLE_GEN_AI_KEY || '';
const generativeAI = new GoogleGenerativeAI(apiKey);
const modelName =
	import.meta.env.VITE_GEN_AI_MODEL_NAME || 'gemini-1.5-pro-latest';
const model = generativeAI.getGenerativeModel({ model: modelName });

const MAX_CHAT_HISTORY = 100; // Maximum number of chat messages to keep

const Contact = () => {
	const [letterClass, setLetterClass] = useState('text-animate');
	const nameArray = [...'Contact me'];
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [chatMessages, setChatMessages] = useState<string[]>([]);
	const [newMessage, setNewMessage] = useState('');
	const form = useRef<HTMLFormElement>(null);
	const inputRef1 = useRef<HTMLInputElement>(null);
	const inputRef2 = useRef<HTMLInputElement>(null);
	const inputRef3 = useRef<HTMLTextAreaElement>(null);
	const chatEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const timer = setTimeout(() => {
			setLetterClass('text-animate-hover');
		}, 4000);
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		// Load chat messages from local storage
		const savedChatMessages = localStorage.getItem('chatMessages');
		if (savedChatMessages) {
			setChatMessages(JSON.parse(savedChatMessages));
		}
	}, []);

	useEffect(() => {
		// Save chat messages to local storage and auto-scroll to the bottom
		localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
		chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [chatMessages]);

	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode);
		document.body.classList.toggle('dark-mode', !isDarkMode);
	};

	const sendEmail = (e: any) => {
		e.preventDefault();

		if (form.current !== null) {
			emailjs
				.sendForm(
					'service_mvino5p',
					'template_2d4e4it',
					form.current,
					'qUG6AOg1cYetUQ6QI',
				)
				.then(
					() => {
						window.alert('Mail Sent Successfully!!!');
						playSuccessAnimation();
					},
					(e) => {
						window.alert(`Mail Not Sent!!! ${e}`);
					},
				);
		}

		if (inputRef1.current !== null) inputRef1.current.value = '';
		if (inputRef2.current !== null) inputRef2.current.value = '';
		if (inputRef3.current !== null) inputRef3.current.value = '';
	};

	const playSuccessAnimation = () => {
		const successDiv = document.createElement('div');
		successDiv.className = 'success-animation';
		document.body.appendChild(successDiv);
		setTimeout(() => {
			successDiv.remove();
		}, 2000);
	};

	const validateEmail = (email: string) => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(String(email).toLowerCase());
	};

	const summarizeChatHistory = (chatMessages: string[]): string => {
		return chatMessages
			.slice(-MAX_CHAT_HISTORY)
			.map((msg) => {
				if (msg.startsWith('User: ')) {
					return `User said: ${msg.replace('User: ', '')}`;
				} else if (msg.startsWith('AI: ')) {
					return `AI replied: ${msg.replace('AI: ', '')}`;
				}
				return msg;
			})
			.join(' ');
	};

	const handleChatSend = async (e: React.FormEvent) => {
		e.preventDefault();
		if (newMessage.trim()) {
			const userMessage = `User: ${newMessage}`;
			const previousMessages = summarizeChatHistory(chatMessages);
			setChatMessages((prevMessages) => [...prevMessages, userMessage]);
			saveChat(userMessage); // Save the user message
			setNewMessage('');

			const requestBody = {
				safetySettings: [],
				contents: [
					{
						role: 'user',
						parts: [
							{
								text: `
                      You are Thomas Reese, a friendly software developer who loves engaging conversations. Make sure to respond in a personalized and natural manner. Keep responses relevant and avoid any placeholders or errors. For example, if asked about your name, you could say "I'm Thomas Reese, here to help you with any questions or information you need." Keep the tone conversational and warm, and ensure the responses align with the context of the conversation.
                      Latest user message: ${newMessage}
                      Previous conversation: ${previousMessages}
                    `,
							},
						],
					},
				],
			};

			try {
				const aiResponse = await model.generateContent(requestBody);
				const candidates = aiResponse?.response?.candidates;

				if (candidates && candidates.length > 0) {
					const aiMessageContent = candidates[0]?.content?.parts;

					if (aiMessageContent && aiMessageContent.length > 0) {
						const aiMessage = `AI: ${aiMessageContent[0]?.text
							?.trim()
							.replace(/[\r\n]+/g, ' ')}`;
						setChatMessages((prevMessages) => [...prevMessages, aiMessage]);
						saveChat(userMessage, aiMessage); // Save the AI response
					} else {
						const errorMessage =
							'AI: It seems like there was an issue with generating a response. Let’s try again! 😅';
						setChatMessages((prevMessages) => [...prevMessages, errorMessage]);
						saveChat(userMessage, errorMessage); // Save the error response
					}
				} else {
					const fallbackMessage =
						'AI: Sorry, I couldn’t get a response at this time. How can I assist you further?';
					setChatMessages((prevMessages) => [...prevMessages, fallbackMessage]);
					saveChat(userMessage, fallbackMessage); // Save the fallback response
				}
			} catch (error) {
				console.error('Error fetching AI response:', error);
				const errorMessage =
					'AI: Oops, something went wrong. I’m here to help if you need anything else!';
				setChatMessages((prevMessages) => [...prevMessages, errorMessage]);
				saveChat(userMessage, errorMessage); // Save the error response
			}
		}
	};

	const saveChat = (userMessage: string, aiMessage?: string) => {
		const newChatMessage = { userMessage, aiMessage };
		const updatedChatMessages = [
			...chatMessages.slice(-MAX_CHAT_HISTORY),
			newChatMessage,
		];
		localStorage.setItem('chatMessages', JSON.stringify(updatedChatMessages));
	};

	const clearChat = () => {
		localStorage.removeItem('chatMessages');
		setChatMessages([]);
	};

	return (
		<div className={`contact ${isDarkMode ? 'dark' : ''}`}>
			<div className='contact__left'>
				<span className='tag' style={{ padding: '0rem' }}>
					&lt;body&gt;
				</span>
				<h1 className='about__headingPrimary'>
					<AnimatedLetters
						letterClass={letterClass}
						strArray={nameArray}
						idx={15}
					/>
				</h1>
				<p className='contact__description'>
					I'm open to freelance opportunities, especially ambitious or
					large-scale projects. For anything else — questions, intros, or
					just a hello — drop a note via the form below.
				</p>
				<div className='form'>
					<form ref={form} onSubmit={sendEmail}>
						<div className='form__group'>
							<input
								name='user_name'
								ref={inputRef1}
								type='text'
								className='form__input'
								id='name'
								placeholder='Full Name'
								required
							/>
							<label htmlFor='name' className='form__label'>
								Full Name
							</label>
						</div>
						<div className='form__group'>
							<input
								type='email'
								ref={inputRef2}
								name='user_email'
								className='form__input'
								id='email'
								placeholder='Enter Your Email Address'
								required
								onBlur={(e) => {
									if (!validateEmail(e.target.value)) {
										e.target.setCustomValidity('Invalid email address');
									} else {
										e.target.setCustomValidity('');
									}
								}}
							/>
							<label htmlFor='email' className='form__label'>
								Email Address
							</label>
						</div>
						<div className='form__group'>
							<textarea
								name='message'
								ref={inputRef3}
								className='form__input'
								id='message'
								placeholder='Message'
								required
							/>
							<label htmlFor='message' className='form__label'>
								Message
							</label>
						</div>
						<button type='submit' value='Send' className='intro__button'>
							Send Mail
						</button>
					</form>
				</div>
				<div className='chat-widget'>
					<h3>Gemini AI Chat</h3>
					<p className='chat-description'>
						Chat with the AI assistant to ask about Thomas's background,
						projects, or experience — it answers in his voice.
					</p>
					<div className='chat-messages'>
						{chatMessages.map((msg, idx) => (
							<p
								key={idx}
								className={`chat-message ${
									msg.startsWith('AI:') ? 'ai-message' : 'user-message'
								}`}
							>
								{msg.split('\n').map((line, i) => (
									<span key={i}>
										{line}
										<br />
									</span>
								))}
							</p>
						))}
						<div ref={chatEndRef} />
					</div>
					<form onSubmit={handleChatSend} className='chat-form'>
						<input
							type='text'
							value={newMessage}
							onChange={(e) => setNewMessage(e.target.value)}
							placeholder='Type your message...'
							className='chat-input'
							autoFocus
						/>
						<button type='submit' className='chat-send'>
							Send
						</button>
					</form>
					<button onClick={clearChat} className='clear-chat'>
						Clear Chat
					</button>
					{!apiKey && (
						<p className='error-message'>
							Error: API Key not provided. Please set the API key in your
							environment variables.
						</p>
					)}
				</div>
				<div className='buttons'>
					<Link to='/' className='back__home'>
						Back to Home
					</Link>
				</div>
			</div>
			<div className='contact__right'>
				<div className='contact__locationCard'>
					<div className='contact__locationPin' aria-hidden='true'>
						<svg
							viewBox='0 0 24 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M12 22s7-7.58 7-13a7 7 0 1 0-14 0c0 5.42 7 13 7 13z'
								stroke='#ffd700'
								strokeWidth='1.5'
								fill='rgba(255, 215, 0, 0.08)'
							/>
							<circle
								cx='12'
								cy='9.5'
								r='2.5'
								fill='#ffd700'
							/>
						</svg>
					</div>
					<h3 className='contact__locationHeading'>Oakland, California</h3>
					<p className='contact__locationSubtitle'>
						Pacific Time (UTC−8 / −7)
					</p>
					<a
						href='mailto:ThomasReeseCareers@gmail.com'
						className='contact__locationEmail'
					>
						ThomasReeseCareers@gmail.com
					</a>
					<div className='contact__locationLinks'>
						<a
							href='https://github.com/tjreese90'
							target='_blank'
							rel='noreferrer'
						>
							GitHub
						</a>
						<a
							href='https://www.linkedin.com/in/thomas-reese-541758142/'
							target='_blank'
							rel='noreferrer'
						>
							LinkedIn
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contact;
