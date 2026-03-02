import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';

const Home = ({ lang }) => {
  return (
    <section id="home" className="relative w-full h-screen bg-lavender-main overflow-hidden flex items-center">

      {/* --- 1. Camada de Fundo (Texto GRUNGE Gigante) --- */}
      {/* O select-none impede que o usuário selecione esse texto de fundo */}
      {/* <div className="absolute bottom-10 left-[10%] opacity-20 select-none z-0 pointer-events-none">
        <h1 className="text-[12rem] font-black text-white leading-[0.8]">
          GRUNGE <br /> BACKGROUND
        </h1>
      </div>*/}

      {/* --- 2. Animação da Tinta (Lado Direito) --- */}
      {/* Aqui simulamos a tinta entrando da direita para a esquerda */}
      <div className="absolute top-0 right-0 h-full w-full z-10 pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="h-full w-full absolute right-0"
        >
          <motion.path
            fill="#ffffff"
            // Começa fora da tela (direita) e deformado
            initial={{
              d: "M 100 0 L 100 0 C 100 0 100 0 100 0 L 100 100 L 100 100 C 100 100 100 100 100 100 Z"
            }}
            // Anima para preencher a parte direita com uma onda orgânica
            animate={{
              d: "M 100 0 L 40 0 C 60 30 20 50 50 100 L 100 100 Z"
            }}
            transition={{
              duration: 2,
              ease: [0.22, 1, 0.36, 1] // Curva "puxada" para parecer líquido grosso
            }}
          />
        </svg>
      </div>

      {/* --- 3. Conteúdo Principal (Texto) --- */}
      <div className="relative z-20 container mx-auto px-8 ml-10">
        <div className="space-y-2">

          {/* Texto "NOME" com efeito de contorno (Outline) */}
          <h2 className="text-7xl font-bold tracking-wider text-transparent"
            style={{ WebkitTextStroke: '2px #4A2c4A' }}>
            MARIA
          </h2>

          <h3 className="text-3xl font-bold text-deep-purple">
            {lang === 'pt'
              ? 'Engenheira + Desenvolvedora Front-end Júnior'
              : 'Engineer + Junior Front-end Developer'}
          </h3>

          {/* Ícones de Redes Sociais (Placeholder) */}
          <div className="flex gap-4 pt-6">
            <a href="https://github.com/SEU_USUARIO"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-deep-purple rounded-full flex items-center justify-center hover:bg-purple-800 hover:-translate-y-1 transition-all duration-300 shadow-lg cursor-pointer">
              <FaGithub size={35} color="#E0BBE4" /> {/* Cor lavanda para contrastar */}
            </a>
            <a href="https://linkedin.com/in/SEU_USUARIO"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-deep-purple rounded-full flex items-center justify-center hover:bg-purple-800 hover:-translate-y-1 transition-all duration-300 shadow-lg cursor-pointer">
              <FaLinkedin size={35} color="#E0BBE4" />
            </a>
            <a href="https://instagram.com/SEU_USUARIO"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-deep-purple rounded-full flex items-center justify-center hover:bg-purple-800 hover:-translate-y-1 transition-all duration-300 shadow-lg cursor-pointer">
              <FaInstagram size={35} color="#E0BBE4" />
            </a>
            <a href="mailto:seuemail@exemplo.com"
              className="w-12 h-12 bg-deep-purple rounded-full flex items-center justify-center hover:bg-purple-800 hover:-translate-y-1 transition-all duration-300 shadow-lg cursor-pointer">
              <FaEnvelope size={30} color="#E0BBE4" />
            </a>
          </div>
        </div>
      </div>


      {/* --- 3D Spline (Lado Direito) --- */}
      <div className="hidden md:flex absolute right-0 top-18 h-full w-[45%] z-20 flex items-center pointer-events-none">
        <iframe src='https://my.spline.design/miniroomartcopy-QaFR5Dmkgy0LIKyrxHerdd3c/' 
        frameborder='0' 
        width='100%' 
        height='100%'
        ></iframe>
      </div>

      {/* Indicador de Scroll como botão */}
      <button
        type="button"
        onClick={() => {
          const nextSection = document.getElementById('about')
          if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' })
          }
        }}
        className="absolute bottom-8 left-10 flex items-center gap-2 text-deep-purple font-medium animate-bounce cursor-pointer focus:outline-none"
      >
        <span>↓</span> {lang === 'pt' ? 'Rolar' : 'Scroll'}
      </button>

    </section>
  )
}

export default Home