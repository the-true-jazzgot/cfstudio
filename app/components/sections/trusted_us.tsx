import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

interface LogoItem {
  _key: string
  picture: {
    asset: {
      _id: string
    }
  }
  pictureDescription: string
}

interface LogosDocument {
  gallery?: LogoItem[]
}

export async function TrustedUs() {
  const query = `*[_type == "logos"][0]{gallery[]{_key, picture{asset->{_id}}, pictureDescription}}`;
  const data = await client.fetch<LogosDocument>(query);
  const logos = data?.gallery ?? [];

  if (logos.length === 0) {
    return null
  }

  const baseCount = Math.max(8, logos.length);
  const baseLogos = Array.from({ length: baseCount }, (_, index) => logos[index % logos.length]);
  const marqueeLogos = [...baseLogos, ...baseLogos];

  return (
    <section className="w-full overflow-hidden py-12 z-10 border-y-2 border-white/20 backdrop-blur-sm bg-white">
      <div className="px-4 text-center pb-6">
        <h2 className="text-5xl font-bold text-blaclk text-shadow-md">Zaufali nam</h2>
      </div>
      <div>
        <div className="logo-marquee-wrapper overflow-hidden">
          <div className="logo-marquee animate-marquee">
            {marqueeLogos.map((logo, index) => {
              const imageUrl = urlFor(logo.picture).auto('format').height(200).url()
              return (
                <div key={`${logo._key}-${index}`} className="logo-marquee-item flex min-w-max items-center justify-center px-4 py-2">
                  <img
                    src={imageUrl}
                    alt={logo.pictureDescription || 'Trusted logo'}
                    className="h-[200px] w-auto object-contain"
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
