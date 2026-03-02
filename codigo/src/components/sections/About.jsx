import { useRef, useState, useEffect } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import profile from "../../assets/images/profile.png";

function About({ lang }) {
  const title = lang === 'pt' ? 'Sobre mim' : 'About Me'
  const text = lang === 'pt'
    ? 'Estudante de Engenharia de Software, inquisitiva e com habilidades de liderança, buscando aplicar sólidos conhecimentos de desenvolvimento com foco em colaboração, comunicação e paixão.'
    : 'An inquisitive Software Engineering student, skilled in leadership, seeking to leverage solid development skills with focus on collaboration, communication and passion.'
  const buttonLabel = lang === 'pt' ? 'Visualizar CV' : 'View CV'

  const [showCv, setShowCv] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef(null)
  const defaultLayoutPluginInstance = defaultLayoutPlugin()

  // Usa o mesmo arquivo de currículo para ambos os idiomas
  const fileUrl = `/cv-pt.pdf`

  const handleDocumentLoad = () => {
    setIsLoaded(true)
  }

  // Bloqueia o scroll da página quando o currículo estiver aberto
  useEffect(() => {
    if (typeof document === 'undefined') return

    if (showCv) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'

      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [showCv])

  return (
    <section id="about" className="about">
      <div className="about-image">
        <img src={profile} alt="Profile" />
      </div>

      <div className="about-content">
        <h2>{title}</h2>

        <p>
          {text}
        </p>

        <button
          className="cv-button"
          type="button"
          onClick={() => {
            setShowCv(true)
            setIsLoaded(false)
          }}
        >
          {buttonLabel}
        </button>
      </div>

      {/* Modal do currículo em overlay, sem alterar o tamanho da seção About */}
      {showCv && (
        <div className="cv-modal-overlay">
          <div
            className={`curriculo-container ${isLoaded ? "loaded" : ""}`}
            ref={containerRef}
          >
            <button
              type="button"
              onClick={() => setShowCv(false)}
              className="cv-close-button"
            >
              ✕
            </button>
            <div className="curriculo-body">
              {!isLoaded && <div className="spinner">Carregando PDF...</div>}
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                <Viewer
                  fileUrl={fileUrl}
                  plugins={[defaultLayoutPluginInstance]}
                  onDocumentLoad={handleDocumentLoad}
                />
              </Worker>
            </div>
          </div>
        </div>
      )}
      {/* Indicador de Scroll como botão */}
      <button
        type="button"
        onClick={() => {
          const nextSection = document.getElementById('projects')
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

export default About