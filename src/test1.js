class CustomerApi {
    getCustomers() {
        return Promise.resolve([
            {
                id: '238339KDC',
                name: 'John'
            }
        ]);
    }
};

const customerApi = new CustomerApi();

const Page = () => {
    const [customers, setCustomers] = useState(null);

    useEffect(() => {
        const getCustomers = async () => {
            const result = await customerApi.getCustomers();
            setCustomers(result);
        };

        getCustomers();
    }, []);

    return (
        <div>
            {/* render content */}
        </div>
    );
};