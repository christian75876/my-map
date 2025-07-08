import Image from 'next/image';
import Box from '@/components/atoms/box';
import Card from '@/components/atoms/card';
import Typography from '@/components/atoms/typography';
import Button from '@/components/atoms/button';

export default function LandingPage() {
  const routes = ['mag2.jpg', 'mag3.jpg', 'mag4.jpg'];
  return (
    <Box className='space-y-16'>
      <section className='relative flex h-[60vh] items-center justify-center overflow-hidden'>
        <Image src='/images/mag1.jpg' alt='Paisaje' fill className='object-cover brightness-50' />
        <Box className='relative z-10 text-center text-neutral-white'>
          <Typography variant='h1' className='text-4xl font-bold'>
            Explora el mundo en 360°
          </Typography>
          <Typography className='mx-auto mt-2 max-w-md'>
            Encuentra rutas increíbles y vistas panorámicas desde cualquier dispositivo.
          </Typography>
          <Button className='mt-6' onClick={() => (window.location.href = '/map')}>
            Ver mapa
          </Button>
        </Box>
      </section>

      <section className='container mx-auto px-4'>
        <Typography variant='h2' className='mb-4 text-center text-2xl font-semibold'>
          Rutas destacadas
        </Typography>
        <Box className='grid gap-6 md:grid-cols-3'>
          {routes.map((img, idx) => (
            <Card key={img} className='flex flex-col items-center p-4'>
              <Image
                src={`/images/${img}`}
                alt={`Ruta ${idx + 1}`}
                width={400}
                height={250}
                className='w-full rounded-md object-cover'
              />
              <Typography variant='h3' className='mt-2 font-medium'>
                Ruta {idx + 1}
              </Typography>
              <Typography className='text-sm'>
                Descubre paisajes impresionantes recorriendo este trayecto.
              </Typography>
            </Card>
          ))}
        </Box>
      </section>

      <section className='bg-primary py-12 text-center text-neutral-white'>
        <Typography variant='h2' className='text-3xl font-semibold'>
          ¿Listo para comenzar?
        </Typography>
        <Button className='mt-4' variant='secondary' onClick={() => (window.location.href = '/precios')}>
          Ver planes y precios
        </Button>
      </section>
    </Box>
  );
}
