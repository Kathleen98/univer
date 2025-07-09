import Image from 'next/image'
import bannerTemplo from '../../../public/templo-banner.jpeg'

export const Hero = () => {
    return (
        <div className="relative">
            {/* <Image
                src={bannerTemplo}
                alt="Hero"
                className="w-full h-screen object-cover"
            /> */}
            <iframe className='w-full h-screen' frameBorder="0" loop controls={false} style={{ pointerEvents: "none" }} src="https://www.youtube.com/embed/1CnTVnfhQ-k" allow='autoplay; encrypted-media'></iframe>
            <div
                className="absolute bottom-0 left-0 right-0 h-64"
                style={{
                    backgroundImage: 'url("hero-image.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center bottom',
                    filter: 'blur(4px) brightness(0.8)',
                    maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,2,16,0.3) 40%, rgba(0,2,16,0.8) 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,2,16,0.3) 40%, rgba(0,2,16,0.8) 100%)'
                }}
            ></div>
            <div
                className="absolute bottom-0 left-0 right-0 h-32"
                style={{
                    backgroundImage: 'url("hero-image.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center bottom',
                    filter: 'blur(12px) brightness(0.5)',
                    maskImage: 'linear-gradient(to bottom, transparent 0%, rgb(0,2,16) 70%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgb(0,2,16) 70%)'
                }}
            ></div>
            <div
                className="absolute bottom-0 left-0 right-0 h-20"
                style={{
                    background: 'linear-gradient(to bottom, transparent, rgba(0,2,16,0.8), #000210)'
                }}
            ></div>
        </div>
    )
}