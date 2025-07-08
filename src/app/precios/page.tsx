import Box from '@/components/atoms/box';
import Card from '@/components/atoms/card';
import Typography from '@/components/atoms/typography';
import Button from '@/components/atoms/button';

const plans = [
  { name: 'Básico', price: 'Gratis', desc: 'Acceso limitado al mapa.' },
  { name: 'Pro', price: '$9.99', desc: 'Rutas ilimitadas y fotos 360°.' },
  { name: 'Premium', price: '$19.99', desc: 'Soporte prioritario y descargas.' }
];

export default function PreciosPage() {
  return (
    <Box className='container mx-auto space-y-8 px-4 py-12'>
      <Typography variant='h1' className='text-center text-3xl font-bold'>
        Planes y precios
      </Typography>
      <Box className='grid gap-6 md:grid-cols-3'>
        {plans.map(plan => (
          <Card key={plan.name} className='flex flex-col items-center p-6 text-center'>
            <Typography variant='h3' className='text-xl font-semibold'>
              {plan.name}
            </Typography>
            <Typography variant='h2' className='my-2 text-3xl font-bold text-primary'>
              {plan.price}
            </Typography>
            <Typography className='mb-4'>{plan.desc}</Typography>
            <Button variant='primary'>Elegir plan</Button>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
