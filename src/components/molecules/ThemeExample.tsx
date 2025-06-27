import ThemeToggle from '../atoms/ThemeToggle';

const ThemeExample = () => {
  return (
    <div className='min-h-screen w-full transition-colors duration-300'>
      <div className='container mx-auto p-8'>
        <div className='mb-8 flex items-center justify-between'>
          <h1 className='text-theme text-2xl font-bold'>Theme Example</h1>
          <ThemeToggle />
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          {/* Card example */}
          <div className='card-theme border-theme rounded-lg border p-6 transition-colors duration-300'>
            <h2 className='text-theme mb-4 text-xl font-semibold'>
              Card Using Theme Colors
            </h2>
            <p className='text-theme mb-4'>
              This card uses the theme variables for background, text, and
              border colors. It will automatically adapt when switching between
              dark and light themes.
            </p>
            <div className='flex space-x-4'>
              <button className='rounded bg-primary px-4 py-2 text-neutral-white transition-colors hover:bg-primary-dark'>
                Primary Button
              </button>
              <button className='rounded bg-secondary px-4 py-2 text-neutral-dark transition-colors hover:bg-secondary-light'>
                Secondary Button
              </button>
            </div>
          </div>

          {/* Form elements example */}
          <div className='card-theme border-theme rounded-lg border p-6 shadow-md transition-colors duration-300'>
            <h2 className='text-theme mb-4 text-xl font-semibold'>
              Form Elements
            </h2>
            <div className='space-y-4'>
              <div>
                <label htmlFor='name' className='text-theme mb-1 block'>
                  Name
                </label>
                <input
                  type='text'
                  id='name'
                  className='input-theme text-theme border-theme w-full rounded border px-4 py-2 transition-colors outline-none focus:ring-2 focus:ring-primary'
                  placeholder='Enter your name'
                />
              </div>
              <div>
                <label htmlFor='message' className='text-theme mb-1 block'>
                  Message
                </label>
                <textarea
                  id='message'
                  rows={3}
                  className='input-theme text-theme border-theme w-full rounded border px-4 py-2 transition-colors outline-none focus:ring-2 focus:ring-primary'
                  placeholder='Write your message'
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Color showcase */}
        <div className='card-theme border-theme mt-8 rounded-lg border p-6 shadow-md'>
          <h2 className='text-theme mb-4 text-xl font-semibold'>
            Color Showcase
          </h2>
          <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
            <div className='flex flex-col items-center'>
              <div className='h-16 w-16 rounded-full bg-primary'></div>
              <span className='text-theme mt-2'>Primary</span>
            </div>
            <div className='flex flex-col items-center'>
              <div className='h-16 w-16 rounded-full bg-secondary'></div>
              <span className='text-theme mt-2'>Secondary</span>
            </div>
            <div className='flex flex-col items-center'>
              <div className='bg-green h-16 w-16 rounded-full'></div>
              <span className='text-theme mt-2'>Green</span>
            </div>
            <div className='flex flex-col items-center'>
              <div className='h-16 w-16 rounded-full bg-accent-dark'></div>
              <span className='text-theme mt-2'>Accent Dark</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeExample;
