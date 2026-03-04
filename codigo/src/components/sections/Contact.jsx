import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

function Contact({ lang }) {
  const form = useRef();
  const [emailError, setEmailError] = useState('');

  const titleLeft = lang === 'pt' ? 'Contato' : 'Contact';
  const subtitleLeft = lang === 'pt' ? 'Mande uma mensagem.' : 'Drop me a line.';
  const textLeft = lang === 'pt' ? 'Vou gostar de ouvir você.' : 'I would like to hear from you.';
  const titleRight = lang === 'pt' ? 'Fale comigo' : 'Get in Touch';
  const placeholderName = lang === 'pt' ? 'Nome' : 'Name';
  const placeholderEmail = lang === 'pt' ? 'E-mail' : 'Email';
  const placeholderMessage = lang === 'pt' ? 'Mensagem' : 'Message';
  const buttonLabel = lang === 'pt' ? 'Enviar mensagem' : 'Send Message';
  const scrollLabel = lang === 'pt' ? 'Topo' : 'Top';

  const invalidEmailMessage =
    lang === 'pt'
      ? 'Digite um e-mail válido.'
      : 'Please enter a valid email address.';

  const validateEmail = (value) => {
    // Validação simples de formato
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(value);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const formEl = form.current;
    const emailValue = formEl?.email?.value || '';

    if (!validateEmail(emailValue)) {
      setEmailError(invalidEmailMessage);
      return;
    }

    setEmailError('');

    const serviceID = 'service_hj8348s';
    const templateID = 'template_g4mwunn';
    const publicKey = '9EbzCaeAM6iAyqmH4';

    emailjs.sendForm(serviceID, templateID, form.current, publicKey)
      .then((result) => {
          console.log(result.text);
          alert(lang === 'pt' ? 'Mensagem enviada com sucesso!' : 'Message sent successfully!');
          e.target.reset();
      }, (error) => {
          console.log(error.text);
          alert(lang === 'pt' ? 'Ocorreu um erro ao enviar.' : 'An error occurred.');
      });
  };

  return (
    <section id="contact" className="contact relative">
      <div className="contact-left">
        <h2>{titleLeft}</h2>
        <h3>{subtitleLeft}</h3>
        <p>{textLeft}</p>
      </div>

      <div className="contact-right">
        <h2>{titleRight}</h2>

        <form ref={form} className="contact-form" onSubmit={sendEmail}>

          <input type="hidden" name="title" value="Contato do Portfólio" />

          <input
            type="text"
            placeholder={placeholderName}
            name="name"
            required
          />

          <input
            type="email"
            placeholder={placeholderEmail}
            name="email"
            required
            onBlur={(e) => {
              if (e.target.value && !validateEmail(e.target.value)) {
                setEmailError(invalidEmailMessage);
              } else {
                setEmailError('');
              }
            }}
          />

          {emailError && (
            <span
              style={{
                color: '#e11d48',
                fontSize: '0.8rem',
                marginTop: '-8px',
              }}
            >
              {emailError}
            </span>
          )}

          <textarea
            placeholder={placeholderMessage}
            name="message"
            rows="5"
            required
          ></textarea>

          <button type="submit">
            {buttonLabel}
          </button>
        </form>
      </div>

      <div
        className="absolute bottom-8 right-10 z-20 flex items-center gap-2 text-deep-purple font-medium animate-bounce cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <span>↑</span> {scrollLabel}
      </div>
    </section>
  );
}

export default Contact;