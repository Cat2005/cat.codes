interface ExperienceCardProps {
    title: string;
    description: string;
    link?: string;
    tech: string[];
    type: string;
    date: string;
}

export default function ExperienceCard({ title, type, date, description, link, tech }: ExperienceCardProps) {
    return (
        <div className={`${type === 'dark' ? 'bg-[#fecfd2]' : 'bg-[#e7b7b7]'} transition-transform duration-200 hover:scale-[1.02]  p-4 rounded-lg mb-8`}>
            <div className="flex justify-between">
                <h2 className={`font-newsreader text-xl mb-4 ${type === 'dark' ? 'text-[#773035]' : 'text-[#773035]'}`}>{title}</h2> 
                <p className={`font-newsreader inline text-sm ${type === 'dark' ? 'text-[#773035]' : 'text-[#773035]'}`}>{date}</p>
            </div>
            <p className={`font-newsreader mt-2 ${type === 'light' ? 'text-[#773035]' : 'text-[#773035]'}`} 
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
        </div>
    )
}