
class CacheService {
    constructor() {
        this.cache = new Map();
        this.TTL = 5 * 60 * 1000;
    }

    set(key, data) {
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
    }

    get(key) {
        const item = this.cache.get(key);
        if (!item) return null;

        if (Date.now() - item.timestamp > this.TTL) {
            this.cache.delete(key);
            return null;
        }

        return item.data;
    }

    clear() {
        this.cache.clear();
    }
}

export const cacheService = new CacheService();


export const useCachedApi = (url, deps = []) => {
    const [data, setData] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        const cachedData = cacheService.get(url);
        if (cachedData) {
            setData(cachedData);
            setCarregando(false);
            return;
        }

        const fetchData = async () => {
            try {
                setCarregando(true);
                const response = await api.get(url);
                cacheService.set(url, response.data);
                setData(response.data);
            } catch (error) {
                setErro(error.response?.data?.error || 'Erro ao carregar dados');
            } finally {
                setCarregando(false);
            }
        };

        fetchData();
    }, [url, ...deps]);

    return { data, carregando, erro };
};