import { Button } from '@/components/ui/button';
import FeaturedSection from '@/components/ui/FeaturedSection';
import Footer from '@/components/ui/Footer';
import { Link as ScrollLink } from 'react-scroll';

const Home = () => {
  return (
    <section>
      <div className='homeBg relative'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center space-y-5 w-full px-4'>
          <div className='text-white font-extrabold lg:text-4xl sm:text-3xl text-2xl'>
            <p>Order food with friends.</p>
            <p>Split the bill instantly.</p>
          </div>
          <p className='text-white md:text-base text-sm md:max-w-[600px] max-w-[450px] mx-auto'>
            Stop doing complex math after lunch. OrderTogether creates a shared
            cart, tracks who ordered what, and calculates debts automatically.
          </p>
          <div className='flex-center gap-2 mt-10'>
            <ScrollLink to='getApp' smooth={true} duration={500}>
              <Button className='bg-orange-400 sm:text-[14px] text-[13px] md:py-5 font-bold cursor-pointer'>
                Get it on App
              </Button>
            </ScrollLink>

            <ScrollLink to='workGuide' smooth={true} duration={500}>
              <Button
                className='md:py-5 font-bold sm:text-[14px] text-[13px] cursor-pointer text-gray-700'
                variant={'outline'}
              >
                How it works
              </Button>
            </ScrollLink>
          </div>
        </div>
      </div>

      <FeaturedSection />
      <Footer />
    </section>
  );
};

export default Home;
