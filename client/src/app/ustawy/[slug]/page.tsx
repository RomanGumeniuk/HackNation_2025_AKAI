import Background from '@/components/details_page/Background'
import LinkButton from '@/components/details_page/LinkButton'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { Share2, Heart } from 'lucide-react';
import Graph from '@/components/details_page/Graph'

export default function page() {
  const title = "Ustawa z dnia 7 listopada 2025 r. o zmianie ustawy o systemie informacji w ochronie zdrowia oraz ustawy o ochronie ludności i obronie cywilnej"
  return (  
    <div className="space-y-8 p-4 max-w-4xl mx-auto">
      
      {/* Intro section */}
      <Background>
        <Graph/>
      </Background>

      <Separator />

      {/* Title */}
      <div className='flex '>
        <h1 className="text-2xl font-bold leading-snug">{title}</h1>

        {/* Action buttons */}
        <div className=" gap-3">
          <LinkButton>
            <Heart className="w-4 h-4" />
            Subskrybuj
          </LinkButton>

          <LinkButton>
            <Share2 className="w-4 h-4" />
            Podziel się
          </LinkButton>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap justify-center gap-20">
        <Badge variant="default" className='bg-yellow-500'>
          <Link href="/">Badge</Link>
        </Badge>
        <Badge variant="destructive">
          <Link href="/">Badge</Link>
        </Badge>
        <Badge variant="secondary">
          <Link href="/">Badge</Link>
        </Badge>
        <Badge className='bg-green-800'>
          <Link href="/">Badge</Link>
        </Badge>
      </div>

      {/* Main content */}
      <Background>
        <div className="leading-relaxed text-sm space-y-4">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo omnis
            error consequuntur provident, officiis pariatur quo placeat numquam
            aperiam non eos, aliquam temporibus autem, minus quidem iste tenetur
            sequi explicabo.
          </p>
          <p>
            Soluta corrupti quae aspernatur libero asperiores molestiae officia,
            eligendi vero dolorem laboriosam repellendus neque iste eveniet
            delectus repellat deleniti modi autem pariatur, doloribus accusantium
            ducimus, amet et ea? Explicabo, obcaecati.
          </p>
          <p>
            Debitis, nihil. Dolor doloremque magni esse maiores incidunt at
            provident, officiis eum expedita adipisci debitis ipsum illo qui sed
            vel est dignissimos voluptas voluptatem vero iure dicta inventore!
            Culpa, pariatur.
          </p>
          <p>
            Provident non optio veritatis nisi, repellat hic accusamus in cum et
            nesciunt accusantium fuga necessitatibus deserunt doloribus quos
            vitae debitis, blanditiis molestiae impedit. Eius, quibusdam? Eaque
            ad facere maiores temporibus!
          </p>
          <p>
            Accusantium sit corporis vitae temporibus tempore. Facere molestiae
            cupiditate, repudiandae necessitatibus, voluptate fugit et reiciendis
            recusandae corporis eligendi suscipit temporibus. Ipsum molestias
            tempora officia, totam doloremque quis consequuntur cumque quod.
          </p>
          <p>
            Consectetur sequi nihil vel nostrum veritatis ea id cum iste maiores
            nobis fuga qui perspiciatis accusamus recusandae sed dicta corporis
            incidunt nulla voluptas ipsam, voluptate velit optio delectus!
            Consectetur, praesentium.
          </p>
          <p>
            Vitae velit illo, natus ullam obcaecati impedit rerum excepturi
            laudantium quis nihil, neque sit voluptas adipisci voluptates
            cupiditate enim incidunt aut nemo laborum quam et. Error eos maxime
            delectus veniam!
          </p>
          <p>
            Assumenda esse libero, a ex maxime culpa reiciendis veritatis aliquam
            quos quae placeat voluptatum sed quod eveniet ea mollitia nemo quam
            exercitationem in quibusdam! Nobis quasi natus alias voluptas
            sapiente.
          </p>
        </div>
      </Background>

      {/* Footer section */}
      <h2 className="text-lg font-semibold">Planowane konsultacje w twoim rejonie</h2>
    </div>
  )
}
