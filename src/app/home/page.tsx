import InclinicSection from '../components/HomePage/inclinicSection';
import OpdSelection from '../components/HomePage/opdSection';

const HomePage = () => {
    return (
        <div className="py-10 mx-20 flex flex-col space-y-20 items-center justify-between">
            <OpdSelection />
            <InclinicSection />
        </div>
    );
};

export default HomePage;
