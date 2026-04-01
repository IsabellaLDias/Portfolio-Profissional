import { useRef, useState, useEffect } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

function About({ lang }) {
  const title = lang === 'pt' ? 'Sobre Mim' : 'About Me'
  const text = lang === 'pt'
    ? 'Estudante de Engenharia de Software na PUC Minas, atuo na intersecção entre Gestão de Produto e Desenvolvimento Frontend. Tenho experiência prática na liderança de backlogs, escrita de user stories e criação de interfaces acessíveis. Meu objetivo é unir visão estratégica e excelência técnica para construir soluções digitais que priorizam a experiência do usuário e a agilidade.'
    : 'Software Engineering student at PUC Minas, working at the intersection of Product Ownership and Frontend Development. I have hands-on experience managing backlogs, writing user stories, and building accessible interfaces. My goal is to combine strategic mindset with technical excellence to deliver digital solutions focused on user experience and agile methodologies.'

  const buttonLabel = lang === 'pt' ? 'Visualizar CV' : 'View CV'

  const [showCv, setShowCv] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef(null)
  const defaultLayoutPluginInstance = defaultLayoutPlugin()

  // Usa o currículo de acordo com o idioma selecionado
  const fileUrl = lang === 'pt'
    ? `./CV - Isabella Dias (PT) - V2.pdf`
    : `./CV - Isabella Dias (EN) - V2.pdf`

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
        className="absolute bottom-8 left-10 flex items-center gap-2 text-[#E0BBE4] font-medium animate-bounce cursor-pointer focus:outline-none"
      >
        <span>↓</span> {lang === 'pt' ? 'Rolar' : 'Scroll'}
      </button>
    </section>
  )
}

export default About