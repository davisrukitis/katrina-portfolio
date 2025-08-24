import Image from "next/image"
import Link from "next/link"

interface AboutSectionProps {
  onPukeClick?: () => void
}

export default function AboutSection({ onPukeClick }: AboutSectionProps) {
  const handleImageClick = () => {
    if (onPukeClick) {
      onPukeClick()
    }
  }

  return (
    <section id="about" className="py-16 px-4 md:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 instrument-serif italic">About me</h2>

          <div onClick={handleImageClick} className="md:hidden mb-8">
            <Image
              src="/katrina.webp"
              alt="About Me"
              width={400}
              height={600}
              className="w-full h-auto object-cover rounded-lg cursor-pointer"
            />
          </div>
          <div>
            <div className="hidden md:block md:float-right md:ml-8 md:mb-6 md:w-2/5 lg:w-1/3">
              <Image
                onClick={handleImageClick}
                src="/katrina.webp"
                alt="About Me"
                width={400}
                height={600}
                className="w-full h-auto object-cover rounded-lg cursor-pointer"
              />
            </div>

        <div className="mt-8">
          <p className="text-lg mb-6 inter">
            My name is Katrīna Puķe, and I’m an emerging multimedia artist and graphic designer from Riga, Latvia. I graduated from the Riga School of Design and Art as an Advertising Design Specialist and am currently pursuing a Bachelor’s degree in Audio-Visual Media Arts at the Latvian Academy of Arts, specializing in Visual Communication.
          </p>
          <p className="text-lg mb-6 inter">
            I have built a diverse background in art and design through internships at Element Digital in Riga, working as a mediator at the Venice Biennale in Italy, and most recently joining the street art agency Muralia and the Calle Libre urban arts festival in Vienna, Austria, as a multimedia and creative projects assistant.
          </p>
          <p className="text-lg mb-6 inter">
            I’m proficient in Adobe Creative Cloud, with expertise in Illustrator, Photoshop, and InDesign. My skills also extend to video editing, as well as foundational knowledge of 3D design, animation, and virtual reality experiences developed with tools like Blender and Unity.
          </p>
          <p className="text-lg mb-10 inter">
            My creative work has been exhibited in shows such as Rakstatsevišķi (2023) and the annual student art exhibition Jaunmarka at the Latvian Academy of Arts, where my screen prints have been presented for the past three years.
          </p>

          <div className="flex space-x-4 mt-8">
            <Link
              href="/Katrina-Puke-CV-2025-LV.pdf"
              target="_blank"
              className="px-4 py-2 border border-black rounded-md hover:bg-black hover:text-white transition-colors inter"
            >
              Download CV
            </Link>
           </div> 
          </div>  
        </div>
       </div>
     </div>
    </section>
  )
}

