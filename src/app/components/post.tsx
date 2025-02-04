import { HiArrowUpRight } from 'react-icons/hi2';


export default function Post({ type, title, description, link, image, tech }: { type: string, title: string, description: string, link?: string, image: string, tech: string[] }) {
  const isVideo = image.endsWith('.mp4') || image.endsWith('.webm') || image.endsWith('.mov');
    
  return (
    <div className={`mb-12 p-4 rounded-lg transition-transform duration-200 hover:scale-[1.02] ${type === 'dark' ? 'bg-[#e7b7b7]' : 'bg-[#fecfd2]'}`}>

        <div className="flex justify-between">
      <h3 className={`${link ? 'hover:underline' : ''} font-newsreader text-xl mb-4 ${type === 'dark' ? 'text-[#773035]' : 'text-[#773035]'}`}>
      <a href={link}  
             target="_blank" 
             rel="noopener noreferrer"
             className={`font-newsreader text-md text-[#773035] transition-colors relative group`}>
            <span className="inline-flex items-center">
              {title}
              {link && (
                <HiArrowUpRight className="text-[#c02e7e] inline mb-0.5 text-xs ml-0.5" />
              )}
            </span>
            <span className={`text-[#c02e7e] absolute left-0 right-0 bottom-0 border-b border-transparent ${link ? 'group-hover:border-current' : ''}`}></span>
          </a> 
      </h3>
      </div>
      <div className={`flex justify-center w-full mx-auto p-4 rounded-lg`}>


      {isVideo ? (
        <a href={link} target="_blank" rel="noopener noreferrer">
        <video 
          playsInline
          controls
          autoPlay
          muted
          loop
          controlsList="nodownload noplaybackrate"
          className='rounded-lg w-full x-w-[50px] object-cover [&::-webkit-media-controls-enclosure]:max-h-[30px] [&::-webkit-media-controls-panel]:bg-transparent [&::-webkit-media-controls-timeline]:bg-transparent'
        >
          <source src={image} type={`video/mp4`} />
          Your browser does not support the video tag.
        </video>
        </a>
      ) : (
        <img src={image} alt={title} className="max-h-[400px] object-cover" />
      )}
      </div>
      
      <p className={`font-newsreader mt-4 ${type === 'dark' ? 'text-[#773035]' : 'text-[#773035]'}`} 
        dangerouslySetInnerHTML={{ 
          __html: description.replace(
              /<a\s+href=['"]([^'"]+)['"]/g,
              `<a href="$1" target="_blank" rel="noopener noreferrer" class="mr-1 font-newsreader text-md text-[#c02e7e] transition-colors relative group"`
          ).replace(
              />([^<]+)<\/a>/g,
              `><span class="inline-flex items-center">$1<svg class="inline mb-0.5 w-3 h-3 ml-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clip-rule="evenodd"/></svg></span><span class="absolute left-0 right-0 bottom-0 border-b border-transparent group-hover:border-current"></span></a>`
          )
      }}>
      </p>

      <p className={`font-newsreader  mt-4 ${type === 'dark' ? 'text-[#773035]' : 'text-[#773035]'}`}>

        <span className=" text-[#c02e7e]">Tech Stack:</span> {tech.join(', ')}
      </p>

     
    </div>
  );
}