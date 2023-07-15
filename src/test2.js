import axios from 'axios'; // You need to install it

const Page = () => {
    const [customers, setCustomers] = useState(null);

    useEffect(() => {
        const getCustomers = async () => {
            const response = await axios.get('/api/customers');
            setCustomers(response.data);
        };

        getCustomers();
    }, []);

    return (
        <div>
            {/* render content */}
        </div>
    );
};