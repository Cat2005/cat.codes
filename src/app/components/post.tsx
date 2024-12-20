import { HiArrowUpRight } from 'react-icons/hi2';


export default function Post({ type, title, description, link, image, tech }: { type: string, title: string, description: string, link?: string, image: string, tech: string[] }) {
  const isVideo = image.endsWith('.mp4') || image.endsWith('.webm') || image.endsWith('.mov');
    
  return (
    <div className={`mb-12 p-4 rounded-lg ${type === 'dark' ? 'bg-[#e7b7b7]' : 'bg-[#fecfd2]'}`}>

        <div className="flex justify-between">
      <h3 className={`${link ? 'hover:underline' : ''} font-newsreader text-xl mb-4 ${type === 'dark' ? 'text-[#773035]' : 'text-[#773035]'}`}>
        <a href={link} target="_blank" rel="noopener noreferrer">
          {title}
          {link && (
            <HiArrowUpRight className="text-[#c02e7e] inline mb-1 ml-1" />
          )}
        </a>
      </h3>
      </div>
      <div className={`flex justify-center w-full mx-auto p-4 rounded-lg`}>


      {isVideo ? (
        <video 
          playsInline
          controls
          autoPlay
          muted
          loop
          className='rounded-lg w-full object-cover'
        >
          <source src={image} type={`video/mp4`} />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img src={image} alt={title} className="" />
      )}
      </div>
      
      <p className={`font-newsreader mt-4 ${type === 'dark' ? 'text-[#773035]' : 'text-[#773035]'}`} 
        dangerouslySetInnerHTML={{ 
          __html: description.replace(
            /<a\s+href=/g, 
            '<a class="text-[#c02e7e] hover:underline" href='
          ).replace(
            /<\/a>/g,
            '<svg class="inline w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#c02e7e"><path d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"/></svg></a>'
          )
        }}>
      </p>

      <p className={`font-newsreader  mt-4 ${type === 'dark' ? 'text-[#773035]' : 'text-[#773035]'}`}>

        <span className=" text-[#c02e7e]">Tech Stack:</span> {tech.join(', ')}
      </p>

     
    </div>
  );
}