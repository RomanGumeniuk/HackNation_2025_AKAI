import Background from '@/components/details_page/Background'
import LinkButton from '@/components/details_page/LinkButton'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { Share2, Heart } from 'lucide-react';
import Graph from '@/components/details_page/Graph'
import RepresentativeCard from '@/components/details_page/RepresentativeCard'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function page() {
  const title = "Ustawa z dnia 7 listopada 2025 r. o zmianie ustawy o systemie informacji w ochronie zdrowia oraz ustawy o ochronie ludności i obronie cywilnej";
  const lorem_ips = [
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo omnis error consequuntur provident, officiis pariatur quo placeat numquam aperiam non eos, aliquam temporibus autem, minus quidem iste tenetur sequi explicabo.",
    "Soluta corrupti quae aspernatur libero asperiores molestiae officia, eligendi vero dolorem laboriosam repellendus neque iste eveniet delectus repellat deleniti modi autem pariatur, doloribus accusantium ducimus, amet et ea? Explicabo, obcaecati.",
    "Debitis, nihil. Dolor doloremque magni esse maiores incidunt at provident, officiis eum expedita adipisci debitis ipsum illo qui sed vel est dignissimos voluptas voluptatem vero iure dicta inventore! Culpa, pariatur.",
    "Provident non optio veritatis nisi, repellat hic accusamus in cum et nesciunt accusantium fuga necessitatibus deserunt doloribus quos vitae debitis, blanditiis molestiae impedit. Eius, quibusdam? Eaque ad facere maiores temporibus!",
    "Accusantium sit corporis vitae temporibus tempore. Facere molestiae cupiditate, repudiandae necessitatibus, voluptate fugit et reiciendis recusandae corporis eligendi suscipit temporibus. Ipsum molestias tempora officia, totam doloremque quis consequuntur cumque quod.",
    "Consectetur sequi nihil vel nostrum veritatis ea id cum iste maiores nobis fuga qui perspiciatis accusamus recusandae sed dicta corporis incidunt nulla voluptas ipsam, voluptate velit optio delectus! Consectetur, praesentium.",
    "Vitae velit illo, natus ullam obcaecati impedit rerum excepturi laudantium quis nihil, neque sit voluptas adipisci voluptates cupiditate enim incidunt aut nemo laborum quam et. Error eos maxime delectus veniam!",
    "Assumenda esse libero, a ex maxime culpa reiciendis veritatis aliquam quos quae placeat voluptatum sed quod eveniet ea mollitia nemo quam exercitationem in quibusdam! Nobis quasi natus alias voluptas sapiente."
  ];

  return (
    <div className="space-y-8 p-4 max-w-4xl mx-auto">

      {/* Intro section */}
      <Background>
        <Graph />
      </Background>

      <Separator />

      <div className='flex'>
        <h1 className="text-2xl font-bold leading-snug">{title}</h1>

        {/* Action buttons */}
        <div className="gap-5">
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
          {lorem_ips.map((text, idx) => (
            <p key={idx}>{text}</p>
          ))}
        </div>
      </Background>

      {/* Footer section */}
      <Separator />
      <h2 className="text-lg font-semibold">Planowane konsultacje w twoim rejonie</h2>
      <div className='grid grid-cols-2 gap-8'>
        <Background>
          Lista najblizszych
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(10).keys()].map(key => (
              <TableRow key={key}>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
              ))}
            </TableBody>
          </Table>
        </Background>
        <Background>
          Mapa
        </Background>
      </div>
      <Separator />
      <h2 className="text-lg font-semibold">Osoby odpowiedzialne za ustawe</h2>
      <div className='grid grid-cols-2 gap-6'>
        {[...Array(8).keys()].map(key => (
          <RepresentativeCard
            name="Jan Kowalski"
            imageUrl="https://github.com/shadcn.png"
            email="jan.kowalski@sejm.gov.pl"
            phone="+48 123 456 789"
            party="Koalicja Obywatelska"
            stance="approve"     // approve | against | neutral
            key={key}
          />
        ))}
      </div>
    </div>
  )
}
