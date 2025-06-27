import MapContainer from '@/features/map/container/MapContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: `%s | Map Explorer`,
    default: 'Map Explorer'
  },
  description: 'Explore maps and 360° photos from around the world.'
};
export default function MapPage() {
  return (
    <div className='h-full w-full'>
      <MapContainer />
    </div>
  );
}
