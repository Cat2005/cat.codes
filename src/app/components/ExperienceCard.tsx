interface ExperienceCardProps {
    title: string;
    description: string;
    link?: string;
    tech: string[];
    type: string;
    date: string;
}

export default function ExperienceCard({ title, type, date,description, link, tech }: ExperienceCardProps) {
    return (
        <div className={`${type === 'dark' ? 'bg-[#fecfd2]' : 'bg-[#e7b7b7]'} p-4 rounded-lg mb-8`}>
            <div className="flex justify-between">
                <h2 className={`font-newsreader text-xl mb-4 ${type === 'dark' ? 'text-[#773035]' : 'text-[#773035]'}`}>{title}</h2> 
            <p className={`font-newsreader inline text-sm ${type === 'dark' ? 'text-[#773035]' : 'text-[#773035]'}`}>{date}</p>

        
            </div>
            <p className={`font-newsreader mt-2 ${type === 'light' ? 'text-[#773035]' : 'text-[#773035]'}`} 
        dangerouslySetInnerHTML={{ 
          __html: description.replace(
            /<a\s+href=/g, 
            '<a class="text-[#c02e7e] hover:underline" href='
          ).replace(
            /<\/a>/g,
            '<svg class="inline mb-1 ml-1 w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#c02e7e"><path d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"/></svg></a>'
          )
        }}>
      </p>
        </div>

    )
}