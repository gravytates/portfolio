import Image from 'next/image'

export function BackgroundSection() {
  return (
    <section id="background" className="py-20 px-6 bg-brand-cream">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-serif text-4xl text-brand-blue-dark mb-8">Background</h2>
        <div className="flex flex-col sm:flex-row gap-8 items-start">
          <div className="flex-shrink-0">
            <Image
              src="/projects/grady.jpeg"
              alt="Grady Shelton"
              width={160}
              height={160}
              className="rounded-full object-cover w-36 h-36 sm:w-40 sm:h-40 border-2 border-brand-blue/20"
            />
          </div>
          <div className="space-y-4 text-zinc-700 leading-relaxed">
            <p>
              I'm a fullstack, if mostly front–end, product developer and tech lead. Most recently I've been
              gainfully employed by{' '}
              <a href="https://www.noviconnect.com/" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline">
                Novi
              </a>
              , based in Portland, OR.
            </p>
            <p>
              My experience in biology and environmental science has given me a love for data-driven projects. My
              background in painting inspires me to engineer clean, effective experiences through design and
              technology to reach as many people as possible.
            </p>
            <p>
              After years of developing, leading teams, designing and managing projects, I always aim to be
              intentional with my communication, maintaining a holistic vision throughout the development process
              while maintaining focus on all roles and goals. I love building connections with my team and
              together building great products. It's part of what makes me feel alive.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
