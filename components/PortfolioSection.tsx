"use client";

import React, { useState, useRef, useEffect, RefObject } from "react"
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronDown, ChevronUp, Play } from "lucide-react";
import { useModal } from "@/components/ModalProvider";

// Define project type
interface Project {
  id: number;
  name: string;
  description: string;
  year: string;
  images: string[];
  link?: string;
  additionalInfo?: string;
  videoUrl?: string;
  videoType?: "youtube" | "vimeo" | "mp4";
}

// Define section type
interface PortfolioSectionData {
  id: string;
  title: string;
  description: string;
  projects: Project[];
}

const portfolioData: PortfolioSectionData[] = [
  {
    id: "graphic-design",
    title: "Graphic Design",
    description:
      "In this section, you'll find a curated collection of my graphic design work—ranging from brand identities and posters to social media visuals and other creative pieces. Among all my creative pursuits, graphic design stands out as my strongest passion.",
    projects: [
      {
        id: 1,
        name: "Calle Libre",
        description: "Visuals & Festival Pass",
        year: "2025",
        images: [
          "/callelibre-3.webp",
          "/callelibre-2.webp",
          "/callelibre-4.webp",
          "/callelibre-1.webp",
          "/callelibre-5.webp",
          "/callelibre-6.webp",          
        ],
        additionalInfo:
          "For Calle Libre, the urban arts festival in Vienna, I designed the official festival pass flyer featuring the festival map and program, as well as social media visuals such as posters and simple animations.",
      },
      {
        id: 2,
        name: "Muralia",
        description: "Logo Animation",
        year: "2025",
        images: [
          "/muralia.gif",
        ],
        additionalInfo:
          "For Muralia, a street art agency, I created a logo animation highlighting the letter “a” as a changing, dynamic element. The animation features variations of the letter handwritten by the agency’s friends and collaborating artists.",
      },
       {
        id: 3,
        name: "Valmiera Theater performance",
        description: "Visual design package for a performance",
        year: "2025",
        images: [
          "/plakati-mockup.webp",
          "/stage.webp",
        ],
        additionalInfo:
          "For this performance reading at Valmiera Theater, I am developing a complete visual package that is still in progress. This includes poster and flyer designs, stage design, and video visuals. The project brings together graphic design, moving image, and spatial elements to shape the overall atmosphere of the performance.",
      },
      {
        id: 4,
        name: "Creative posters",
        description: "Personal Project",
        year: "2025",
        images: [
          "/posters-1.webp",
          "/posters-2.webp",
          "/posters-3.webp",
          "/posters-4.webp",
          "/posters-5.webp",
        ],
        additionalInfo:
          "A series of experimental poster designs exploring different visual styles, concepts, and graphic techniques.",
      },
      {
        id: 5,
        name: "Valmiera Drama Theater",
        description: "Theater Visual Identity Redesign",
        year: "2022",
        images: [
          "/teatris1.webp",
          "/teatris2.webp",
          "/teatris3.webp",
        ],
        additionalInfo:
          "For my graduation project at the Riga School of Design and Art, I created a conceptual visual identity for a theater in Valmiera, Latvia. Based on research, the project resulted in a brand book with detailed graphic design guidelines, including logo variations, layouts, and other visual applications.",
      },
      {
        id: 6,
        name: "SIMO Pizzeria",
        description: "Graphic Design and Visuals",
        year: "2022",
        images: ["/simo1.webp", "/simo2.webp", "/simo3.webp"],
        additionalInfo:
          "I created a cohesive visual identity for SIMO Pizzeria, drawing inspiration from the vibrant colors of Moroccan tiles. This included menu design, layout development, and social media content, ensuring a consistent and engaging brand presence across various platforms.",
      },
      {
        id: 7,
        name: "Rīga Stradiņš University Stomatology SZP",
        description: "Visual Identity and Graphic Design",
        year: "2023",
        images: ["/rsu2.webp", "/rsu1.webp", "/rsu3.webp"],
        additionalInfo:
          "I developed a visual identity for the social media platforms of Rīga Stradiņš University Stomatology SZP, creating abstract illustrations resembling teeth, echoing the aesthetic qualities of X-ray imagery.",
      },
      {
        id: 8,
        name: "Swisscom, Baltic Brand Forum, CSDD, Ergo",
        description: "Social Media Design for Brands",
        year: "2023",
        images: ["/element2.webp", "/element1.webp", "/element3.webp"],
        additionalInfo:
          "While working in Element Digital, I created social media visuals for brands like Swisscom, Baltic Brand Forum, the Latvian Road Traffic Safety Directorate (CSDD), and Ergo Group. The designs were adapted to align with each brand’s existing guidelines, ensuring consistency with their established visual identity.",
      },
      {
        id: 9,
        name: "Tallinas Street Creative Quarter",
        description: "Social Media and Graphic Design",
        year: "2024–2025",
        images: ["/Mockup2.webp", "/kvartals2.webp", "/istaysafe-cup-covers.webp"],
        additionalInfo:
          "During my time at Tallinas Street Creative Quarter, I created a wide range of graphic design works, including numerous event posters and visuals for both social media and print, as well as contributions to their website.",
      },
      {
        id: 10,
        name: "Book Layout Design and Illustrations",
        description: "Personal Project",
        year: "2022",
        images: ["/book-layout.webp"],
        additionalInfo:
          "For this school project, I worked on two book designs. One featured minimalistic illustrations symbolizing crossroads with oneself. The other focused purely on minimalistic layout design. Both projects aimed to create a visually harmonious experience with a strong emphasis on personal reflection and design clarity.",
      },
      {
        id: 11,
        name: "Reflecting on Myself as a Technical Issue",
        description: "Personal Project",
        year: "2022",
        images: ["/me2.webp", "/me1.webp"],
        additionalInfo:
          "This deeply personal project explores my identity through the lens of a technical issue. I view my mind as something that correlates with the external world, where formal digital communication often becomes a facade, shaped by what appears most aesthetic. My thoughts grow deeper, and I try to present a controlled version of myself, suppressing emotions and maintaining composure. However, as experience shows, it’s not always successful. I am constantly navigating this balance — just trying to find the right button to press.",
      },
    ],
  },
  {
    id: "3d-design",
    title: "3D Design & Animation",
    description:
      "This section presents my 3D design and animation projects. As I continue developing my skills in this field, I'm excited to dive into new techniques and bring bold, inventive ideas to life.",
    projects: [
      {
        id: 14,
        name: "Study of Abstract and Geometric Forms in Blender",
        description: "Personal Project",
        year: "2024",
        images: [
          "/3d-abstract.webp",
        ],
        additionalInfo:
          "This project explores the relationship between abstract geometric forms and light in a 3D space. Using Blender, I created a series of compositions that play with perception, shadow, and reflection.",
        videoUrl: "https://www.youtube.com/embed/V4nLXzO-t6M?si=JQ7Zm-z1aSPb3RSs",
        videoType: "youtube",
      },
      {
        id: 15,
        name: "Dancing Human Figure Animation",
        description: "Personal Project",
        year: "2023",
        images: ["/human-dancing.webp"],
        link: "https://youtu.be/fKa2_LguhMQ",
        additionalInfo:
          "This animation project is focused on capturing the movements of dance through 3D character animation.",
        videoUrl: "https://www.youtube.com/embed/fKa2_LguhMQ?si=sQgjNaFXEs6PH5Yv",
        videoType: "youtube",
      },
      {
        id: 18,
        name: "3D Modeled and 3D Printed Earrings",
        description: "Personal Project",
        year: "2023",
        images: ["/3d-earrings1.webp"],
        additionalInfo:
          "This project bridges digital design and physical craftsmanship through 3D printing technology. The earrings were modeled digitally and inspired by abstract forms found in nature, translating organic patterns into wearable objects.",
      },
    ],
  },
  {
    id: "vr",
    title: "VR & AR",
    description:
      "Here, you’ll find my explorations in Virtual Reality projects built in Unity that combine immersive interactivity with creative storytelling. Each work reflects both technical precision and artistic experimentation. As I continue developing in this field, I aim to push the boundaries of what immersive interaction can be.",
    projects: [
      {
        id: 19,
        name: "Cerebrum",
        description: "Unity VR",
        year: "2025",
        images: ["/cerebrum.webp"],
        additionalInfo:
          "This virtual environment, created in Unity, serves as a metaphor for the inner world of the mind - structured like an operating system, yet equally chaotic. At the core of the work lies the cliché of “finding oneself”: upon entering this VR space, no one will discover themselves—only me, and my own sarcastic reflections on life. Within the environment, viewers can collect folders whose titles embody fragments of my thoughts such as “Eternal Youth,” “Dream Scenario,” “Fake Prayers” etc. These folders act as poetic threads leading deeper into the layers of my mind, hidden beneath the façade of an inner operating system.",
        videoUrl: "https://www.youtube.com/embed/mkPmAp1WBvM?si=BjJvzkovLfCmbQea",
        videoType: "youtube",
      },
      {
        id: 20,
        name: "The Lonely Princess World",
        description: "Unity VR",
        year: "2024",
        images: ["/princess-world.webp"],
        additionalInfo:
          "This VR experience tells the story of a lonely princess through an interactive fairy tale environment. Users can explore a surreal castle and its surroundings, discovering narrative elements through interaction with objects and environments. The project was built in Unity with custom 3D assets and atmospheric sound design.",
        videoUrl: "https://www.youtube.com/embed/ziaHUAMBmwE?si=bpBgWeVZvJAH-GdO",
        videoType: "youtube",
      },
      {
        id: 21,
        name: "The link between",
        description: "AR",
        year: "2024",
        images: ["/the-link-between.webp"],
        additionalInfo:
          "This AR artwork revives the mythical essence of Burtnieku Ezers, a lake steeped in Latvian folklore, where legends speak of a sunken castle and ancient secrets beneath its waters. Inspired by Zalktis, the sacred grass snake symbolizing strenght, transformation, and the link between the physical and spiritual worlds, the piece is accessible only at the lake itself. By embedding this digital layer into the landscape, the work invites viewers to reconnect with ancestral myths and the unseen forces of nature, blending the real with the mystical.",
        videoUrl: "https://www.youtube.com/embed/JLQCsbgGHqs?si=8J2B1nESxQss0AAn",
        videoType: "youtube",
      },
    ],
  },
  {
    id: "videography",
    title: "Videography & Sound",
    description:
      "In this section, you'll find a collection of my creative video and audio projects, focused on artistic exploration and expression. My approach is driven by experimentation, where visuals, sound, and emotion intersect to create immersive, thought-provoking experiences. I concentrate on rhythm, atmosphere, and abstract storytelling, moving beyond traditional narratives to craft pieces that invite deeper reflection. Each project is developed with careful attention to detail, blending visual and auditory elements to challenge conventions and evoke a strong sensory response.",
    projects: [
      {
        id: 23,
        name: "Liminality",
        description: "Personal Project",
        year: "2025",
        images: ["/liminality.webp"],
        link: "https://www.youtube.com/watch?v=1n2aFpAKpZw",
        additionalInfo:
          "This video work explores the concept of liminality—the state of being in-between. Created through screen recording techniques, with an original soundscape produced by me, the piece reflects on the digital condition of constant transition. The work examines what it feels like to exist neither fully here nor there, but somewhere in between.",
        videoUrl: "https://www.youtube.com/embed/1n2aFpAKpZw?si=5cueZ03KAECfyMXK",
        videoType: "youtube",
      },
      {
        id: 24,
        name: "Updated washing machine",
        description: "Personal Project",
        year: "2025",
        images: ["/updated-washing-machine.webp"],
        link: "https://www.youtube.com/watch?v=ZKpVVGOlwEE",
        additionalInfo:
          "This audio-reactive, generative artwork was created in TouchDesigner and features a custom soundscape made by me - all built from recordings of a washing machine. The mechanical rhythms and textures of the recordings were transformed into a layered composition, which in turn drives the visual output. By translating the mundane cycle of a household machine into an audiovisual experience, the work reimagines the ordinary as something unpredictable and alive.",
        videoUrl: "https://www.youtube.com/embed/ZKpVVGOlwEE?si=DGN-RovOUzsSmekj",
        videoType: "youtube",
      },
      {
        id: 25,
        name: "Safe driving",
        description: "Personal Project",
        year: "2024",
        images: ["/safe-driving.webp"],
        additionalInfo:
          "This personal project explores the inner conflict of wanting to be everywhere at once, constantly moving forward without taking a moment to pause. The video, created and edited by me, focuses on movement as a central theme, reflecting the restless drive and uncertainty of constantly pushing ahead. The sound design, also crafted by me, complements the visuals, intensifying the feeling of being in perpetual motion.",
        videoUrl: "https://www.youtube.com/embed/1e6VV_aBI0c?si=Hl8eACPfk49SvnxM",
        videoType: "youtube",
      },
      {
        id: 26,
        name: "Baltic sea",
        description: "Personal Project",
        year: "2023",
        images: ["/baltic-sea.webp"],
        link: "https://www.youtube.com/watch?v=KY9xUp_2fhU",
        additionalInfo:
          "This video project focuses on the ethereal beauty of shiny water and sand patterns, presented in black and white to create a dreamlike atmosphere. The delicate interplay of light and texture evokes a sense of tranquility and intrigue. The sound design, crafted by me, features bells and sparkles, enhancing the sensual experience of the visuals. The combination of these elements invites the viewer to immerse themselves in the calming and reflective nature of the project.",
        videoUrl: "https://www.youtube.com/embed/KY9xUp_2fhU?si=eTN1iKHdLmYy4I2v",
        videoType: "youtube",
      },
    ],
  },
  {
    id: "prints-paintings",
    title: "Prints & Paintings",
    description:
      "A selection of my screen prints, monotypes, and oil paintings. In printmaking, I embrace experimentation and the unpredictability of the process, where each piece explores form, color, and composition—especially in unique, one-of-a-kind monotypes. My painting practice builds on academic techniques like precise still lifes, while also venturing into imaginative projects that balance technical skill with expressive freedom.",
    projects: [
      {
        id: 29,
        name: "Twins",
        description: "Monotype",
        year: "2022",
        images: ["/twins.webp"],
        additionalInfo:
          "This collection of monotype prints explores the concept of duality through mirrored and paired forms. Each unique print was created using oil-based inks on a plexiglass plate, allowing for subtle variations in pressure and ink distribution that create rich textures and unexpected details.",
      },
      {
        id: 30,
        name: "Yellow press",
        description: "Screen-print",
        year: "2024",
        images: ["/dzeltena-prese.webp"],
        additionalInfo:
          "This screen print series comments on media sensationalism through appropriated newspaper headlines and imagery. Using a limited palette dominated by yellow (referencing the historical term 'yellow journalism'), the prints combine text and image in compositions that highlight the manipulative nature of tabloid reporting.",
      },
      {
        id: 31,
        name: "10x10x10x10",
        description: "Screen-print",
        year: "2024",
        images: ["/10x10.webp"],
        additionalInfo:
          "This systematic print project explores mathematical patterns through screen printing. Following a strict set of rules based on a 10x10 grid, I created variations that demonstrate how simple numerical constraints can generate complex and visually engaging compositions.",
      },
      {
        id: 32,
        name: "The flowers",
        description: "Monotype",
        year: "2023",
        images: ["/pukes.webp"],
        additionalInfo:
          "This series of monotype prints explores botanical forms through abstraction and gestural mark-making. Rather than depicting flowers realistically, the prints capture their essence through organic shapes, dynamic lines, and layered colors that evoke the sensory experience of a garden in bloom.",
      },
      {
        id: 95,
        name: "Flower fever dream",
        description: "Oil on canvas",
        year: "2023",
        images: ["/flower-fever-dream.webp"],
        additionalInfo:
          "Inspired by the blooming peonies at my parents' countryside house, this painting captures the vibrant energy of nature in a surreal, dreamlike state. The bold colors and fluid, swirling forms create a sense of movement, as if the flowers are shifting and growing before the viewer’s eyes. Through vivid hues and expressive brushstrokes, the piece evokes the intensity and almost hypnotic beauty of a floral fever dream."
      },
      {
        id: 96,
        name: "Returning to self",
        description: "Oil on wood",
        year: "2023",
        images: ["/returning-to-self.webp"],
        additionalInfo:
          "A painting of a wooden stick, created on a wooden surface, reinforcing the idea of returning to one’s essence. The work explores themes of simplicity, material connection, and grounding—where the subject and the medium mirror each other, blurring the line between representation and reality."
      },
      {
        id: 97,
        name: "Burnout",
        description: "Oil on canvas",
        year: "2022",
        images: ["/burnout.webp"],
        additionalInfo:
          "This painting serves as a metaphor for burnout, depicting a spent match lying on a stark surface. Once a source of fire and energy, the match is now charred and exhausted, symbolizing the toll of overexertion. The contrast between light and shadow intensifies the feeling of depletion, emphasizing the fragile balance between passion and exhaustion."
      },
      {
        id: 98,
        name: "Kitchen scene",
        description: "Oil on canvas",
        year: "2022",
        images: ["/kitchen.webp"],
        additionalInfo:
          "This painting captures a fragmented, abstract view of a kitchen sink, turning an everyday scene into a composition of shapes, reflections, and textures. The interplay between light and shadow, along with the contrast between organic and metallic elements, gives the piece a dynamic and almost surreal quality."
      },
      {
        id: 99,
        name: "Self-portrait",
        description: "Oil on canvas",
        year: "2023",
        images: ["/self-portrait.webp"],
        additionalInfo:
          "This piece is a personal exploration of identity and self-perception. The portrait balances between realism and expression, capturing both the physical and emotional layers of self-representation."
      }
    ],
  },
]

export default function PortfolioSection() {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [loadedImages, setLoadedImages] = useState<string[]>([])
  const sectionRefs = useRef<{ [key: string]: RefObject<HTMLDivElement | null> }>({})
  const { openProjectModal } = useModal()

  // Initialize refs for each section
  useEffect(() => {
    portfolioData.forEach((section) => {
      sectionRefs.current[section.id] = React.createRef<HTMLDivElement>()
    })
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  const toggleSection = (sectionId: string) => {
    const newActiveSection = activeSection === sectionId ? null : sectionId
    setActiveSection(newActiveSection)

    // Scroll to the section if it's being opened
    if (newActiveSection && sectionRefs.current[newActiveSection]?.current) {
      setTimeout(() => {
        const headerHeight = document.querySelector('header')?.offsetHeight || 0
        const sectionTop = sectionRefs.current[newActiveSection]?.current?.getBoundingClientRect().top || 0
        window.scrollTo({
          top: window.scrollY + sectionTop - headerHeight,
          behavior: "smooth",
        })
      }, 100)
    }
  }

  const handleImageLoad = (imageUrl: string) => {
    setLoadedImages((prev) => [...prev, imageUrl])
  }

  const handleProjectSelect = (project: Project) => {
    openProjectModal(project)
  }

  return (
    <section id="works" className="py-16 px-4 md:px-8 lg:px-16 overflow-hidden pt-8">
      <div onMouseMove={handleMouseMove} className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12 instrument-serif italic">Works</h2>

        {portfolioData.map((section, index) => (
          <div
            key={section.id}
            ref={sectionRefs.current[section.id]}
            className={`border-t ${index === portfolioData.length - 1 ? "border-b" : ""} border-black/10 ${activeSection === section.id ? "portfolio-section-active" : ""}`}
          >
            <div
              className="flex justify-between items-center py-4 cursor-pointer transition-colors"
              onClick={() => toggleSection(section.id)}
            >
              <h3 className="text-2xl md:text-3xl font-bold instrument-serif italic">{section.title}</h3>
              <div className="flex items-center">
                {activeSection === section.id ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
              </div>
            </div>

            {activeSection === section.id && (
              <div className="py-4">
                <p className="mb-8 max-w-3xl inter">{section.description}</p>

                <div className="relative">
                  <table className="w-full">
                    <tbody>
                      {section.projects.map((project) => (
                        <tr
                          key={project.id}
                          className="border-b border-black/10 last:border-none relative group cursor-pointer hover:bg-black/5 transition-colors"
                          onMouseEnter={() => setHoveredProject(project)}
                          onMouseLeave={() => setHoveredProject(null)}
                          onClick={() => handleProjectSelect(project)}
                        >
                          <td className="py-4 px-4 relative z-10 inter flex items-center">
                            {project.videoUrl && (
                              <span className="mr-2 bg-black/10 p-1 rounded-full">
                                <Play className="h-4 w-4" />
                              </span>
                            )}
                            {project.name}
                          </td>
                          <td className="py-4 px-4 relative z-10 inter">{project.description}</td>
                          <td className="py-4 px-4 text-right relative z-10 inter">{project.year}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Hover Preview */}
      {hoveredProject && (
        <div
          className="fixed pointer-events-none bg-white shadow-lg rounded-md p-2 w-64 h-64"
          style={{
            left: mousePosition.x + 20,
            top: mousePosition.y - 100,
            transform: "translateY(-50%)",
            zIndex: 60,
          }}
        >
          <div className="relative w-full h-full">
            <Skeleton
              className={`w-full h-full rounded absolute inset-0 ${loadedImages.includes(hoveredProject.images[0]) ? "hidden" : "block"}`}
            />
            <div className="w-full h-full relative">
              <img
                src={hoveredProject.images[0] || "/placeholder.svg"}
                alt={hoveredProject.name}
                className={`w-full h-full object-cover rounded ${loadedImages.includes(hoveredProject.images[0]) ? "block" : "opacity-0"}`}
                onLoad={() => handleImageLoad(hoveredProject.images[0])}
              />
              {hoveredProject.videoUrl && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded">
                  <Play className="h-10 w-10 text-white" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
