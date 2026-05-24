import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './contact.scss';
import emailjs from '@emailjs/browser';
import { answerAboutThomas } from '@lib/aboutThomas';

type ChatMessage = { role: 'user' | 'assistant'; content: string }

const SUGGESTED_PROMPTS = [
	"What is TraderDan?",
	"Tell me about Codebase Intelligence at Envoy.",
	"What's Thomas's strongest stack?",
	"How can I reach him?",
]

const Contact = () => {
	const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
	const [newMessage, setNewMessage] = useState('');
	const [isStreaming, setIsStreaming] = useState(false);
	const [chatError, setChatError] = useState<string | null>(null);
	const [formStatus, setFormStatus] = useState<{
		kind: 'idle' | 'success' | 'error'
		message: string
	}>({ kind: 'idle', message: '' });
	const form = useRef<HTMLFormElement>(null);
	const inputRef1 = useRef<HTMLInputElement>(null);
	const inputRef2 = useRef<HTMLInputElement>(null);
	const inputRef3 = useRef<HTMLTextAreaElement>(null);
	const chatEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const saved = localStorage.getItem('askThomasMessages');
		if (!saved) return;
		try {
			const parsed = JSON.parse(saved);
			if (
				Array.isArray(parsed) &&
				parsed.every(
					(m) =>
						m &&
						typeof m === 'object' &&
						(m.role === 'user' || m.role === 'assistant') &&
						typeof m.content === 'string',
				)
			) {
				setChatMessages(parsed);
			} else {
				localStorage.removeItem('askThomasMessages');
			}
		} catch {
			localStorage.removeItem('askThomasMessages');
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('askThomasMessages', JSON.stringify(chatMessages));
		chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [chatMessages]);

	const sendEmail = (e: any) => {
		e.preventDefault();
		setFormStatus({ kind: 'idle', message: 'Sending…' });

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
						setFormStatus({
							kind: 'success',
							message: 'Message sent — thanks! I\'ll get back to you soon.',
						});
						if (inputRef1.current !== null) inputRef1.current.value = '';
						if (inputRef2.current !== null) inputRef2.current.value = '';
						if (inputRef3.current !== null) inputRef3.current.value = '';
					},
					() => {
						setFormStatus({
							kind: 'error',
							message:
								'Couldn\'t send the message. Email ThomasReeseCareers@gmail.com directly?',
						});
					},
				);
		}
	};

	const sendChatMessage = async (text: string) => {
		const trimmed = text.trim()
		if (!trimmed || isStreaming) return

		setChatError(null)
		const nextHistory: ChatMessage[] = [
			...chatMessages,
			{ role: 'user', content: trimmed },
		]
		setChatMessages([...nextHistory, { role: 'assistant', content: '' }])
		setNewMessage('')
		setIsStreaming(true)

		const fallbackToLocal = (reason?: string) => {
			const local = answerAboutThomas(trimmed)
			setChatMessages((prev) => {
				const copy = [...prev]
				copy[copy.length - 1] = { role: 'assistant', content: local }
				return copy
			})
			if (reason && process.env.NODE_ENV !== 'production') {
				// eslint-disable-next-line no-console
				console.warn('[chat] fell back to local:', reason)
			}
		}

		try {
			const res = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ messages: nextHistory }),
			})

			if (!res.ok || !res.body) {
				fallbackToLocal(`status=${res.status} body=${!!res.body}`)
				return
			}

			const reader = res.body.getReader()
			const decoder = new TextDecoder()
			let assistantContent = ''

			while (true) {
				const { value, done } = await reader.read()
				if (done) break
				assistantContent += decoder.decode(value, { stream: true })
				setChatMessages((prev) => {
					const copy = [...prev]
					copy[copy.length - 1] = {
						role: 'assistant',
						content: assistantContent,
					}
					return copy
				})
			}

			// Empty stream — server returned 200 with no tokens (Gateway misconfigured)
			if (!assistantContent.trim()) {
				fallbackToLocal('empty stream')
			}
		} catch (err) {
			const reason = err instanceof Error ? err.message : 'unknown'
			fallbackToLocal(reason)
		} finally {
			setIsStreaming(false)
		}
	}

	const handleChatSend = async (e: React.FormEvent) => {
		e.preventDefault()
		await sendChatMessage(newMessage)
	}

	const handleSuggestedClick = (prompt: string) => {
		sendChatMessage(prompt)
	}

	const clearChat = () => {
		localStorage.removeItem('askThomasMessages')
		setChatMessages([])
		setChatError(null)
	};

	return (
		<div className='contact'>
			<div className='contact__left'>
				<span className='tag' style={{ padding: '0rem' }}>
					&lt;body&gt;
				</span>
				<h1 className='about__headingPrimary'>Contact</h1>
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
					{formStatus.message && (
						<p
							className={`form__status form__status--${formStatus.kind}`}
							role={formStatus.kind === 'error' ? 'alert' : 'status'}
							aria-live='polite'
						>
							{formStatus.message}
						</p>
					)}
				</div>
				<div className='chat-widget'>
					<div className='chat-widget__header'>
						<h3 className='chat-widget__title'>Ask About Thomas</h3>
						<span className='chat-widget__badge'>AI</span>
					</div>
					<p className='chat-description'>
						Ask anything — projects, stack, work history, why he built X. The
						assistant answers from Thomas's resume and portfolio context.
					</p>

					{chatMessages.length === 0 && !isStreaming && (
						<div className='chat-suggestions'>
							{SUGGESTED_PROMPTS.map((p) => (
								<button
									key={p}
									type='button'
									className='chat-suggestion'
									onClick={() => handleSuggestedClick(p)}
								>
									{p}
								</button>
							))}
						</div>
					)}

					{chatMessages.length > 0 && (
						<div
							className='chat-messages'
							aria-live='polite'
							aria-busy={isStreaming}
						>
							{chatMessages.map((msg, idx) => (
								<div
									key={idx}
									className={`chat-message chat-message--${msg.role}`}
								>
									<span className='sr-only'>
										{msg.role === 'user' ? 'You said: ' : 'Assistant: '}
									</span>
									{msg.content ||
										(msg.role === 'assistant' && isStreaming
											? 'Thinking…'
											: '')}
								</div>
							))}
							<div ref={chatEndRef} />
						</div>
					)}

					{chatError && (
						<p className='chat-error' role='alert'>
							{chatError}
						</p>
					)}

					<form onSubmit={handleChatSend} className='chat-form'>
						<input
							type='text'
							value={newMessage}
							onChange={(e) => setNewMessage(e.target.value)}
							placeholder={
								isStreaming ? 'Thinking…' : 'Ask a question…'
							}
							className='chat-input'
							disabled={isStreaming}
							aria-label='Ask About Thomas — type your question'
						/>
						<button
							type='submit'
							className='chat-send'
							disabled={isStreaming || !newMessage.trim()}
							aria-label='Send message'
						>
							{isStreaming ? '…' : 'Send'}
						</button>
					</form>

					{chatMessages.length > 0 && (
						<button onClick={clearChat} className='clear-chat'>
							Clear conversation
						</button>
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
